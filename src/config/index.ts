import { Address } from "viem";

export * from "./abis/l1abi";
export * from "./abis/ensRegistryAbi";

export const CONTRACT_ADDRESSES = {
  ENS_REGISTRY: "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e" as Address,
} as const;
