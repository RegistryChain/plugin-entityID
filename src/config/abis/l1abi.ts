// address: 0x8c6ab6c2e78d7d2b2a6204e95d8a8874a95348a4

export const l1abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_chainId", type: "uint256", internalType: "uint256" },
      { name: "_target_resolver", type: "address", internalType: "address" },
      { name: "_target_registrar", type: "address", internalType: "address" },
      {
        name: "_verifier",
        type: "address",
        internalType: "contract IEVMVerifier",
      },
      { name: "_metadataUrl", type: "string", internalType: "string" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addr",
    inputs: [{ name: "node", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address payable" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addr",
    inputs: [
      { name: "node", type: "bytes32", internalType: "bytes32" },
      { name: "coinType", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { type: "bytes32", name: "node" },
      { type: "address", name: "owner" },
    ],
    stateMutability: "view",
    outputs: [],
  },
  {
    type: "function",
    name: "addrCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "addrCoinTypeCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "contenthash",
    inputs: [{ name: "node", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contenthashCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getStorageSlotsCallback",
    inputs: [
      { name: "response", type: "bytes", internalType: "bytes" },
      { name: "extradata", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "metadata",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "metadataUrl",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [{ name: "", type: "bytes[]", internalType: "bytes[]" }],
    outputs: [{ name: "", type: "bytes[]", internalType: "bytes[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
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
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "registerParams",
    inputs: [
      { name: "", type: "bytes", internalType: "bytes" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerParamsCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      { name: "price", type: "uint256", internalType: "uint256" },
      { name: "commitTime", type: "uint256", internalType: "uint256" },
      { name: "extraData", type: "bytes", internalType: "bytes" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      { name: "", type: "bytes", internalType: "bytes" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "result", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setAddr",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setAddr",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setContenthash",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setMetadataUrl",
    inputs: [{ name: "newUrl", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTarget",
    inputs: [
      { name: "key", type: "bytes32", internalType: "bytes32" },
      { name: "target", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setText",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "string", internalType: "string" },
      { name: "", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceID", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targets",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "text",
    inputs: [
      { name: "node", type: "bytes32", internalType: "bytes32" },
      { name: "key", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "textCallback",
    inputs: [
      { name: "values", type: "bytes[]", internalType: "bytes[]" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "L2HandlerContractAddressChanged",
    inputs: [
      {
        name: "chainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "previousContractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newContractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "L2HandlerDefaultChainIdChanged",
    inputs: [
      {
        name: "previousChainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "newChainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MetadataChanged",
    inputs: [
      {
        name: "previousUrl",
        type: "string",
        indexed: true,
        internalType: "string",
      },
      { name: "newUrl", type: "string", indexed: true, internalType: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OffChainDatabaseHandlerURLChanged",
    inputs: [
      {
        name: "previousUrl",
        type: "string",
        indexed: true,
        internalType: "string",
      },
      { name: "newUrl", type: "string", indexed: true, internalType: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "CommandTooLong", inputs: [] },
  {
    type: "error",
    name: "InvalidReference",
    inputs: [
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "max", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "OffchainLookup",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "urls", type: "string[]", internalType: "string[]" },
      { name: "callData", type: "bytes", internalType: "bytes" },
      { name: "callbackFunction", type: "bytes4", internalType: "bytes4" },
      { name: "extraData", type: "bytes", internalType: "bytes" },
    ],
  },
  {
    type: "error",
    name: "ResponseLengthMismatch",
    inputs: [
      { name: "actual", type: "uint256", internalType: "uint256" },
      { name: "expected", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "StorageHandledByL2",
    inputs: [
      { name: "chainId", type: "uint256", internalType: "uint256" },
      { name: "contractAddress", type: "address", internalType: "address" },
    ],
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
            internalType: "address",
          },
        ],
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
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "error",
    name: "TooManyCommands",
    inputs: [{ name: "max", type: "uint256", internalType: "uint256" }],
  },
] as const;
