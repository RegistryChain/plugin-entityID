import { IAgentRuntime } from "@elizaos/core";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const getWallet = (_runtime: IAgentRuntime) => {
  const account = getAccount(_runtime);
  return createWalletClient({
    account: account,
    chain: sepolia,
    transport: http(),
  });
};
