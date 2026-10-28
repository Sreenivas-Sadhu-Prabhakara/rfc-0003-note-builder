// Original modern discussion-note format inspired by RFC 3, CONTENT and FORM.
export const kinds = ['Question', 'Suggestion', 'Observation'];
const fields = ['group', 'reference', 'author', 'affiliation', 'date', 'title', 'body'];

export function buildNote(input) {
  if (!input || typeof input !== 'object') throw new TypeError('Enter a note.');
  const note = {};
  for (const key of fields) {
    if (typeof input[key] !== 'string') throw new TypeError(`${key} must be text.`);
    note[key] = input[key].replace(/\r\n?/g, '\n').trim();
    if (key !== 'body' && /[\n\u0000-\u001f\u007f]/.test(note[key])) throw new Error(`${key} must fit on one line.`);
    if (note[key].length > (key === 'body' ? 12000 : 160)) throw new Error(`${key} is too long.`);
  }
  if (!kinds.includes(input.kind)) throw new Error('Choose Question, Suggestion or Observation.');
  note.kind = input.kind;
  if (note.date) {
    const date = new Date(`${note.date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(note.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== note.date || note.date < '1900-01-01') {
      throw new Error('Use a real date from 1900 onward in YYYY-MM-DD form.');
    }
  }
  const missing = fields.filter(key => !note[key]);
  const text = [
    'LOCAL DISCUSSION NOTE — UNREVIEWED',
    'Original community format inspired by RFC 3. Not an assigned RFC.',
    '',
    `Group: ${note.group || '[not provided]'}`,
    `Local reference: ${note.reference || '[not provided]'}`,
    `Author: ${note.author || '[not provided]'}`,
    `Affiliation: ${note.affiliation || '[not provided]'}`,
    `Date: ${note.date || '[not provided]'}`,
    `Title: ${note.title || '[untitled]'}`,
    `Kind: ${note.kind}`,
    '',
    note.body || '[Add a thought or question.]',
    '',
    'Shared for discussion; writing this down does not make it an agreed decision.',
    ''
  ].join('\n');
  return { text, missing, canExport: Boolean(note.body), characters: Array.from(note.body).length };
}

export const examples = {
  question: {group: 'Neighborhood workshop', reference: 'LOCAL-001', author: 'Sam', affiliation: 'Volunteer group', date: '2026-11-01', title: 'A place for spare tools', kind: 'Question', body: 'Could we keep a shared repair kit at the library?'},
  suggestion: {group: 'Neighborhood workshop', reference: 'LOCAL-002', author: 'Sam', affiliation: 'Volunteer group', date: '2026-11-01', title: 'A place for spare tools', kind: 'Suggestion', body: 'Try a small sign-out sheet for one week. I have not worked out who will keep the kit.'},
  observation: {group: 'Neighborhood workshop', reference: '', author: '', affiliation: '', date: '', title: '', kind: 'Observation', body: 'People at the workshop often bring the same tools'}
};
