import { IAgentRuntime } from "@elizaos/core";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { getAccount } from "@utils/web3.utils";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const getWallet = (_runtime: IAgentRuntime) => {
  const privateKey = runtime.getSetting("EVM_PRIVATE_KEY") satisfies string as Hex;

  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY is not set");
  }

  return createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: sepolia,
    transport: http(),
  });
};
