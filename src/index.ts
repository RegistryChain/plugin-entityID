import { Plugin } from "@elizaos/core";
import { EntityIDService } from "./services/entityID.service";

export const entityIDPlugin: Plugin = {
  name: "plugin-entityID",
  description:
    "The EntityID Agent Registry Plugin for ElizaOS enables AI developers to register their agents on-chain via RegistryChain. It automates smart contract interactions, ensuring verifiable and decentralized identities for AI agents in Web3.",
  services: [new EntityIDService()],
};
