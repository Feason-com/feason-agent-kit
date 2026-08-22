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
