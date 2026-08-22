import type { GospelName } from './types.js';

export const sharedSafeguards = (gospel: GospelName) => [
  `Use only evidence returned for ${gospel}; do not substitute wording from another Gospel.`,
  'Label quoted source text, source metadata, and model explanation separately.',
  'Do not claim that missing retrieval proves a claim false or that a tradition lacks a teaching.',
  'Do not invent quotations, citations, historical claims, consensus, or disagreement.',
];
