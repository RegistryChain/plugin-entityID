import {
  Account,
  Address,
  BaseError,
  encodeAbiParameters,
  getContract,
  Hex,
  isAddress,
  isAddressEqual,
  namehash,
  parseAbi,
  RawContractError,
  toHex,
  WalletClient,
  zeroAddress,
  zeroHash,
} from "viem";
import { checkOwner } from "./checkOwner";
import { packetToBytes } from "viem/ens";
import { l1abi } from "./l1abi";
import { simulateContract } from "viem/actions";
import { publicClient } from "../../environment";

const displayKeys = [
  "LEI",
  "name",
  "address",
  "description",
  "url",
  "location",
  "avatar",
  "entity__name",
  "entity__address",
  "entity__registrar",
  "entity__type",
  "entity__description",
  "entity__purpose",
  "entity__formation__date",
  "entity__lockup__days",
  "entity__additional__terms",
  "entity__selected__model",
  "entity__lookup__number",
  "entity__code",
  "entity__arbitrator",
  "partner__[0]__name",
  "partner__[0]__type",
  "partner__[0]__wallet__address",
  "partner__[0]__physical__address",
  "partner__[0]__DOB",
  "partner__[0]__is__manager",
  "partner__[0]__is__signer",
  "partner__[0]__lockup",
  "partner__[0]__shares",
  "partner__[1]__name",
  "partner__[1]__type",
  "partner__[1]__wallet__address",
  "partner__[1]__physical__address",
  "partner__[1]__DOB",
  "partner__[1]__is__manager",
  "partner__[1]__is__signer",
  "partner__[1]__lockup",
  "partner__[1]__shares",
  "partner__[2]__name",
  "partner__[2]__type",
  "partner__[2]__wallet__address",
  "partner__[2]__physical__address",
  "partner__[2]__DOB",
  "partner__[2]__is__manager",
  "partner__[2]__is__signer",
  "partner__[2]__lockup",
  "partner__[2]__shares",
  "partner__[3]__name",
  "partner__[3]__type",
  "partner__[3]__wallet__address",
  "partner__[3]__physical__address",
  "partner__[3]__DOB",
  "partner__[3]__is__manager",
  "partner__[3]__is__signer",
  "partner__[3]__lockup",
  "partner__[3]__shares",
  "partner__[4]__name",
  "partner__[4]__type",
  "partner__[4]__wallet__address",
  "partner__[4]__physical__address",
  "partner__[4]__DOB",
  "partner__[4]__is__manager",
  "partner__[4]__is__signer",
  "partner__[4]__lockup",
  "partner__[4]__shares",
  "partner__[5]__name",
  "partner__[5]__type",
  "partner__[5]__wallet__address",
  "partner__[5]__physical__address",
  "partner__[5]__DOB",
  "partner__[5]__is__manager",
  "partner__[5]__is__signer",
  "partner__[5]__lockup",
  "partner__[5]__shares",
];

const generateTexts = (fields: any) => {
  // THE PURPOSE OF THIS FUNCTION IS TO CONVERT THE ENTIRE DATA OBJECT COLLECTED INTO TEXT RECORDS FOR ALL RESOLVER TYPES
  const texts: any[] = [];
  fields.partners.forEach((partner: any, idx: any) => {
    const partnerKey = "partner__[" + idx + "]__";
    Object.keys(partner).forEach((field) => {
      if (partner[field].type === "address" || field === "wallet__address") {
        if (!isAddress(partner[field]?.setValue)) {
          texts.push({ key: partnerKey + field, value: zeroAddress });
        } else {
          texts.push({
            key: partnerKey + field,
            value: partner[field]?.setValue,
          });
        }
      } else if (partner[field].type === "boolean") {
        texts.push({
          key: partnerKey + field,
          value: partner[field]?.setValue ? "true" : "false",
        });
      } else if (partner[field].type === "Date") {
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const y = new Date().getFullYear();
        texts.push({ key: partnerKey + field, value: y + "-" + m + "-" + d });
      } else if (field !== "roles") {
        texts.push({
          key: partnerKey + field,
          value: partner[field]?.setValue,
        });
      } else if (partner[field]?.setValue) {
        partner[field]?.setValue.forEach((role: string) => {
          texts.push({ key: partnerKey + "is__" + role, value: "true" });
        });
      }
    });
  });

  Object.keys(fields).forEach((key) => {
    if (key !== "partners" && displayKeys.includes(key)) {
      texts.push({ key: key, value: fields[key]?.setValue });
    }
  });
  return texts;
};

function getSchemaFields(entityName: string) {
  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();
  const y = new Date().getFullYear();

  return {
    partners: [],
    entity__formation__date: {
      type: "Date",
      setValue: y + "-" + m + "-" + d,
    },
    name: {
      type: "string",
      setValue: entityName,
    },
    entity__name: {
      type: "string",
      setValue: `entity-${entityName}`,
    },
    entity__registrar: {
      type: "string",
      setValue: "ai", // slug
    },
    entity__type: {
      type: "string",
      setValue: "eliza",
    },
    entity__selected__model: {
      type: "string",
      setValue: "Model 1", // TODO
    },
  };
}

export const getResolverAddress = async (nodeHash: any) => {
  let resolverAddr = zeroAddress;
  // Check resolver type
  try {
    const resolverAddr = await publicClient.readContract({
      args: [nodeHash],
      functionName: "resolver",
      abi: parseAbi(["function resolver(bytes32) view returns (address)"]),
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
  return resolverAddr;
  // if (resolverAddr === contractAddresses.DatabaseResolver) {
  //   return await getRecordData({ domain })
  // }
};

export function getRevertErrorData(err: unknown) {
  if (!(err instanceof BaseError)) return undefined;
  const error = err.walk() as RawContractError;
  return error?.data as { errorName: string; args: unknown[] };
}

export async function resolverCallback(
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

export type CcipRequestParameters = {
  body: { data: Hex; signature: any; sender: Address };
  url: string;
};

export async function ccipRequest({
  body,
  url,
}: CcipRequestParameters): Promise<Response> {
  //http://localhost:2000/{sender}/{data}.json
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

export async function handleDBStorage({
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

export const executeWriteToResolver = async (
  wallet: WalletClient,
  calldata: any,
  callbackData: any,
) => {
  // IMPORTANT: Change made to gateway witout test. Should be handling POST with :{sender}/:{calldata}.json with server/this.handleRequest

  try {
    await simulateContract(publicClient as any, calldata); // TODO remove any
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
          return await resolverCallback(
            wallet,
            message,
            resBytes,
            callbackData,
          );
        }
        return "0x";
      }
      default:
        console.error("error registering domain: ", { err });
    }
  }
};

export const registerEntity = async (
  entityName: string,
  wallet: WalletClient,
) => {
  const schemaFields = getSchemaFields(entityName);
  const texts: any[] = generateTexts(schemaFields);

  // If there is no owner to the domain, make the register. If there is an owner skip register
  let currentEntityOwner = await checkOwner(
    namehash(`${entityName}.ai.entity.id`),
  );

  // Should check if EITHER public reg is the domain owner OR connect addr is owner and has approved
  // If false, prevent the registration
  if (
    !isAddressEqual(currentEntityOwner, wallet.account.address) &&
    !isAddressEqual(
      currentEntityOwner,
      "0x5ab83d7cf5e0f245fce2226f68f3959a78e067ad",
    ) &&
    !isAddressEqual(currentEntityOwner, zeroAddress) //IN CASES OF OFFCHAIN REGISTRATION, THE ON CHAIN OWNER IS 0x0. THE GATEWAY THEN CHECKS IF 'OWNED' OFFCHAIN
  ) {
    throw Error(
      "The user does not have permission to deploy contracts for this domain",
    );
  }

  const constitutionData = texts.map((x) =>
    encodeAbiParameters(
      [{ type: "string" }, { type: "string" }],
      [x.key, x.value],
    ),
  );

  let formationPrep: any = {};

  const resolverAddr = await getResolverAddress(namehash("ai.entity.id"));

  try {
    // if (resolverAddr?.toUpperCase() === contractAddressesObj.DatabaseResolver?.toUpperCase()) {
    formationPrep = {
      functionName: "register",
      args: [
        toHex(packetToBytes(entityName)),
        wallet.account.address,
        0 /* duration */,
        zeroHash /* secret */,
        zeroAddress /* resolver */,
        constitutionData /* data */,
        false /* reverseRecord */,
        0 /* fuses */,
        zeroHash /* extraData */,
      ],
      abi: l1abi,
      address: "0x8c6ab6c2e78d7d2b2a6204e95d8a8874a95348a4", // contractAddresses["DatabaseResolver"]
    };
    await executeWriteToResolver(wallet, formationPrep, null);

    return;
  } catch (err: any) {
    throw err;
  }
};
