import * as dotenv from "dotenv";

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readEntityRecord } from "@/utils/registryChain/readEntity";
import { namehash, toHex } from "viem";
import { registerEntity } from "@utils/registryChain/registerEntity";
import { updateEntity } from "@utils/registryChain/updateEntity";
import { getWallet } from "@/environment";
import { IAgentRuntime } from "@elizaos/core";
import { EntityConfig } from "@/types";
import { getResolverAddress } from "@/utils/ens/getResolverAddress";

dotenv.config({ path: ".env.test" });

describe("AI Entity ID Service", () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe("Read AI Entity", () => {
    it("Can read test.ai.entity.id on-chain", async () => {
      const entityName = "test";
      const nodeHash = namehash(`${entityName}.ai.entity.id`);
      const records = await readEntityRecord(nodeHash);

      expect(records).toMatchObject({
        entity__name: "test",
        entity__registrar: "ai",
        entity__type: "Agent",
        entity__platform: "virtuals",
        entity__token__address: "0xbcc2ffbd393f5bf3021cb66aa797189f1bd4f419",
        entity__twitter: "",
        entity__telegram: "",
        entity__code: "0002",
        name: "test",
        address: "0x47081b8b91e2ebc02d799f2dec995f7528d66c85",
        description: "test",
        url: "https://V3K.com/agent/test.ai.entity.id",
        location: "virtuals",
        avatar: "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_4424e00dee.jpeg",
        nodeHash: "0x6f3bc29297265f90ddbdfd28dd05686dd1d22fe352f26139e1051149253a0f5e",
        domain: "test.ai.entity.id",
        partners: [
          {
            name: "Agent Owner",
            wallet__address: "0xf44f47df2b67982798486ccaaf85a4152d2bdc81",
            DOB: "2025-02-21",
            roles: [],
            _id: "67b7d63075018158df2d3ac5",
            id: "67b7d63075018158df2d3ac5",
            shares: 0,
          },
        ],
        contradictoryFields: [],
        changeLogs: [],
        sourcePageUrl:
          "https://app.virtuals.io/prototypes/0xbcc2ffbd393f5bf3021cb66aa797189f1bd4f419",
        featured: false,
        hidden: false,
      });
    });

    it("Can read plugin-entityid-test-suite-0x1d1.ai.entity.id offchain", async () => {
      const _nodeHash = "0x58d88c6a2813df98fffbde9b70d0d646e1cc5781077adcf80694ec721644c0d6";
      const records = await readEntityRecord(_nodeHash);

      expect(records).toMatchObject({
        name: "plugin-entityid-test-suite-0x1d1",
        address: "0x7e57c32Dadb4A92a596A92005Ba89c685a3f8827",
        description: "This is a test record created by the plugin-entityID test suite",
        url: "https://V3K.com/agent/plugin-entityid-test-suite-0x1d1.ai.entity.id",
        owner: "0x7e57c32Dadb4A92a596A92005Ba89c685a3f8827",
        partners: [],
        contradictoryFields: [],
        entity__name: "plugin-entityid-test-suite-0x1d1",
        entity__registrar: "ai",
        entity__selected__model: "OpenAI",
        entity__type: "elizaOS",
        hidden: true,
        entity__code: "0002",
        domain: "plugin-entityid-test-suite-0x1d1.ai.entity.id",
        nodeHash: "0x58d88c6a2813df98fffbde9b70d0d646e1cc5781077adcf80694ec721644c0d6",
      });
    });
  });

  describe("Register new AI Entity", () => {
    it("Should register {random-name}.ai.entity.id", async () => {
      const runtime = {
        getSetting: (_: string) => process.env.TEST_PRIVATE_KEY,
      } as IAgentRuntime;
      const wallet = getWallet(runtime);

      const randomSuffix = toHex(Math.round(Math.random() * 10000));
      const entityName = `plugin-entityid-test-suite-${randomSuffix}`;

      const entityConfig: EntityConfig = {
        partners: [],
        // character fields
        name: entityName,
        entity__name: entityName,
        entity__registrar: "ai",
        description: "This is a test record created by the plugin-entityID test suite",
        // generic fields
        entity__type: "elizaOS",
        owner: wallet.account.address,
        // AI agent fields
        aiagent__id: "27a41c84-921d-4e17-84f6-ab73c5aa0018",
        aiagent__llm__provider: "OpenAI",
      };

      const resolver = await getResolverAddress("ai.entity.id");

      await registerEntity(entityConfig, wallet, resolver);

      const _nodeHash = namehash(`${entityName}.ai.entity.id`);
      const records = await readEntityRecord(_nodeHash);

      if (records === undefined) throw new Error("records is undefined");

      const { hidden, entity__code, domain, nodeHash, changeLogs, url, ...rest } = records;

      expect(rest).toMatchObject(entityConfig);
    });
  });

  describe("Update AI Entity", () => {
    it("Should register {random-name}.ai.entity.id", async () => {
      const runtime = {
        getSetting: (_: string) => process.env.TEST_PRIVATE_KEY,
      } as IAgentRuntime;
      const wallet = getWallet(runtime);

      const randomSuffix = toHex(Math.round(Math.random() * 10000));
      const entityName = `plugin-entityid-test-suite-${randomSuffix}`;

      const entityConfig: EntityConfig = {
        partners: [],
        // character fields
        name: entityName,
        entity__name: entityName,
        entity__registrar: "ai",
        description: "This is a test record created by the plugin-entityID test suite",
        // avatar: _runtime.character.nft.prompt
        entity__selected__model: "OpenAI",
        // generic fields
        entity__type: "elizaOS",
        // com.github: {repo's remote url}
        owner: wallet.account.address,
        // "com.twitter": "RegistryChain",
      };

      const resolver = await getResolverAddress("ai.entity.id");

      await registerEntity(entityConfig, wallet, resolver);

      const _nodeHash = namehash(`${entityName}.ai.entity.id`);

      {
        const records = await readEntityRecord(_nodeHash);

        if (records === undefined) throw new Error("records is undefined");

        const { hidden, entity__code, domain, nodeHash, changeLogs, url, ...rest } = records;

        expect(rest).toMatchObject(entityConfig);
      }

      const newEntityConfig: any = {
        description: "This is a test record created by the plugin-entityID test suite",
      };

      await updateEntity(entityName, newEntityConfig, wallet, resolver);

      {
        const records = await readEntityRecord(_nodeHash);

        if (records === undefined) throw new Error("records is undefined");

        const { hidden, entity__code, domain, nodeHash, changeLogs, url, ...rest } = records;

        expect(rest).toMatchObject({ ...entityConfig, ...newEntityConfig });
      }
    });
  });
});
