export const gospelNames = ['Matthew', 'Mark', 'Luke', 'John'] as const;

export type GospelName = (typeof gospelNames)[number];

export type GospelAgentProfile = {
  id: `understanding-${Lowercase<GospelName>}`;
  gospel: GospelName;
  title: string;
  canonicalBook: GospelName;
  aliases: string[];
  contextTool: 'get_scripture_context';
  safeguards: string[];
};

export type GospelStudyRequest = {
  agentId: GospelAgentProfile['id'];
  gospel: GospelName;
  question: string;
  needsPassage: boolean;
  contextRequest: {
    tool: 'get_scripture_context';
    arguments: { reference: string };
  } | null;
  instructions: string;
};

export const angelentToolNames = [
  'search_sources',
  'get_scripture_context',
  'get_primary_sources',
  'compare_traditions',
  'evaluate_claim',
  'build_evidence_packet',
  'verify_citation',
] as const;

export type AngelentToolName = (typeof angelentToolNames)[number];

export type AngelentPrinciple = {
  beatitude: string;
  discipline: string;
};

export type AngelentAgentProfile = {
  id: 'angelent';
  title: 'Angelent';
  ontologyDisclosure: string;
  principles: readonly AngelentPrinciple[];
  allowedTools: readonly AngelentToolName[];
  safeguards: readonly string[];
};

export type AngelentRequest = {
  agentId: AngelentAgentProfile['id'];
  question: string;
  allowedTools: readonly AngelentToolName[];
  canTakeExternalAction: false;
  instructions: string;
};
