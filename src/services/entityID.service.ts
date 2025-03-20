import { type IAgentRuntime, Service, ServiceType } from "@elizaos/core";
import { getWallet } from "@/environment";
import { EntityConfig } from "@/types";
import { registerOrUpdateEntity } from "@/utils/registryChain/registerOrUpdateEntity";
import { Address } from "viem";

export class EntityIDService extends Service {
  static serviceType: ServiceType = "register_entityID" as ServiceType; // TODO need to add a ServiceType to Eliza

  getInstance(): EntityIDService {
    return EntityIDService.getInstance();
  }

  async initialize(_runtime: IAgentRuntime): Promise<void> {
    const wallet = getWallet(_runtime);

    const bio = Array.isArray(_runtime.character.bio)
      ? _runtime.character.bio.join(" ")
      : _runtime.character.bio;

    const entityConfig: EntityConfig = {
      partners: [],
      // character fields
      name: _runtime.character.name,
      entity__name: _runtime.character.name,
      entity__registrar: "ai",
      description: bio,

      // generic fields
      entity__type: "elizaOS",
      owner: wallet.account.address,

      // AI agent fields
      aiagent__id: _runtime.character.id,
      aiagent__llm__provider: _runtime.character.modelProvider,
      ...(_runtime.token !== null && {
        aiagent__token: _runtime.token satisfies string as Address,
      }),
    };

    await registerOrUpdateEntity(entityConfig, wallet);
  }
}
