# Feason Agent Kit

Build source-grounded agents that route people to one Gospel at a time.
Matthew, Mark, Luke, and John are separate technical routes with their own
identity, aliases, canonical book constraint, MCP request, and safeguards.

This is not one generic "Gospel bot." A request for Matthew selects Matthew. It
does not redirect the learner into John or silently combine all four accounts.

## Why it is useful

The Feason Agent Kit gives an agent a bounded retrieval method:

- select the exact Gospel the user named;
- request the exact passage through Feason Context;
- keep retrieved sources separate from model explanation;
- preserve provenance and caveats returned by the MCP service;
- refuse to invent evidence when retrieval is missing.

The package embeds no Gospel interpretation, literary outline, theological
summary, or preferred doctrinal reading. Those conclusions must come from the
runtime evidence and the consuming application's disclosed method.

## Status

The source repository is public. The npm package remains unpublished until a
separate release is intentionally approved and verified.

## Quick example

```ts
import { buildGospelStudyRequest } from '@feason/agent-kit';

const request = buildGospelStudyRequest('Help me understand Matthew 5:1-12');

// request.agentId === 'understanding-matthew'
// request.contextRequest.tool === 'get_scripture_context'
// request.contextRequest.arguments.reference === 'Matthew 5:1-12'
```

The returned instructions can be used with any model or agent framework. The
`contextRequest` is shaped for Feason Context's `get_scripture_context` MCP tool:

```text
POST https://www.feason.com/api/mcp
```

Feason Context returns source text, provenance, related evidence, and caveats.
This package does not contain an API token and never persists one.

## The four routes

| Route | Constraint |
|---|---|
| Understanding Matthew | Retrieve and answer from Matthew evidence |
| Understanding Mark | Retrieve and answer from Mark evidence |
| Understanding Luke | Retrieve and answer from Luke evidence |
| Understanding John | Retrieve and answer from John evidence |

Import one agent directly when your product has already made the selection:

```ts
import { matthewAgent } from '@feason/agent-kit/gospels/matthew';
```

Or use `buildGospelStudyRequest(question)` when a user names a Gospel in natural
language. It returns `null` when no Gospel is named; there is deliberately no
default Gospel.

## Local validation

```bash
npm install
npm run check
```

The package requires Node.js 20 or later. It has no runtime dependencies.

## Boundaries

This repository provides routing and integration helpers, not embedded
theological profiles. Applications must preserve source attribution and clearly
separate retrieved evidence from their own generated interpretation.

See `NOTICE.md` for the content and data-license boundary.

## Contributing

See `CONTRIBUTING.md`. Changes that add interpretive or theological content must
be proposed as a separately reviewed content layer rather than hidden inside the
technical router.

## License

MIT License. Copyright 2026 Feason LLC.
