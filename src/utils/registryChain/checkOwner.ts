import { Hex } from "viem";
import { publicClient } from "../../environment";

export const checkOwner = async (nodeHash: Hex) => {
  console.log("nodeHash", nodeHash);
  const onchainOwner = await publicClient.readContract({
    functionName: "owner",
    address: "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
    abi: [
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "node",
            type: "bytes32",
          },
        ],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    args: [nodeHash],
  });

  return onchainOwner;
};
