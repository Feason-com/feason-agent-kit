import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const markAgent: GospelAgentProfile = {
  id: 'understanding-mark',
  gospel: 'Mark',
  title: 'Understanding Mark',
  canonicalBook: 'Mark',
  aliases: ['Mark', 'Mk'],
  contextTool: 'get_scripture_context',
  safeguards: sharedSafeguards('Mark'),
};
