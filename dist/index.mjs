// src/services/entityID.service.ts
import { Service } from "@elizaos/core";

// src/utils/registryChain/registerEntity.ts
import {
  BaseError,
  encodeAbiParameters,
  getContract as getContract3,
  isAddressEqual,
  namehash as namehash2,
  toHex,
  zeroAddress as zeroAddress3,
  zeroHash
} from "viem";
import { packetToBytes } from "viem/ens";
import { simulateContract } from "viem/actions";

// src/config/abis/l1abi.ts
var l1abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_chainId", type: "uint256", internalType: "uint256" },
      { name: "_target_resolver", type: "address", internalType: "address" },
      { name: "_target_registrar", type: "address", internalType: "address" },
      {
        name: "_verifier",
        type: "address",
        internalType: "contract IEVMVerifier"
      },
      { name: "_metadataUrl", type: "string", internalType: "string" }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "addr",
    inputs: [{ name: "node", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address payable" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "addr",
    inputs: [
      { name: "node", type: "bytes32", internalType: "bytes32" },
      { name: "coinType", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { type: "bytes32", name: "node" },
      { type: "address", name: "owner" }
    ],
    stateMutability: "view",
    outputs: []
  },
  {
    type: "function",
    name: "addrCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure"
  },
  {
    type: "function",
    name: "addrCoinTypeCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure"
  },
  {
    type: "function",
    name: "contenthash",
    inputs: [{ name: "node", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "contenthashCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure"
  },
  {
    type: "function",
    name: "getStorageSlotsCallback",
    inputs: [
      { name: "response", type: "bytes", internalType: "bytes" },
      { name: "extradata", type: "bytes", internalType: "bytes" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "metadata",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "metadataUrl",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "multicall",
    inputs: [{ name: "", type: "bytes[]", internalType: "bytes[]" }],
    outputs: [{ name: "", type: "bytes[]", internalType: "bytes[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "register",
    inputs: [
      { name: "", type: "bytes", internalType: "bytes" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bool", internalType: "bool" },
      { name: "", type: "uint16", internalType: "uint16" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "registerParams",
    inputs: [
      { name: "", type: "bytes", internalType: "bytes" },
      { name: "", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "registerParamsCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [
      { name: "price", type: "uint256", internalType: "uint256" },
      { name: "commitTime", type: "uint256", internalType: "uint256" },
      { name: "extraData", type: "bytes", internalType: "bytes" }
    ],
    stateMutability: "pure"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      { name: "", type: "bytes", internalType: "bytes" },
      { name: "data", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "result", type: "bytes", internalType: "bytes" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setAddr",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setAddr",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setContenthash",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setMetadataUrl",
    inputs: [{ name: "newUrl", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setTarget",
    inputs: [
      { name: "key", type: "bytes32", internalType: "bytes32" },
      { name: "target", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setText",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "string", internalType: "string" },
      { name: "", type: "string", internalType: "string" }
    ],
    outputs: [],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceID", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "targets",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "text",
    inputs: [
      { name: "node", type: "bytes32", internalType: "bytes32" },
      { name: "key", type: "string", internalType: "string" }
    ],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "textCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "L2HandlerContractAddressChanged",
    inputs: [
      {
        name: "chainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      },
      {
        name: "previousContractAddress",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newContractAddress",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "L2HandlerDefaultChainIdChanged",
    inputs: [
      {
        name: "previousChainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      },
      {
        name: "newChainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "MetadataChanged",
    inputs: [
      {
        name: "previousUrl",
        type: "string",
        indexed: true,
        internalType: "string"
      },
      { name: "newUrl", type: "string", indexed: true, internalType: "string" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OffChainDatabaseHandlerURLChanged",
    inputs: [
      {
        name: "previousUrl",
        type: "string",
        indexed: true,
        internalType: "string"
      },
      { name: "newUrl", type: "string", indexed: true, internalType: "string" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  { type: "error", name: "CommandTooLong", inputs: [] },
  {
    type: "error",
    name: "InvalidReference",
    inputs: [
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "max", type: "uint256", internalType: "uint256" }
    ]
  },
  {
    type: "error",
    name: "OffchainLookup",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "urls", type: "string[]", internalType: "string[]" },
      { name: "callData", type: "bytes", internalType: "bytes" },
      { name: "callbackFunction", type: "bytes4", internalType: "bytes4" },
      { name: "extraData", type: "bytes", internalType: "bytes" }
    ]
  },
  {
    type: "error",
    name: "ResponseLengthMismatch",
    inputs: [
      { name: "actual", type: "uint256", internalType: "uint256" },
      { name: "expected", type: "uint256", internalType: "uint256" }
    ]
  },
  {
    type: "error",
    name: "StorageHandledByL2",
    inputs: [
      { name: "chainId", type: "uint256", internalType: "uint256" },
      { name: "contractAddress", type: "address", internalType: "address" }
    ]
  },
  {
    type: "error",
    name: "StorageHandledByOffChainDatabase",
    inputs: [
      {
        name: "sender",
        type: "tuple",
        internalType: "struct IWriteDeferral.domainData",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "version", type: "string", internalType: "string" },
          { name: "chainId", type: "uint64", internalType: "uint64" },
          {
            name: "verifyingContract",
            type: "address",
            internalType: "address"
          }
        ]
      },
      { name: "url", type: "string", internalType: "string" },
      {
        name: "data",
        type: "tuple",
        internalType: "struct IWriteDeferral.messageData",
        components: [
          { name: "callData", type: "bytes", internalType: "bytes" },
          { name: "sender", type: "address", internalType: "address" },
          {
            name: "expirationTimestamp",
            type: "uint256",
            internalType: "uint256"
          }
        ]
      }
    ]
  },
  {
    type: "error",
    name: "TooManyCommands",
    inputs: [{ name: "max", type: "uint256", internalType: "uint256" }]
  }
];

// src/config/abis/ensRegistryAbi.ts
var ensRegistryAbi = [
  {
    inputs: [{ internalType: "contract ENS", name: "_old", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "node", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "label",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "NewOwner",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "node", type: "bytes32" },
      {
        indexed: false,
        internalType: "address",
        name: "resolver",
        type: "address"
      }
    ],
    name: "NewResolver",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "node", type: "bytes32" },
      { indexed: false, internalType: "uint64", name: "ttl", type: "uint64" }
    ],
    name: "NewTTL",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "node", type: "bytes32" },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "old",
    outputs: [{ internalType: "contract ENS", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
    name: "recordExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
    name: "resolver",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "resolver", type: "address" },
      { internalType: "uint64", name: "ttl", type: "uint64" }
    ],
    name: "setRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "address", name: "resolver", type: "address" }
    ],
    name: "setResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "bytes32", name: "label", type: "bytes32" },
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "setSubnodeOwner",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "bytes32", name: "label", type: "bytes32" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "resolver", type: "address" },
      { internalType: "uint64", name: "ttl", type: "uint64" }
    ],
    name: "setSubnodeRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "uint64", name: "ttl", type: "uint64" }
    ],
    name: "setTTL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
    name: "ttl",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function"
  }
];

// src/config/index.ts
var CONTRACT_ADDRESSES = {
  ENS_REGISTRY: "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
  DATABASE_RESOLVER: "0x8c6ab6c2e78d7d2b2a6204e95d8a8874a95348a4"
};

// src/environment.ts
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
var publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
});
var getWallet = (_runtime) => {
  const privateKey = runtime.getSetting(
    "EVM_PRIVATE_KEY"
  );
  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY is not set");
  }
  return createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: sepolia,
    transport: http()
  });
};

// src/utils/ens/checkOwner.ts
var checkOwner = async (nodeHash) => {
  const onchainOwner = await publicClient.readContract({
    functionName: "owner",
    address: CONTRACT_ADDRESSES.ENS_REGISTRY,
    abi: ensRegistryAbi,
    args: [nodeHash]
  });
  return onchainOwner;
};

// src/utils/ens/getResolverAddress.ts
import { getContract, namehash, zeroAddress } from "viem";
var getResolverAddress = async (domain) => {
  let resolverAddr = zeroAddress;
  const registry = getContract({
    client: publicClient,
    abi: ensRegistryAbi,
    address: CONTRACT_ADDRESSES.ENS_REGISTRY
  });
  try {
    resolverAddr = await registry.read.resolver([namehash(domain)]);
  } catch (err) {
    console.log("ERROR GETTING CURRENT RESOLVER ADDRESS: ", err.message);
  }
  if (resolverAddr === zeroAddress) {
    try {
      resolverAddr = await registry.read.resolver([
        namehash(domain.split(".").slice(1).join("."))
      ]);
    } catch (err) {
      console.log(
        "ERROR GETTING CURRENT PARENT RESOLVER ADDRESS: ",
        err.message
      );
    }
  }
  return resolverAddr;
};

// src/utils/registryChain/generateTexts.ts
import { isAddress, zeroAddress as zeroAddress2 } from "viem";
var DISPLAY_KEYS = [
  "LEI",
  "name",
  "address",
  "description",
  "url",
  "location",
  "avatar",
  "entity__name",
  "entity__address",
  "entity__registrar",
  "entity__type",
  "entity__description",
  "entity__purpose",
  "entity__formation__date",
  "entity__lockup__days",
  "entity__additional__terms",
  "entity__selected__model",
  "entity__lookup__number",
  "entity__code",
  "entity__arbitrator",
  "partner__[0]__name",
  "partner__[0]__type",
  "partner__[0]__wallet__address",
  "partner__[0]__physical__address",
  "partner__[0]__DOB",
  "partner__[0]__is__manager",
  "partner__[0]__is__signer",
  "partner__[0]__lockup",
  "partner__[0]__shares",
  "partner__[1]__name",
  "partner__[1]__type",
  "partner__[1]__wallet__address",
  "partner__[1]__physical__address",
  "partner__[1]__DOB",
  "partner__[1]__is__manager",
  "partner__[1]__is__signer",
  "partner__[1]__lockup",
  "partner__[1]__shares",
  "partner__[2]__name",
  "partner__[2]__type",
  "partner__[2]__wallet__address",
  "partner__[2]__physical__address",
  "partner__[2]__DOB",
  "partner__[2]__is__manager",
  "partner__[2]__is__signer",
  "partner__[2]__lockup",
  "partner__[2]__shares",
  "partner__[3]__name",
  "partner__[3]__type",
  "partner__[3]__wallet__address",
  "partner__[3]__physical__address",
  "partner__[3]__DOB",
  "partner__[3]__is__manager",
  "partner__[3]__is__signer",
  "partner__[3]__lockup",
  "partner__[3]__shares",
  "partner__[4]__name",
  "partner__[4]__type",
  "partner__[4]__wallet__address",
  "partner__[4]__physical__address",
  "partner__[4]__DOB",
  "partner__[4]__is__manager",
  "partner__[4]__is__signer",
  "partner__[4]__lockup",
  "partner__[4]__shares",
  "partner__[5]__name",
  "partner__[5]__type",
  "partner__[5]__wallet__address",
  "partner__[5]__physical__address",
  "partner__[5]__DOB",
  "partner__[5]__is__manager",
  "partner__[5]__is__signer",
  "partner__[5]__lockup",
  "partner__[5]__shares"
];
var generateTexts = (fields) => {
  var _a;
  const texts = [];
  fields.partners.forEach((partner, idx) => {
    var _a2, _b, _c, _d, _e, _f;
    const partnerKey = `partner__[${idx}]__`;
    for (const field in Object.keys(partner)) {
      if (partner[field].type === "address" || field === "wallet__address") {
        if (!isAddress((_a2 = partner[field]) == null ? void 0 : _a2.setValue)) {
          texts.push({ key: partnerKey + field, value: zeroAddress2 });
        } else {
          texts.push({
            key: partnerKey + field,
            value: (_b = partner[field]) == null ? void 0 : _b.setValue
          });
        }
      } else if (partner[field].type === "boolean") {
        texts.push({
          key: partnerKey + field,
          value: ((_c = partner[field]) == null ? void 0 : _c.setValue) ? "true" : "false"
        });
      } else if (partner[field].type === "Date") {
        const m = (/* @__PURE__ */ new Date()).getMonth() + 1;
        const d = (/* @__PURE__ */ new Date()).getDate();
        const y = (/* @__PURE__ */ new Date()).getFullYear();
        texts.push({ key: partnerKey + field, value: `${y}-${m}-${d}` });
      } else if (field !== "roles") {
        texts.push({
          key: partnerKey + field,
          value: (_d = partner[field]) == null ? void 0 : _d.setValue
        });
      } else if ((_e = partner[field]) == null ? void 0 : _e.setValue) {
        for (const role in (_f = partner[field]) == null ? void 0 : _f.setValue) {
          texts.push({ key: `${partnerKey}is__${role}`, value: "true" });
        }
      }
    }
  });
  for (const key in Object.keys(fields)) {
    if (key !== "partners" && DISPLAY_KEYS.includes(key)) {
      texts.push({ key, value: (_a = fields[key]) == null ? void 0 : _a.setValue });
    }
  }
  return texts;
};

// src/utils/registryChain/readEntity.ts
import {
  decodeAbiParameters,
  encodeFunctionData,
  getContract as getContract2,
  parseAbi
} from "viem";
async function readEntityRecord(nodeHash) {
  const resolverAddress = await getResolverAddress("ai.entity.id");
  return await readResolverData(resolverAddress, nodeHash);
}
async function readResolverData(resolverAddress, nodeHash) {
  let results = {};
  try {
    const calls = DISPLAY_KEYS.map(
      (key) => encodeFunctionData({
        abi: parseAbi(["function text(bytes32,string) view returns (string)"]),
        functionName: "text",
        args: [nodeHash, key]
      })
    );
    const resolverContract = getContract2({
      client: publicClient,
      abi: [
        ...l1abi,
        ...parseAbi([
          "function multicallView(bytes[] calldata) view returns (bytes calldata)"
        ])
      ],
      address: resolverAddress
    });
    const multicallResponse = await resolverContract.read.multicallView([
      calls
    ]);
    const encodedTexts = decodeAbiParameters(
      [{ type: "bytes[]" }],
      multicallResponse
    )[0];
    const decodedResults = encodedTexts.map(
      (result, index) => {
        var _a;
        try {
          return (_a = decodeAbiParameters([{ type: "string" }], result)) == null ? void 0 : _a[0];
        } catch (error) {
          console.error(`Failed to decode text(${DISPLAY_KEYS[index]})`, error);
          return "";
        }
      }
    );
    results = DISPLAY_KEYS.reduce(
      (acc, key, index) => {
        acc[key] = decodedResults[index] || "";
        return acc;
      },
      {}
    );
  } catch (err) {
    console.log("Error reading resolver data ", err.message);
  }
  if (!results.name || !(results == null ? void 0 : results.entity__registrar))
    throw new Error(
      "results.name or results?.entity__registrar not registered"
    );
  results.domain = `${results.name}.${results.entity__registrar}.entity.id`;
  return results;
}

// src/utils/registryChain/registerEntity.ts
function getBirthDateRecords(currentEntityRecords) {
  if (currentEntityRecords.birthDate) return {};
  const m = (/* @__PURE__ */ new Date()).getMonth() + 1;
  const d = (/* @__PURE__ */ new Date()).getDate();
  const y = (/* @__PURE__ */ new Date()).getFullYear();
  return {
    entity__formation__date: {
      type: "Date",
      setValue: `${y}-${m}-${d}`
    },
    birthDate: {
      type: "Date",
      setValue: `${y}-${m}-${d}`
    }
  };
}
function getSchemaFields(entityConfig, currentEntityRecords) {
  const result = {};
  for (const [key, value] of Object.entries(entityConfig)) {
    if (Array.isArray(value)) {
      result[key] = value;
    } else if (typeof value === "string") {
      result[key] = {
        type: "string",
        setValue: value
      };
    } else {
      throw new Error(`Unexpected type in entityConfig ${typeof value}`);
    }
  }
  return {
    ...getBirthDateRecords(currentEntityRecords),
    ...result
  };
}
function getRevertErrorData(err) {
  if (!(err instanceof BaseError)) return void 0;
  const error = err.walk();
  return error == null ? void 0 : error.data;
}
async function resolverCallback(wallet, message, resBytes, callbackData) {
  const req = encodeAbiParameters(
    [{ type: "bytes" }, { type: "address" }],
    [message.callData, wallet.account.address]
  );
  const callbackContract = getContract3({
    wallet,
    args: [...callbackData.args, resBytes, req],
    ...callbackData
  });
  const tx = await callbackContract.write[callbackData.functionName]([
    ...callbackData.args,
    resBytes,
    req
  ]);
  return tx.hash;
}
async function ccipRequest({
  body,
  url
}) {
  try {
    const res = await fetch(url.replace("/{sender}/{data}.json", ""), {
      body: JSON.stringify(
        body,
        (_, value) => typeof value === "bigint" ? value.toString() : value
      ),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function handleDBStorage({
  domain,
  url,
  message,
  wallet
}) {
  const signature = await wallet.signTypedData({
    account: wallet.account,
    domain,
    message,
    types: {
      Message: [
        { name: "callData", type: "bytes" },
        { name: "sender", type: "address" },
        { name: "expirationTimestamp", type: "uint256" }
      ]
    },
    primaryType: "Message"
  });
  const requestResponse = await ccipRequest({
    body: {
      data: message.callData,
      signature: { message, domain, signature },
      sender: message.sender
    },
    url
  });
  return requestResponse;
}
var executeWriteToResolver = async (wallet, entityName, constitutionData, callbackData) => {
  try {
    await simulateContract(publicClient, {
      functionName: "register",
      args: [
        toHex(packetToBytes(entityName)),
        wallet.account.address,
        BigInt(0),
        zeroHash,
        zeroAddress3,
        constitutionData,
        false,
        0,
        zeroHash
      ],
      abi: l1abi,
      address: CONTRACT_ADDRESSES.DATABASE_RESOLVER
    });
  } catch (err) {
    const data = getRevertErrorData(err);
    switch (data == null ? void 0 : data.errorName) {
      case "StorageHandledByOffChainDatabase": {
        const [domain, url, message] = data.args;
        let urlToUse = url;
        if (process.env.NEXT_PUBLIC_RESOLVER_URL) {
          urlToUse = process.env.NEXT_PUBLIC_RESOLVER_URL;
        }
        const res = await handleDBStorage({
          domain,
          url: urlToUse,
          message,
          wallet
        });
        if (res.status === 200) {
          const resBytes = await res.text();
          if (!callbackData) return resBytes;
          return await resolverCallback(
            wallet,
            message,
            resBytes,
            callbackData
          );
        }
        return "0x";
      }
      default:
        console.error("error registering domain: ", { err });
    }
  }
};
var registerOrUpdateEntity = async (entityConfig, wallet) => {
  const nodeHash = namehash2(`${entityConfig.name}.ai.entity.id`);
  const currentEntityOwner = await checkOwner(nodeHash);
  const currentEntityRecords = await readEntityRecord(nodeHash);
  const schemaFields = getSchemaFields(entityConfig, currentEntityRecords);
  const texts = generateTexts(schemaFields);
  const resolverAddr = await getResolverAddress("ai.entity.id");
  if (!isAddressEqual(currentEntityOwner, wallet.account.address) && !isAddressEqual(currentEntityOwner, resolverAddr) && !isAddressEqual(currentEntityOwner, zeroAddress3)) {
    throw Error(
      "The user does not have permission to deploy contracts for this domain"
    );
  }
  const constitutionData = texts.map(
    (x) => encodeAbiParameters(
      [{ type: "string" }, { type: "string" }],
      [x.key, x.value]
    )
  );
  try {
    await executeWriteToResolver(
      wallet,
      entityConfig.name,
      constitutionData,
      null
    );
    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// src/services/entityID.service.ts
var EntityIDService = class _EntityIDService extends Service {
  static serviceType = "register_entityID";
  // TODO need to add a ServiceType to Eliza
  getInstance() {
    return _EntityIDService.getInstance();
  }
  async initialize(_runtime) {
    var _a;
    const wallet = getWallet(_runtime);
    const bio = Array.isArray(_runtime.character.bio) ? _runtime.character.bio.join(" ") : _runtime.character.bio;
    const entityConfig = {
      partners: [],
      // character fields
      name: _runtime.character.name,
      entity__name: _runtime.character.name,
      entity__registrar: "ai",
      description: bio,
      // avatar: _runtime.character.nft.prompt
      keywords: _runtime.character.topics.join(","),
      entity__selected__model: _runtime.character.modelProvider,
      entity__eliza__plugins: _runtime.character.plugins.join(","),
      // generic fields
      entity__type: "elizaOS",
      location: "elizaOS",
      // com.github: {repo's remote url}
      owner: wallet.account.address,
      "com.twitter": (_a = _runtime.character.twitterProfile) == null ? void 0 : _a.username,
      ...process.env.AGENT_URL && { url: process.env.AGENT_URL },
      ...process.env.AGENT_API_URL && {
        entrypoint__url: process.env.AGENT_API_URL
      }
    };
    await registerOrUpdateEntity(entityConfig, wallet);
  }
};

// src/index.ts
var entityIDPlugin = {
  name: "plugin-entityID",
  description: "The EntityID Agent Registry Plugin for ElizaOS enables AI developers to register their agents on-chain via RegistryChain. It automates smart contract interactions, ensuring verifiable and decentralized identities for AI agents in Web3.",
  services: [new EntityIDService()]
};
export {
  entityIDPlugin
};
//# sourceMappingURL=index.mjs.map