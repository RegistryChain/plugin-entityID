import { Address, decodeAbiParameters, encodeFunctionData, getContract, Hex, parseAbi } from "viem";

import { l1abi } from "@/config";
import { publicClient } from "@/environment";

import { DISPLAY_KEYS } from "@utils/registryChain/generateTexts";
import { getResolverAddress } from "@utils/ens/getResolverAddress";
import { EntityRecords } from "@/types";

export async function readEntityRecord(nodeHash: Hex): Promise<EntityRecords | undefined> {
  const offchainRecords = await readEntityRecordOffChain(nodeHash);
  if (offchainRecords === undefined) return await readEntityRecordOnChain(nodeHash);
  return offchainRecords;
}

export async function readEntityRecordOffChain(nodeHash: Hex): Promise<EntityRecords | undefined> {
  const res = await fetch(
    ` https://lionfish-app-7yrug.ondigitalocean.app/direct/getRecord/nodeHash=${nodeHash}.json`,
  );
  if (res.status !== 200) throw new Error(`readEntityRecordOffChain error status ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function readEntityRecordOnChain(nodeHash: Hex): Promise<EntityRecords | undefined> {
  const resolverAddress = await getResolverAddress("ai.entity.id");
  return await readResolverData(resolverAddress, nodeHash);
}

async function readResolverData(
  resolverAddress: Address,
  nodeHash: any,
): Promise<EntityRecords | undefined> {
  let results: EntityRecords = {};
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

    const encodedTexts: string[] = [];
    const SLICE_SIZE = 10;

    /**
     * @remark We need to read in batch to avoid "414 URI too long" errors when viem does the CCIP requests
     */
    for (let i = 0; i < Math.ceil(calls.length / SLICE_SIZE); i++) {
      const multicallResponse = await resolverContract.read.multicallView([
        calls.slice(i * SLICE_SIZE, (i + 1) * SLICE_SIZE),
      ]);
      encodedTexts.push(...decodeAbiParameters([{ type: "bytes[]" }], multicallResponse)[0]);
    }

    const decodedResults: any[] = encodedTexts.map((result: any, index: number) => {
      try {
        return decodeAbiParameters([{ type: "string" }], result)?.[0];
      } catch (error) {
        console.error(`Failed to decode text(${DISPLAY_KEYS[index]})`, error);
        return "";
      }
    });

    // Convert results into a key-value object
    results = DISPLAY_KEYS.reduce((acc, key, index) => {
      acc[key] = decodedResults[index] || ""; // Assign null if decoding failed
      return acc;
    }, {} as EntityRecords);
  } catch (err: any) {
    console.log("Error reading resolver data ", err.message);
  }

  if (!results.name || !results?.entity__registrar) return undefined;

  //hardcodes or derived fields
  results.domain = `${results.name}.${results.entity__registrar}.entity.id`;
  return results;
}
