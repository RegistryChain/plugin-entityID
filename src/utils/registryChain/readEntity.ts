import { Address, decodeAbiParameters, encodeFunctionData, getContract, Hex, parseAbi } from "viem";

import { l1abi } from "@/config";
import { publicClient } from "@/environment";

import { DISPLAY_KEYS } from "@utils/registryChain/generateTexts";
import { getResolverAddress } from "@utils/ens/getResolverAddress";

export async function readEntityRecord(nodeHash: Hex) {
  const resolverAddress = await getResolverAddress("ai.entity.id");
  return await readResolverData(resolverAddress, nodeHash);
}

async function readResolverData(resolverAddress: Address, nodeHash: any) {
  let results: any = {};
  try {
    const calls = DISPLAY_KEYS.map((key) =>
      encodeFunctionData({
        abi: parseAbi(["function text(bytes32,string) view returns (string)"]),
        functionName: "text",
        args: [nodeHash, key],
      }),
    );

    const resolverContract: any = getContract({
      client: publicClient as any,
      abi: [
        ...l1abi,
        ...parseAbi(["function multicallView(bytes[] calldata) view returns (bytes calldata)"]),
      ],
      address: resolverAddress,
    });

    const multicallResponse = await resolverContract.read.multicallView([calls]);

    const encodedTexts = decodeAbiParameters([{ type: "bytes[]" }], multicallResponse)[0];

    const decodedResults: any[] = encodedTexts.map((result: any, index: number) => {
      try {
        return decodeAbiParameters([{ type: "string" }], result)?.[0];
      } catch (error) {
        console.error(`Failed to decode text(${DISPLAY_KEYS[index]})`, error);
        return "";
      }
    });

    // Convert results into a key-value object
    results = DISPLAY_KEYS.reduce(
      (acc, key, index) => {
        acc[key] = decodedResults[index] || ""; // Assign null if decoding failed
        return acc;
      },
      {} as Record<string, string | null>,
    );
  } catch (err: any) {
    console.log("Error reading resolver data ", err.message);
  }

  if (!results.name || !results?.entity__registrar)
    throw new Error("results.name or results?.entity__registrar not registered");

  //hardcodes or derived fields
  results.domain = `${results.name}.${results.entity__registrar}.entity.id`;
  return results;
}
