# Feason Agent Kit

Build source-grounded Christian learning agents. The kit includes Angelent, a
bounded Beatitude-shaped profile, and four Gospel routes that keep Matthew,
Mark, Luke, and John distinct.

## Angelent

Angelent is an artificial agent profile, not an angel or source of divine
authority. It translates the Beatitudes into operational disciplines, declares
seven read-only Feason Context tools, separates evidence from model
explanation, and instructs the agent to avoid external action.

```ts
import { buildAngelentRequest } from '@feason/agent-kit/angelent';

const request = buildAngelentRequest(
  'How should I understand mercy in Matthew 5?'
);

// request.canTakeExternalAction === false
// request.allowedTools contains only read-only Feason Context tools
```

The returned profile is framework-neutral. The consuming application chooses
its model and transport while preserving the profile's tool allowlist,
ontology disclosure, source boundaries, and human-authority safeguards.
These instructions and `canTakeExternalAction: false` are metadata, not a
sandbox. Enforce the tool allowlist in your application and do not expose
account, publishing, payment, or messaging tools to this agent.

## Gospel routes

Route people to one Gospel at a time.
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
language. It returns `null` when no Gospel is named, multiple Gospels are named,
or a numbered book such as 1 John is present. There is no default Gospel.

## Handle clarification before retrieval

| Input | Result | Application action |
|---|---|---|
| `Matthew 5:1–12` | Matthew route and `Matthew 5:1-12` reference | Retrieve evidence, then explain it |
| `Mk. 8` | Mark route and `Mark 8` reference | Retrieve that chapter's available context |
| `Help me understand Luke` | Luke route, `needsPassage: true` | Ask for a passage |
| `Compare Matthew 5 with Luke 6` | `null` | Ask the learner to choose one Gospel first |
| `1 John 4:8` or `Romans 8` | `null` | Use a general Scripture workflow outside this Gospel router |
| `John 3:16-4:2` or `John 3:16,18` | John route, `needsPassage: true` | Ask for one chapter or one same-chapter verse range |

The router normalizes aliases, whitespace, and dash characters. It checks chapter
bounds and verse-range order; the retrieval service remains responsible for
passage availability and exact verse coverage. This is a small text router, not
a general natural-language intent classifier. A product with a book picker can
pass its selected canonical Gospel and passage directly.

Never use `request!` or `contextRequest!` on untrusted user input. Handle both
clarification states before making a tool call:

```ts
const request = buildGospelStudyRequest(question);
if (!request) {
  // Ask for exactly one supported Gospel, or use a broader Scripture workflow.
} else if (!request.contextRequest) {
  // Ask for one chapter, verse, or same-chapter verse range in request.gospel.
} else {
  const result = await connectedMcpClient.callTool({
    name: request.contextRequest.tool,
    arguments: request.contextRequest.arguments,
  });
  // Check result.isError and the returned found / coverage fields.
  // Keep the requested passage separate from cross-references and commentary.
  // Preserve citations, source metadata, and caveats before generating an answer.
}
```

`connectedMcpClient` above is your application's initialized, authenticated MCP
client. The kit creates a request plan; it does not open a connection or make a
network call. Its `{ tool, arguments }` plan must be mapped to MCP's
`{ name, arguments }` call shape, as shown above. Follow the
[Context connection guide](https://www.feason.com/mcp) for transport and access.
Keep tokens on your server, outside prompts and client-side bundles.

## Use cases

| Build | Start with | Keep visible to the reader |
|---|---|---|
| A passage study assistant | `buildGospelStudyRequest('Matthew 5:1-12')` | The exact passage, attribution, and a separately labeled explanation |
| A reading-plan companion | A selected day's `Mark 8:27-30` reference | The selected Gospel and any missing retrieval; advance the plan in application code |
| A small-group preparation tool | One passage such as `Luke 10:25-37` | Source evidence and generated discussion questions as separate sections |
| An editorial citation review | One quoted Gospel reference at a time | A review-required state when retrieval is missing; this router does not verify a quote by itself |
| A broader research assistant | `buildAngelentRequest(question)` | Named traditions, uncertainty, tool results, and the artificial-agent disclosure |

For a comparison across Gospels, have the application collect an explicit
passage for each Gospel and call the router separately. Present the resulting
evidence in separate panels before adding a labeled comparison. A single
multi-Gospel prompt deliberately does not select the first book it finds.

These are integration patterns, not bundled model runtimes or automatic
publishing features. Human review remains part of editorial and teaching use.

## Local validation

```bash
npm ci
npm run check
```

The package requires Node.js 20 or later. It has no runtime dependencies.
Until the npm package is released, run the built source locally:

```bash
node --input-type=module <<'JS'
import { buildGospelStudyRequest } from './dist/index.js';
console.log(buildGospelStudyRequest('Matthew 5:1-12'));
JS
```

On Node.js 24, the source-only CLI example can also be run with
`node examples/understand-gospel.ts 'Mark 8:27-30'`. It prints a request plan and
does not contact Feason or require a token.

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
