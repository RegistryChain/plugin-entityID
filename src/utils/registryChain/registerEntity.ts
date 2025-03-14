import {
  Address,
  BaseError,
  encodeAbiParameters,
  getContract,
  Hex,
  isAddressEqual,
  namehash,
  RawContractError,
  toHex,
  WalletClient,
  zeroAddress,
  zeroHash,
} from "viem";
import { packetToBytes } from "viem/ens";
import { simulateContract } from "viem/actions";

import { CONTRACT_ADDRESSES, l1abi } from "@/config";
import { publicClient } from "@/environment";
import { EntityConfig } from "@/types";

import { checkOwner } from "@utils/ens/checkOwner";
import { getResolverAddress } from "@utils/ens/getResolverAddress";
import { generateTexts } from "@utils/registryChain/generateTexts";
import { readEntityRecord } from "@utils/registryChain/readEntity";

function getBirthDateRecords(currentEntityRecords: any) {
  if (currentEntityRecords.birthDate) return {};

  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();
  const y = new Date().getFullYear();

  return {
    entity__formation__date: {
      type: "Date",
      setValue: `${y}-${m}-${d}`,
    },
    birthDate: {
      type: "Date",
      setValue: `${y}-${m}-${d}`,
    },
  };
}

function getSchemaFields(entityConfig: EntityConfig, currentEntityRecords: any) {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(entityConfig)) {
    if (Array.isArray(value)) {
      result[key] = value; // preserve arrays like `partners`
    } else if (typeof value === "string") {
      result[key] = {
        type: "string",
        setValue: value,
      };
    } else {
      throw new Error(`Unexpected type in entityConfig ${typeof value}`);
    }
  }

  return {
    ...getBirthDateRecords(currentEntityRecords),
    ...result,
  };
}

function getRevertErrorData(err: unknown) {
  if (!(err instanceof BaseError)) return undefined;
  const error = err.walk() as RawContractError;
  return error?.data as { errorName: string; args: unknown[] };
}

async function resolverCallback(
  wallet: WalletClient,
  message: any,
  resBytes: any,
  callbackData: any,
) {
  const req = encodeAbiParameters(
    [{ type: "bytes" }, { type: "address" }],
    [message.callData, wallet.account.address],
  );
  const callbackContract: any = getContract({
    wallet: wallet,
    args: [...callbackData.args, resBytes, req],
    ...callbackData,
  });
  const tx = await callbackContract.write[callbackData.functionName]([
    ...callbackData.args,
    resBytes,
    req,
  ]);
  return tx.hash;
}

type CcipRequestParameters = {
  body: { data: Hex; signature: any; sender: Address };
  url: string;
};

async function ccipRequest({ body, url }: CcipRequestParameters): Promise<Response> {
  try {
    const res = await fetch(url.replace("/{sender}/{data}.json", ""), {
      body: JSON.stringify(body, (_, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function handleDBStorage({
  domain,
  url,
  message,
  wallet,
}: {
  domain: any;
  url: string;
  message: any;
  wallet: WalletClient;
}) {
  const signature = await wallet.signTypedData({
    account: wallet.account,
    domain,
    message,
    types: {
      Message: [
        { name: "callData", type: "bytes" },
        { name: "sender", type: "address" },
        { name: "expirationTimestamp", type: "uint256" },
      ],
    },
    primaryType: "Message",
  });
  const requestResponse = await ccipRequest({
    body: {
      data: message.callData,
      signature: { message, domain, signature },
      sender: message.sender,
    },
    url,
  });
  return requestResponse;
}

const executeWriteToResolver = async (
  wallet: WalletClient,
  entityName: string,
  constitutionData: Hex[],
  callbackData: any,
) => {
  // IMPORTANT: Change made to gateway witout test. Should be handling POST with :{sender}/:{calldata}.json with server/this.handleRequest

  try {
    await simulateContract(publicClient as any, {
      functionName: "register",
      args: [
        toHex(packetToBytes(entityName)),
        wallet.account.address,
        BigInt(0) /* duration */,
        zeroHash /* secret */,
        zeroAddress /* resolver */,
        constitutionData /* data */,
        false /* reverseRecord */,
        0 /* fuses */,
        zeroHash /* extraData */,
      ],
      abi: l1abi,
      address: CONTRACT_ADDRESSES.DATABASE_RESOLVER,
    }); // TODO remove any
  } catch (err) {
    const data = getRevertErrorData(err);
    switch (data?.errorName) {
      case "StorageHandledByOffChainDatabase": {
        const [domain, url, message] = data.args as any[];
        let urlToUse: string = url;
        if (process.env.NEXT_PUBLIC_RESOLVER_URL) {
          urlToUse = process.env.NEXT_PUBLIC_RESOLVER_URL;
        }
        const res: any = await handleDBStorage({
          domain,
          url: urlToUse,
          message,
          wallet,
        });
        if (res.status === 200) {
          const resBytes = await res.text();

          if (!callbackData) return resBytes;
          return await resolverCallback(wallet, message, resBytes, callbackData);
        }
        return "0x";
      }
      default:
        console.error("error registering domain: ", { err });
    }
  }
};

export const registerOrUpdateEntity = async (entityConfig: EntityConfig, wallet: WalletClient) => {
  const nodeHash = namehash(`${entityConfig.name}.ai.entity.id`);

  // If there is no owner to the domain, make the register. If there is an owner skip register
  const currentEntityOwner = await checkOwner(nodeHash);

  // Read record if already registered
  const currentEntityRecords = await readEntityRecord(nodeHash);

  const schemaFields = getSchemaFields(entityConfig, currentEntityRecords);
  const texts: any[] = generateTexts(schemaFields);

  const resolverAddr = await getResolverAddress("ai.entity.id");

  // Should check if EITHER public reg is the domain owner OR connect addr is owner and has approved
  // If false, prevent the registration
  if (
    !isAddressEqual(currentEntityOwner, wallet.account.address) &&
    !isAddressEqual(currentEntityOwner, resolverAddr) &&
    !isAddressEqual(currentEntityOwner, zeroAddress) //IN CASES OF OFFCHAIN REGISTRATION, THE ON CHAIN OWNER IS 0x0. THE GATEWAY THEN CHECKS IF 'OWNED' OFFCHAIN
  ) {
    throw Error("The user does not have permission to deploy contracts for this domain");
  }

  // TODO compare records to see if need to update

  const constitutionData = texts.map((x) =>
    encodeAbiParameters([{ type: "string" }, { type: "string" }], [x.key, x.value]),
  );

  try {
    await executeWriteToResolver(wallet, entityConfig.name, constitutionData, null);

    return;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
