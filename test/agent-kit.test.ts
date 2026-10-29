import { describe, expect, it } from 'vitest';

import {
  angelentAgent,
  angelentToolNames,
  buildAngelentRequest,
  buildGospelStudyRequest,
  detectGospel,
  getGospelAgent,
  gospelAgents,
  gospelNames,
} from '../src/index';

describe('Feason Agent Kit', () => {
  it('builds Angelent as a bounded read-only profile', () => {
    const request = buildAngelentRequest('How should I understand mercy in Matthew 5?');

    expect(angelentAgent.ontologyDisclosure).toMatch(/not an angel/i);
    expect(angelentAgent.principles).toHaveLength(8);
    expect(angelentAgent.allowedTools).toEqual(angelentToolNames);
    expect(request).toMatchObject({
      agentId: 'angelent',
      canTakeExternalAction: false,
      allowedTools: angelentToolNames,
    });
    expect(request?.instructions).toMatch(/Beatitude-shaped conduct/);
    expect(request?.instructions).toMatch(/Leave consequential judgment/);
    expect(request?.instructions).toMatch(/instead of filling the gap from model memory/i);
    expect(buildAngelentRequest('   ')).toBeNull();
  });

  it('keeps all four Gospels as distinct agents', () => {
    const agents = gospelNames.map((name) => gospelAgents[name]);

    expect(agents.map((agent) => agent.id)).toEqual([
      'understanding-matthew',
      'understanding-mark',
      'understanding-luke',
      'understanding-john',
    ]);
    expect(agents.map((agent) => agent.canonicalBook)).toEqual(gospelNames);
    expect(agents.every((agent) => agent.contextTool === 'get_scripture_context')).toBe(true);
  });

  it('routes conversational requests without a default Gospel', () => {
    expect(detectGospel('Help me understand Matthew')).toBe('Matthew');
    expect(detectGospel('What is happening in Mk. 8?')).toBe('Mark');
    expect(getGospelAgent('Continue Luke')).toBe(gospelAgents.Luke);
    expect(getGospelAgent('Help me understand Romans')).toBeNull();
  });

  it('builds a passage-specific Feason Context request', () => {
    expect(buildGospelStudyRequest('Help me understand Matthew 5:1-12')).toMatchObject({
      agentId: 'understanding-matthew',
      gospel: 'Matthew',
      contextRequest: {
        tool: 'get_scripture_context',
        arguments: { reference: 'Matthew 5:1-12' },
      },
    });
  });

  it.each([
    '1 John 4:8', '2 John 1:6', '3 John 1:4', '1John 4:8',
    'I John 4:8', 'II Jn. 1:6', 'Third John 1:4', '1st John 4:8', '1. John 4:8',
    'Compare John 3:16 with 1 John 4:8',
    'Compare Matthew 5:1-12 with Luke 6:20-23',
    'Matthew or Mark', 'Help me understand Romans', '',
  ])('asks the application to clarify an unsupported or ambiguous route: %s', (question) => {
    expect(detectGospel(question)).toBeNull();
    expect(getGospelAgent(question)).toBeNull();
    expect(buildGospelStudyRequest(question)).toBeNull();
  });

  it.each([
    ['What happens in Mk. 8?', 'Mark 8'],
    ['Read mt. 5:1–12', 'Matthew 5:1-12'],
    ['Explain LK 6 : 20 — 23', 'Luke 6:20-23'],
    ['Read John 3:16, then explain the returned context.', 'John 3:16'],
    ['Continue John with John 3:16', 'John 3:16'],
  ])('normalizes one complete supported reference: %s', (question, reference) => {
    expect(buildGospelStudyRequest(question)).toMatchObject({
      needsPassage: false,
      contextRequest: { arguments: { reference } },
    });
  });

  it.each([
    'John 3:16-4:2', 'John 3-4', 'John 3:16,18', 'John 3:16 and 4:2',
    'John 3:16 and John 4:2', 'Matthew 999:1', 'Matthew 29', 'Mark 17',
    'Luke 25', 'John 22', 'John 0', 'John 3:0', 'John 3:18-16',
    'John 3:16-', 'John 3:', 'John 3:16a', 'John 3:16/17',
    'Compare John 3:16 with 4:2', 'Read John 3:16 and verse 18',
    'Read John 3:16, and verse 18', 'John 3:16; verses 18-20',
  ])('does not silently shorten an unsupported reference: %s', (question) => {
    expect(buildGospelStudyRequest(question)).toMatchObject({
      needsPassage: true,
      contextRequest: null,
    });
  });

  it('asks for a passage instead of inventing a whole-Gospel interpretation', () => {
    expect(buildGospelStudyRequest('Help me understand John')).toMatchObject({
      agentId: 'understanding-john',
      needsPassage: true,
      contextRequest: null,
    });
  });

  it('contains runtime evidence safeguards instead of embedded interpretation', () => {
    const request = buildGospelStudyRequest('Help me understand Mark');

    expect(request?.instructions).toMatch(/returned Mark text/i);
    expect(request?.instructions).toMatch(/ask the learner which Mark passage/i);
    expect(request?.instructions).toMatch(/instead of filling the gap from model memory/i);
    expect(gospelAgents.Mark).not.toHaveProperty('overview');
    expect(gospelAgents.Mark).not.toHaveProperty('lenses');
    expect(gospelAgents.Mark).not.toHaveProperty('startingPoints');
  });
});
