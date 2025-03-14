import { Address } from "viem";

export type EntityConfig = {
  /**
   * character fields
   */
  name: string;
  entity__name: string;
  entity__registrar: "ai";
  description: string;
  keywords: string;
  entity__selected__model: string;
  entity__eliza__plugins: string;

  /**
   * generic fields
   */
  entity__type: "elizaOS";
  location: "elizaOS";
  // com.github: {repo's remote url}
  owner: Address;
  "com.twitter"?: string;
  avatar?: string;
  url?: string;
  entrypoint__url?: string;
  partners: [];
};
