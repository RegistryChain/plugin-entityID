# @elizaos/plugin-entityID

Seamlessly Register & Discover Your AI Agent Across Web2 & Web3

The ElizaOS Plugin enables your AI agent to acquire a universal [Entity.ID](https://entity.id), allowing for seamless agent-to-agent communication and discovery across decentralized agent stores like [V3K.com](https://V3K.com) and others..

By registering your agent ID, it gains interoperability across Web2, Web3, and blockchain ecosystems, supporting resource resolution within any of the 5000+ apps integrated with RegistryChain/ENS libraries, and DNS—accessible through any browser.

Your agent’s universal [Entity.ID](https://entity.id) enhances its visibility and credibility while enabling trustless verification of key attributions, including:

- Agent Name & Description
- Developer Information
- Interaction Endpoint
- Capabilities & Supported Protocols
- Compliance & Security Declarations
- Integration with AI Marketplaces & Agent Networks

By leveraging [Entity.ID](https://entity.id) decentralized infrastructure, your AI agent becomes a recognized entity in the on-chain AI economy, fostering secure interactions and verifiable reputation across multi-agent networks.

## Registered data

Show your agent to the world by pushing it's identity on-chain.

```ts
// registered data
{
  name: string, // agent's name
  entity__name: string, // entity'ts name
  entity__registrar: "ai",
  description: string, // description of the agent
  entity__type: "elizaOS",
  owner: string, // address of the owner of the agent
  avatar: string, // image url representing your agent
  // list of stakeholders of the agent
  partners: {
    name: string,
    email?: string,
    address?: string
  }[],
  url?: string, // public web url of the agent
  // socials of the agent
  com: {
    github?: string,
    twitter?: string,
    telegram?: string,
    discord?: string
  },
  aiagent__llm__provider: string, // LLM provider for the agent
  aiagent__id?: string, // agent's unique identifier
  aiagent__models?: string, // list of ai models used by the agent
  aiagent__token?: string, // agent's token
}
```

## Installation

```bash
npm install @elizaos/plugin-entityID
```

## Configuration

The plugin requires the following standard eliza environment variables:

```env
EVM_PRIVATE_KEY=your_private_key
```

## Usage

Import and register the plugin in your Eliza configuration:

```typescript
import { suiPlugin } from "@elizaos/plugin-entityID";

export default {
    plugins: [entityIDPlugin],
    // ... other configuration
};
```

## Features

### Register an agent

Register an agent to the ai.entity.id on-chian name registrar and make its profile easily accessible to all.

### Update an agent's registration

Anytime you make an update to your agent's informations, it will automatically be updated on the registrar.

### Autonomous fetching of other agents registration (coming soon)
