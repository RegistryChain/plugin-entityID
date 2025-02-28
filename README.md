# @elizaos/plugin-entityID

The EntityID Agent Registry Plugin for ElizaOS enables AI developers to register their agents on-chain via RegistryChain. It automates smart contract interactions, ensuring verifiable and decentralized identities for AI agents in Web3.

## Overview

This plugin provides functionality to:

- Register an AI agent on-chain

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

- Update a registration

As you iterate on the capabilities and features of your agent, see its on-chain records evolve.

- Get an agent's registration

Create trust in agent to agent interactions by retrieving agent's on-chain records.

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
