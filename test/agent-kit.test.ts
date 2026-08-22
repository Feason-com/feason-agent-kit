import { describe, expect, it } from 'vitest';

import {
  buildGospelStudyRequest,
  detectGospel,
  getGospelAgent,
  gospelAgents,
  gospelNames,
} from '../src/index';

describe('Feason Agent Kit', () => {
  it('keeps all four Gospels as distinct agents', () => {
    const agents = gospelNames.map((name) => gospelAgents[name]);

    expect(agents.map((agent) => agent.id)).toEqual([
      'understanding-matthew',
      'understanding-mark',
      'understanding-luke',
      'understanding-john',
    ]);
    expect(new Set(agents.map((agent) => agent.overview)).size).toBe(4);
    expect(new Set(agents.flatMap((agent) => agent.lenses.map((lens) => lens.id))).size).toBe(20);
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

  it('uses the whole Gospel when no passage was named', () => {
    expect(buildGospelStudyRequest('Help me understand John')).toMatchObject({
      agentId: 'understanding-john',
      contextRequest: { arguments: { reference: 'John' } },
    });
  });

  it('includes source, disagreement, and pastoral safeguards', () => {
    const request = buildGospelStudyRequest('Help me understand Mark');

    expect(request?.instructions).toMatch(/source-grounded/i);
    expect(request?.instructions).toMatch(/disputed/i);
    expect(request?.instructions).toMatch(/not a pastoral verdict/i);
  });
});
