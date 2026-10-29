import { buildGospelStudyRequest } from '../dist/index.js';

const question = process.argv.slice(2).join(' ');
const request = buildGospelStudyRequest(question);

if (!request) {
  console.error('Name exactly one Gospel: Matthew, Mark, Luke, or John. Example: Mark 8:27-30.');
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(request, null, 2));
}
