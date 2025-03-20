import {
  Account,
  Address,
  Chain,
  encodeAbiParameters,
  Hex,
  namehash,
  toHex,
  Transport,
  WalletClient,
  zeroAddress,
  zeroHash,
} from "viem";
import { packetToBytes } from "viem/ens";
import { simulateContract } from "viem/actions";
import { l1abi } from "@/config";
import { EntityConfig, EntityRecords } from "@/types";
import { generateTexts } from "@utils/registryChain/generateTexts";
import { readEntityRecord } from "@utils/registryChain/readEntity";
import { handleCcipError } from "./handleCcipError";

function getBirthDateRecords(currentEntityRecords?: EntityRecords) {
  if (currentEntityRecords?.birthDate) return {};

  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();
  const y = new Date().getFullYear();

  return {
    entity__formation__date: `${y}-${m}-${d}`,
    birthDate: `${y}-${m}-${d}`,
  };
}

const executeWriteToResolver = async (
  wallet: WalletClient<Transport, Chain, Account>,
  entityName: string,
  constitutionData: Hex[],
  resolverAddress: Address,
) => {
  try {
    await simulateContract(wallet, {
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
      address: resolverAddress,
    });
  } catch (err) {
    return await handleCcipError(wallet, err);
  }
};

export const registerEntity = async (
  entityConfig: EntityConfig,
  wallet: WalletClient<Transport, Chain, Account>,
  resolverAddress: Address,
) => {
  const nodeHash = namehash(`${entityConfig.name}.ai.entity.id`);

  // Read record if already registered
  const currentEntityRecords = await readEntityRecord(nodeHash);

  const schemaFields = {
    ...getBirthDateRecords(currentEntityRecords),
    ...entityConfig,
  };

  const texts: any[] = generateTexts(schemaFields);

  const constitutionData = texts.map((x) =>
    encodeAbiParameters([{ type: "string" }, { type: "string" }], [x.key, x.value]),
  );

  try {
    await executeWriteToResolver(wallet, entityConfig.name, constitutionData, resolverAddress);

    console.log(
      `Name ${entityConfig.name}.ai.entity.id is registered, see it at https://v3k.com/agent/${entityConfig.name}.ai.entity.id`,
    );

    return;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
