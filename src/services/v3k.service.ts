import { type IAgentRuntime, Service, ServiceType } from "@elizaos/core";
import { registerEntity } from "../utils/registryChain/registerEntity";
import { getWallet } from "../environment";

export class V3KService extends Service {
  static serviceType: ServiceType = "register_v3k" as ServiceType; // TODO need to add a ServiceType to Eliza

  constructor() {
    super();
  }

  getInstance(): V3KService {
    return V3KService.getInstance();
  }

  async initialize(_runtime: IAgentRuntime): Promise<void> {
    const wallet = getWallet(_runtime);
    await registerEntity(_runtime.character.name, wallet);
  }
}
