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
