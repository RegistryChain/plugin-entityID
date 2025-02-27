# @elizaos/plugin-v3k

The V3K Agent Registry Plugin for ElizaOS enables AI developers to register their agents on-chain via RegistryChain. It automates smart contract interactions, ensuring verifiable and decentralized identities for AI agents in Web3.

## Overview

This plugin provides functionality to:

- Register an AI agent on-chain
- Update a registration (coming soon)
- Get an agent's registration (coming soon)

## Installation

```bash
npm install @elizaos/plugin-v3k
```

## Configuration

The plugin requires the following environment variables:

```env
EVM_PRIVATE_KEY=your_private_key
```

## Usage

Import and register the plugin in your Eliza configuration:

```typescript
import { suiPlugin } from "@elizaos/plugin-v3k";

export default {
    plugins: [v3kPlugin],
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
