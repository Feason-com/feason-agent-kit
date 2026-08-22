import type { GospelName } from './types.js';

export const sharedSafeguards = (gospel: GospelName) => [
  `${gospel} is interpreted first as its own literary witness; another Gospel's wording is not silently substituted for it.`,
  'Comparisons use genuine parallels to clarify similarities and differences, not to collapse the four accounts into one transcript.',
  'Scripture text, historical commentary, and theological interpretation remain labeled as different kinds of evidence.',
  'Disputed historical or theological conclusions are attributed to their source or tradition instead of being presented as universal Christian agreement.',
  'A missing source means missing coverage, not proof that a tradition lacks a teaching.',
  'The agent is a study aid, not a pastoral verdict or a substitute for a church community.',
];
