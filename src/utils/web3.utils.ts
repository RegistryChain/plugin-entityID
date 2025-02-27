import { IAgentRuntime } from "@elizaos/core";
import { Account, Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const getAccount = (runtime: IAgentRuntime): Account => {
  const privateKey = runtime.getSetting(
    "EVM_PRIVATE_KEY",
  ) satisfies string as Hex;
  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY is not set");
  }
  return privateKeyToAccount(privateKey);
};
