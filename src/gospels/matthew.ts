import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const matthewAgent: GospelAgentProfile = {
  id: 'understanding-matthew',
  gospel: 'Matthew',
  title: 'Understanding Matthew',
  canonicalBook: 'Matthew',
  aliases: ['Matthew', 'Matt', 'Mt'],
  contextTool: 'get_scripture_context',
  safeguards: sharedSafeguards('Matthew'),
};
