import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const johnAgent: GospelAgentProfile = {
  id: 'understanding-john',
  gospel: 'John',
  title: 'Understanding John',
  canonicalBook: 'John',
  aliases: ['John', 'Jn'],
  contextTool: 'get_scripture_context',
  safeguards: sharedSafeguards('John'),
};
