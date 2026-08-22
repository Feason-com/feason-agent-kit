import { johnAgent } from './gospels/john.js';
import { lukeAgent } from './gospels/luke.js';
import { markAgent } from './gospels/mark.js';
import { matthewAgent } from './gospels/matthew.js';
import type { GospelAgentProfile, GospelName, GospelStudyRequest } from './types.js';

export { johnAgent } from './gospels/john.js';
export { lukeAgent } from './gospels/luke.js';
export { markAgent } from './gospels/mark.js';
export { matthewAgent } from './gospels/matthew.js';
export { gospelNames } from './types.js';
export type {
  GospelAgentProfile,
  GospelName,
  GospelStudyRequest,
  InterpretiveLens,
  LiterarySection,
  StartingPoint,
} from './types.js';

export const gospelAgents = {
  Matthew: matthewAgent,
  Mark: markAgent,
  Luke: lukeAgent,
  John: johnAgent,
} satisfies Record<GospelName, GospelAgentProfile>;

const aliases: Record<string, GospelName> = {
  matthew: 'Matthew',
  matt: 'Matthew',
  mt: 'Matthew',
  mark: 'Mark',
  mk: 'Mark',
  luke: 'Luke',
  lk: 'Luke',
  john: 'John',
  jn: 'John',
};

export function detectGospel(input: string): GospelName | null {
  const match = input.match(/\b(matthew|matt|mt|mark|mk|luke|lk|john|jn)\b/i);
  return match?.[1] ? aliases[match[1].toLowerCase()] ?? null : null;
}

export function getGospelAgent(input: GospelName | string): GospelAgentProfile | null {
  if (Object.prototype.hasOwnProperty.call(gospelAgents, input)) {
    return gospelAgents[input as GospelName];
  }
  const gospel = detectGospel(input);
  return gospel ? gospelAgents[gospel] : null;
}

function passageFromQuestion(question: string, gospel: GospelName) {
  const escaped = gospel === 'Matthew' ? '(?:Matthew|Matt|Mt)' :
    gospel === 'Mark' ? '(?:Mark|Mk)' :
      gospel === 'Luke' ? '(?:Luke|Lk)' : '(?:John|Jn)';
  const match = question.match(new RegExp(`\\b${escaped}\\.?\\s+\\d{1,2}(?::\\d{1,3}(?:-\\d{1,3})?)?`, 'i'));
  return match?.[0] ?? gospel;
}

export function buildGospelStudyRequest(question: string): GospelStudyRequest | null {
  const profile = getGospelAgent(question);
  if (!profile) return null;

  const lenses = profile.lenses
    .map((lens, index) => `${index + 1}. ${lens.title}: ${lens.instruction}`)
    .join('\n');
  const safeguards = profile.safeguards.map((item) => `- ${item}`).join('\n');

  return {
    agentId: profile.id,
    gospel: profile.gospel,
    question,
    contextRequest: {
      tool: 'get_scripture_context',
      arguments: { reference: passageFromQuestion(question, profile.gospel) },
    },
    instructions: [
      `You are ${profile.title}, a source-grounded learning agent dedicated to the Gospel of ${profile.gospel}.`,
      profile.learningGoal,
      'Begin with the requested passage and its immediate literary context. Distinguish quoted source text from your explanation.',
      'Use these Gospel-specific lenses:',
      lenses,
      'Safeguards:',
      safeguards,
      'If evidence is missing or a conclusion is disputed, say so plainly. End with one question that invites the learner back into the text.',
    ].join('\n\n'),
  };
}
