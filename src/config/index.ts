import { Address } from "viem";

export * from "./abis/l1abi";
export * from "./abis/ensRegistryAbi";

export const CONTRACT_ADDRESSES = {
  ENS_REGISTRY: "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e" as Address,
  DATABASE_RESOLVER: "0x8c6ab6c2e78d7d2b2a6204e95d8a8874a95348a4" as Address,
} as const;
