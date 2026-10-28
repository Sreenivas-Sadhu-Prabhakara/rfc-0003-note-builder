import {buildNote, examples} from './core.mjs';
import {$, download, wireShare} from './share.mjs';
const names = ['group', 'reference', 'author', 'affiliation', 'date', 'title', 'kind', 'body'];
let current;
function update() {
  try {
    current = buildNote(Object.fromEntries(names.map(name => [name, $(name).value])));
    $('error').textContent = '';
    $('preview').textContent = current.text;
    $('status').textContent = current.canExport ? `${current.characters} characters in your thought. Ready to download for discussion.` : 'Add a thought or question to enable download.';
    $('checklist').textContent = current.missing.length ? `Optional context still blank: ${current.missing.join(', ')}. These are prompts, not a quality score.` : 'All context fields are filled. That does not make the note approved or authoritative.';
    $('download').disabled = !current.canExport;
  } catch (error) {
    current = null;
    $('error').textContent = error.message;
    $('status').textContent = 'Correct the input to preview this note.';
    $('preview').textContent = ''; $('checklist').textContent = ''; $('download').disabled = true;
  }
}
function load(example) { for (const name of names) $(name).value = example[name]; update(); }
$('note-form').addEventListener('submit', event => event.preventDefault());
$('note-form').addEventListener('input', update);
for (const key of Object.keys(examples)) $(`example-${key}`).addEventListener('click', () => load(examples[key]));
$('download').addEventListener('click', () => { if (current?.canExport) download('discussion-note.txt', current.text); });
wireShare();
load(examples.question);
