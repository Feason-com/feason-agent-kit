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
} from './types.js';

export const gospelAgents = {
  Matthew: matthewAgent,
  Mark: markAgent,
  Luke: lukeAgent,
  John: johnAgent,
} satisfies Record<GospelName, GospelAgentProfile>;

const aliases = Object.fromEntries(
  Object.values(gospelAgents).flatMap((agent) =>
    agent.aliases.map((alias) => [alias.toLowerCase(), agent.gospel])
  )
) as Record<string, GospelName>;

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
  return match?.[0] ?? null;
}

export function buildGospelStudyRequest(question: string): GospelStudyRequest | null {
  const profile = getGospelAgent(question);
  if (!profile) return null;

  const reference = passageFromQuestion(question, profile.gospel);
  const safeguards = profile.safeguards.map((item) => `- ${item}`).join('\n');

  return {
    agentId: profile.id,
    gospel: profile.gospel,
    question,
    needsPassage: reference === null,
    contextRequest: reference ? {
      tool: profile.contextTool,
      arguments: { reference },
    } : null,
    instructions: [
      `Handle this request with the dedicated ${profile.gospel} route.`,
      reference
        ? `Call ${profile.contextTool} for ${reference} before answering.`
        : `Ask the learner which ${profile.gospel} passage or question they want to explore before making interpretive claims.`,
      `Base the answer on the returned ${profile.gospel} text, provenance, literary context, related evidence, and caveats.`,
      'Safeguards:',
      safeguards,
      'If evidence is missing, say so plainly instead of filling the gap from model memory.',
    ].join('\n\n'),
  };
}
