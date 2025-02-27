import { Plugin } from "@elizaos/core";
import { V3KService } from "./services/v3k.service";

export const v3kPlugin: Plugin = {
  name: "plugin-v3k",
  description:
    "The V3K Agent Registry Plugin for ElizaOS enables AI developers to register their agents on-chain via RegistryChain. It automates smart contract interactions, ensuring verifiable and decentralized identities for AI agents in Web3.",
  services: [new V3KService()],
};
