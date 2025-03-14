import { type IAgentRuntime, Service, ServiceType } from "@elizaos/core";
import { registerOrUpdateEntity } from "@utils/registryChain/registerEntity";
import { getWallet } from "@/environment";
import { EntityConfig } from "@/types";

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
      // avatar: _runtime.character.nft.prompt
      keywords: _runtime.character.topics.join(","),
      entity__selected__model: _runtime.character.modelProvider,
      entity__eliza__plugins: _runtime.character.plugins.join(","),
      // generic fields
      entity__type: "elizaOS",
      location: "elizaOS",
      // com.github: {repo's remote url}
      owner: wallet.account.address,
      "com.twitter": _runtime.character.twitterProfile?.username,
      ...(process.env.AGENT_URL && { url: process.env.AGENT_URL }),
      ...(process.env.AGENT_API_URL && {
        entrypoint__url: process.env.AGENT_API_URL,
      }),
    };

    await registerOrUpdateEntity(entityConfig, wallet);
  }
}
