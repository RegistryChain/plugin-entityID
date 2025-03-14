import { Hex } from "viem";
import { publicClient } from "@/environment";
import { CONTRACT_ADDRESSES, ensRegistryAbi } from "@/config";

export const checkOwner = async (nodeHash: Hex) => {
  const onchainOwner = await publicClient.readContract({
    functionName: "owner",
    address: CONTRACT_ADDRESSES.ENS_REGISTRY,
    abi: ensRegistryAbi,
    args: [nodeHash],
  });

  return onchainOwner;
};
