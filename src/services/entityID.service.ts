import { type IAgentRuntime, Service, ServiceType } from "@elizaos/core";
import { registerEntity } from "../utils/registryChain/registerEntity";
import { getWallet } from "../environment";

export class EntityIDService extends Service {
  static serviceType: ServiceType = "register_entityID" as ServiceType; // TODO need to add a ServiceType to Eliza

  constructor() {
    super();
  }

  getInstance(): EntityIDService {
    return EntityIDService.getInstance();
  }

  async initialize(_runtime: IAgentRuntime): Promise<void> {
    const wallet = getWallet(_runtime);
    await registerEntity(_runtime.character.name, wallet);
  }
}
