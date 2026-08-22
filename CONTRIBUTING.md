# Contributing

Thank you for helping agents support careful reading of the Gospels.

## Before opening a pull request

1. Keep Matthew, Mark, Luke, and John as separate technical routes. Do not add a
   fallback that silently sends one Gospel request to another.
2. Keep interpretation out of the router. Retrieve evidence at runtime through
   the configured MCP service.
3. Preserve source metadata, caveats, and the boundary between evidence and a
   consuming model's explanation.
4. Do not add copyrighted Scripture text or commentary without recording its
   license and required attribution.
5. Run `npm run check`.

## Review requirements

- Code changes require maintainer review.
- Interpretive or theological content belongs in a separately reviewed content
  layer, not in this infrastructure package.
- Security vulnerabilities should follow `SECURITY.md`, not a public issue.

By contributing, you agree that your contribution is licensed under the MIT
License included in this repository and that you have the right to submit it.
