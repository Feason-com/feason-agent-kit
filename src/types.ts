export const gospelNames = ['Matthew', 'Mark', 'Luke', 'John'] as const;

export type GospelName = (typeof gospelNames)[number];

export type LiterarySection = {
  range: string;
  title: string;
  focus: string;
};

export type InterpretiveLens = {
  id: string;
  title: string;
  instruction: string;
};

export type StartingPoint = {
  reference: string;
  question: string;
  role: string;
};

export type GospelAgentProfile = {
  id: `understanding-${Lowercase<GospelName>}`;
  gospel: GospelName;
  title: string;
  overview: string;
  learningGoal: string;
  literaryShape: LiterarySection[];
  lenses: InterpretiveLens[];
  startingPoints: StartingPoint[];
  safeguards: string[];
};

export type GospelStudyRequest = {
  agentId: GospelAgentProfile['id'];
  gospel: GospelName;
  question: string;
  contextRequest: {
    tool: 'get_scripture_context';
    arguments: { reference: string };
  };
  instructions: string;
};
