import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readEntityRecord } from "../src/utils/registryChain/readEntity";
import { namehash } from "viem";

describe("Entity ID Service", () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe("Read Entity", () => {
    it("Should read test.ai.entity.id", async () => {
      const entityName = "test";
      const nodeHash = namehash(`${entityName}.ai.entity.id`);
      const records = await readEntityRecord(nodeHash);
      console.log(JSON.stringify(records, undefined, 2));
    });
  });

  describe("Register new Entity", () => {
    it("Should register random.ai.entity.id", async () => {});
  });
});
