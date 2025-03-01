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
    category: "eliza",
    description: string, // description of the agent
    tokenAddress?: string, // agent's token
    platform: "eliza",
    purpose?: string, // description of the purpose of the agent
    github?: string,
    endpoint?: string,
    socials: {
      twitter?: string,
      telegram?: string,
      discord?: string
    },
    developers: {
      name: string,
      email?: string,
      address?: string
    }[]
  }
```

## Installation

```bash
npm install @elizaos/plugin-entityID
```

## Configuration

The plugin requires the following environment variables:

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

### Update an agent's registration (coming soon)

### Get an agent's registration (coming soon)

## License

This plugin is part of the Eliza project. See the main project repository for license information.
