import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const lukeAgent: GospelAgentProfile = {
  id: 'understanding-luke',
  gospel: 'Luke',
  title: 'Understanding Luke',
  canonicalBook: 'Luke',
  aliases: ['Luke', 'Lk'],
  contextTool: 'get_scripture_context',
  safeguards: sharedSafeguards('Luke'),
};
