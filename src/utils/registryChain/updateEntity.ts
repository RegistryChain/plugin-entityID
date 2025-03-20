import { Account, Address, BaseError, Chain, Hex, namehash, Transport, WalletClient } from "viem";
import { simulateContract } from "viem/actions";
import { l1abi } from "@/config";
import { generateTexts } from "@utils/registryChain/generateTexts";
import { handleCcipError } from "./handleCcipError";

const executeWriteToResolver = async (
  wallet: WalletClient<Transport, Chain, Account>,
  nodeHash: Hex,
  constitutionData: { key: string; value: string },
  resolverAddress: Address,
) => {
  // IMPORTANT: Change made to gateway witout test. Should be handling POST with :{sender}/:{calldata}.json with server/this.handleRequest

  try {
    await simulateContract(wallet, {
      address: resolverAddress,
      functionName: "setText",
      args: [nodeHash, constitutionData.key, constitutionData.value],
      abi: l1abi,
    });
  } catch (err) {
    handleCcipError(wallet, err);
  }
};

/**
 * @remarks Should only be called if the entity is already registered
 */
export const updateEntity = async (
  entityName: string,
  newFields: Record<string, string>,
  wallet: WalletClient<Transport, Chain, Account>,
  resolverAddress: Address,
) => {
  const nodeHash = namehash(`${entityName}.ai.entity.id`);

  const texts = generateTexts(newFields);

  try {
    for (const text of texts) {
      await executeWriteToResolver(wallet, nodeHash, text, resolverAddress);
    }

    console.log(
      `Name ${entityName}.ai.entity.id was updated, see it at https://v3k.com/agent/${entityName}.ai.entity.id`,
    );

    return;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
