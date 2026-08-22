import { buildGospelStudyRequest } from '../src/index.js';

const question = process.argv.slice(2).join(' ') || 'Help me understand Matthew';
const request = buildGospelStudyRequest(question);

if (!request) {
  throw new Error('Name Matthew, Mark, Luke, or John so the correct agent can be selected.');
}

console.log(JSON.stringify(request, null, 2));
