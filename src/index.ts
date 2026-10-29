import { johnAgent } from './gospels/john.js';
import { lukeAgent } from './gospels/luke.js';
import { markAgent } from './gospels/mark.js';
import { matthewAgent } from './gospels/matthew.js';
import type { GospelAgentProfile, GospelName, GospelStudyRequest } from './types.js';

export { angelentAgent, buildAngelentRequest } from './angelent.js';
export { johnAgent } from './gospels/john.js';
export { lukeAgent } from './gospels/luke.js';
export { markAgent } from './gospels/mark.js';
export { matthewAgent } from './gospels/matthew.js';
export { gospelNames } from './types.js';
export { angelentToolNames } from './types.js';
export type {
  AngelentAgentProfile,
  AngelentPrinciple,
  AngelentRequest,
  AngelentToolName,
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
  const matches = input.matchAll(/\b(?:(1st|2nd|3rd|first|second|third|iii|ii|i|[123])\.?\s*)?(matthew|matt|mt|mark|mk|luke|lk|john|jn)\b/gi);
  const gospels = new Set<GospelName>();
  for (const match of matches) {
    // In particular, the Johannine letters must never become Gospel requests.
    if (match[1]) return null;
    const gospel = aliases[match[2]!.toLowerCase()];
    if (gospel) gospels.add(gospel);
  }
  return gospels.size === 1 ? [...gospels][0]! : null;
}

export function getGospelAgent(input: GospelName | string): GospelAgentProfile | null {
  if (Object.prototype.hasOwnProperty.call(gospelAgents, input)) {
    return gospelAgents[input as GospelName];
  }
  const gospel = detectGospel(input);
  return gospel ? gospelAgents[gospel] : null;
}

function passageFromQuestion(question: string, gospel: GospelName) {
  const names = gospelAgents[gospel].aliases.join('|');
  const matches = [...question.matchAll(new RegExp(`\\b(?:${names})\\b\\.?\\s+(\\d+(?:\\s*[:–—-]\\s*\\d+)*)(?!\\w)`, 'gi'))];
  if (matches.length !== 1) return null;

  const match = matches[0]!;
  const remaining = question.slice(match.index! + match[0].length);
  // Reject an incomplete or compound reference instead of retrieving its prefix.
  if (/^\s*(?:[:/–—-]|(?:[,;]\s*)?(?:(?:and|or|with|&)\s+)?(?:(?:verses?|chapters?)\s+)?\d)/i.test(remaining)) return null;

  const reference = match[1]!.replace(/\s+/g, '').replace(/[–—]/g, '-');
  const parts = /^([1-9]\d?)(?::([1-9]\d{0,2})(?:-([1-9]\d{0,2}))?)?$/.exec(reference);
  if (!parts) return null;
  const chapterCounts: Record<GospelName, number> = { Matthew: 28, Mark: 16, Luke: 24, John: 21 };
  if (Number(parts[1]) > chapterCounts[gospel]) return null;
  if (parts[3] && Number(parts[3]) < Number(parts[2])) return null;

  return `${gospel} ${reference}`;
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
        : `Ask the learner which ${profile.gospel} passage they want to explore. Use one chapter, verse, or same-chapter verse range before making interpretive claims.`,
      `Base the answer on the returned ${profile.gospel} text, provenance, literary context, related evidence, and caveats.`,
      'Safeguards:',
      safeguards,
      'If evidence is missing, say so plainly instead of filling the gap from model memory.',
    ].join('\n\n'),
  };
}
