import test from 'node:test';
import assert from 'node:assert/strict';
import {buildNote, examples} from '../core.mjs';

test('a question produces a labelled local note with author, context and body', () => {
  const note = buildNote(examples.question);
  assert.equal(note.canExport, true); assert.deepEqual(note.missing, []);
  assert.match(note.text, /LOCAL DISCUSSION NOTE — UNREVIEWED/);
  assert.match(note.text, /Not an assigned RFC/);
  assert.match(note.text, /Author: Sam/);
  assert.match(note.text, /Local reference: LOCAL-001/);
  assert.ok(note.text.includes(examples.question.body));
});
test('an unpolished thought without punctuation or metadata can export', () => {
  const note = buildNote(examples.observation);
  assert.equal(note.canExport, true);
  assert.ok(note.missing.includes('author')); assert.ok(note.missing.includes('title'));
  assert.match(note.text, /Author: \[not provided\]/);
});
test('empty or whitespace-only thoughts disable export without manufacturing text', () => {
  for (const body of ['', ' \n\t ']) {
    const note = buildNote({...examples.question, body});
    assert.equal(note.canExport, false); assert.equal(note.characters, 0);
    assert.ok(note.missing.includes('body'));
  }
});
test('repeated titles are allowed and local references still distinguish notes', () => {
  assert.equal(examples.question.title, examples.suggestion.title);
  const a = buildNote(examples.question), b = buildNote(examples.suggestion);
  assert.notEqual(a.text, b.text); assert.equal(a.canExport && b.canExport, true);
});
test('leap days validate without silently normalizing impossible dates', () => {
  assert.equal(buildNote({...examples.question, date: '2028-02-29'}).canExport, true);
  for (const date of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-2-01', '1899-12-31', 'nonsense']) {
    assert.throws(() => buildNote({...examples.question, date}), /date/i);
  }
});
test('Unicode text and literal markup stay intact in a plain-text note', () => {
  const body = '🌍 <script>alert("hi")</script>\nक्यों?';
  const note = buildNote({...examples.question, body});
  assert.ok(note.text.includes(body)); assert.equal(note.characters, Array.from(body).length);
});
test('body line breaks normalize but metadata cannot inject extra header lines', () => {
  assert.ok(buildNote({...examples.question, body: 'one\r\ntwo\rthree'}).text.includes('one\ntwo\nthree'));
  assert.throws(() => buildNote({...examples.question, title: 'A\nApproved: yes'}), /one line/);
});
test('rejects malformed inputs, unknown kinds and fields beyond documented bounds', () => {
  assert.throws(() => buildNote(null));
  assert.throws(() => buildNote({...examples.question, body: 7}), /text/);
  assert.throws(() => buildNote({...examples.question, kind: 'Official standard'}), /Choose/);
  assert.throws(() => buildNote({...examples.question, title: 'x'.repeat(161)}), /long/);
  assert.throws(() => buildNote({...examples.question, body: 'x'.repeat(12001)}), /long/);
  assert.equal(buildNote({...examples.question, body: 'x'.repeat(12000)}).characters, 12000);
});
