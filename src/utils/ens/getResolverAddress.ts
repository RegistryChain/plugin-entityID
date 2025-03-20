import { Address, getContract, namehash, zeroAddress } from "viem";
import { CONTRACT_ADDRESSES, ensRegistryAbi } from "@/config";
import { publicClient } from "@/environment";

export const getResolverAddress = async (domain: string) => {
  let resolverAddr: Address = zeroAddress;

  // Check resolver type
  const registry: any = getContract({
    client: publicClient as any,
    abi: ensRegistryAbi,
    address: CONTRACT_ADDRESSES.ENS_REGISTRY,
  });

  try {
    resolverAddr = await registry.read.resolver([namehash(domain)]);
  } catch (err: any) {
    console.log("ERROR GETTING CURRENT RESOLVER ADDRESS: ", err.message);
  }

  if (resolverAddr === zeroAddress) {
    try {
      resolverAddr = await registry.read.resolver([namehash(domain.split(".").slice(1).join("."))]);
    } catch (err: any) {
      console.log("ERROR GETTING CURRENT PARENT RESOLVER ADDRESS: ", err.message);
    }
  }

  return resolverAddr;
};
