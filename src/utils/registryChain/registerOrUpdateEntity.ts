import {
  Account,
  Chain,
  isAddressEqual,
  namehash,
  Transport,
  WalletClient,
  zeroAddress,
} from "viem";
import { EntityConfig } from "@/types";
import { checkOwner } from "@utils/ens/checkOwner";
import { getResolverAddress } from "@utils/ens/getResolverAddress";
import { readEntityRecord } from "@utils/registryChain/readEntity";
import { updateEntity } from "./updateEntity";
import { registerEntity } from "./registerEntity";

export const registerOrUpdateEntity = async (
  entityConfig: EntityConfig,
  wallet: WalletClient<Transport, Chain, Account>,
) => {
  const nodeHash = namehash(`${entityConfig.name}.ai.entity.id`);

  // If there is no owner to the domain, make the register.
  const currentEntityOwner = await checkOwner(nodeHash);

  const resolverAddr = await getResolverAddress("ai.entity.id");

  // Should check if EITHER public reg is the domain owner OR connect addr is owner and has approved
  // If false, prevent the registration
  if (
    currentEntityOwner &&
    !isAddressEqual(currentEntityOwner, wallet.account.address) &&
    !isAddressEqual(currentEntityOwner, resolverAddr) &&
    !isAddressEqual(currentEntityOwner, zeroAddress) //IN CASES OF OFFCHAIN REGISTRATION, THE ON CHAIN OWNER IS 0x0. THE GATEWAY THEN CHECKS IF 'OWNED' OFFCHAIN
  ) {
    throw new Error(
      `Name ${entityConfig.name} is already owned by ${currentEntityOwner}, please change it to an available name`,
    );
  }

  // Read record if already registered
  const currentEntityRecords = await readEntityRecord(nodeHash);

  if (currentEntityRecords === undefined) {
    console.log(`Registering ${entityConfig.name}.ai.entity.id`);

    await registerEntity(entityConfig, wallet, resolverAddr);
  } else {
    if (currentEntityRecords.owner?.toLowerCase() !== wallet.account.address.toLowerCase()) {
      throw new Error(
        `Name ${entityConfig.name} is already owned by ${currentEntityRecords.owner}, please change it to an available name`,
      );
    }

    const newFields: Record<string, string> = {};

    for (const key in entityConfig) {
      if (
        currentEntityRecords[key] === undefined ||
        currentEntityRecords[key] !== entityConfig[key]
      ) {
        newFields[key] = entityConfig[key];
      }
    }

    if (Object.keys(newFields).length === 0) {
      console.log(
        `Registration up to date for ${entityConfig.name}.ai.entity.id, , see it at https://v3k.com/agent/${entityConfig.name}.ai.entity.id`,
      );
      return;
    }

    console.log(
      `Updating records ${Object.keys(newFields).join(", ")} for ${entityConfig.name}.ai.entity.id`,
    );

    await updateEntity(entityConfig.name, newFields, wallet, resolverAddr);
  }
};
