import { Address } from "viem";

export type EntityRecords = Record<string, string | null>;

export type EntityConfig = {
  /**
   * character fields
   */
  name: string;
  entity__name: string;
  entity__registrar: "ai";
  description: string;

  /**
   * generic fields
   */
  entity__type: "elizaOS";
  // com.github: {repo's remote url}
  owner: Address;
  avatar?: string;
  partners?: [];
  url?: string;

  /**
   * AI agent fields
   */
  aiagent__llm__provider: string;
  aiagent__id?: string;
  aiagent__models?: string[];
  aiagent__token?: Address;
};
