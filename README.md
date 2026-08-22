# Feason Agent Kit

Build source-grounded agents that help people understand one Gospel at a time.
Matthew, Mark, Luke, and John are separate agents with their own literary map,
learning goal, interpretive lenses, starting passages, and safeguards.

This is not one generic "Gospel bot." A request for Matthew selects Matthew. It
does not redirect the learner into John or silently combine all four accounts.

## Why it is useful

General-purpose agents can quote a verse while missing the shape of the book it
comes from. The Feason Agent Kit gives an agent a bounded study method:

- begin with the biblical text and immediate context;
- read the requested Gospel as its own witness;
- distinguish sources from interpretation;
- attribute disputed conclusions rather than inventing consensus;
- compare another Gospel only when the comparison clarifies the requested one;
- invite the learner back into the text instead of replacing study with a verdict.

## Status

This repository is a public-release candidate. It remains private and the npm
package remains unpublished until the four profiles receive named human
theological approval.

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

## The four agents

| Agent | Primary attention |
|---|---|
| Understanding Matthew | Israel's Scriptures, kingdom, teaching, righteousness, discipleship, and mission |
| Understanding Mark | Urgency, authority, contested identity, misunderstanding, the cross, and costly discipleship |
| Understanding Luke | The Spirit, prayer, reversal, mercy, table fellowship, Jerusalem, and witness |
| Understanding John | Signs, testimony, symbolic language, feasts, love, glory, belief, and life |

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

This repository provides learning profiles and integration helpers. It does not
provide pastoral care, determine doctrine for a church, or replace qualified
teachers and communities. Applications must preserve source attribution and
must not present one Christian tradition's disputed interpretation as universal.

See `NOTICE.md` for the content and data-license boundary.

## Contributing

See `CONTRIBUTING.md`. Changes to theological profile text require named human
theological review before release.

## License

MIT License. Copyright 2026 Feason LLC.
