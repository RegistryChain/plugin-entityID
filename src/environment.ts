import { IAgentRuntime } from "@elizaos/core";
import {
  Account,
  Chain,
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  Transport,
  WalletClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/0szsK8kBmxSh0a4US9nlxYYkp7CMdOe-"),
});

export const getWallet = (_runtime: IAgentRuntime): WalletClient<Transport, Chain, Account> => {
  const privateKey = _runtime.getSetting("EVM_PRIVATE_KEY");

  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY is not set");
  }

  return createWalletClient({
    account: privateKeyToAccount(privateKey satisfies string as Hex),
    chain: sepolia,
    transport: http("https://eth-sepolia.g.alchemy.com/v2/0szsK8kBmxSh0a4US9nlxYYkp7CMdOe-"),
  });
};
