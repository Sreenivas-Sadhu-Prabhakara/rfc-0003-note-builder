# Note Builder

Turn an unfinished thought into a clearly labelled discussion note that other people can understand and respond to.

**[Open the utility](https://sreenivas-sadhu-prabhakara.github.io/rfc-0003-note-builder/)** · [Source repository](https://github.com/Sreenivas-Sadhu-Prabhakara/rfc-0003-note-builder) · [RFC 3](https://www.rfc-editor.org/rfc/rfc3.txt) · [Official metadata](https://www.rfc-editor.org/info/rfc3) · [Errata](https://www.rfc-editor.org/errata/rfc3) · [Successor RFC 10](https://www.rfc-editor.org/rfc/rfc10.txt) · [Later successor RFC 16](https://www.rfc-editor.org/rfc/rfc16.txt)

## Who it helps

Community groups, students and people proposing their first project idea. Compose a local discussion note with a preview, a small metadata checklist, question/suggestion/observation examples and a plain-text download. Keep uncertainty visible without imposing a polished proposal template.

## Run and test

Serve this directory with `python3 -m http.server 8000`, then open http://localhost:8000.
Run `node --test` or `npm test` with Node 22 or newer. No install or build step is needed.
Behavioral tests cover normal outcomes, invalid input, boundary cases and exports.

All processing uses local browser modules with relative URLs. No external fonts,
scripts, runtime dependencies, tracking, uploads or automatic persistence.
The loaded tab continues to calculate and download files offline. Offline reload
is not promised: use a local server to work without a network connection.
Reloading the page resets your inputs; download anything you want to keep.

## Evidence and interpretation

Basis: RFC 3, opening paragraphs (anybody may contribute); CONTENT (timely, unpolished notes and unanswered questions); FORM items 1–4 (identifier, author, affiliation, date and non-unique title).

No sentence detector or authority score. Nonempty thoughts without punctuation are accepted, and contextual metadata gaps are advisory. Dates are strictly validated when provided. Group labels and local references replace official RFC branding and numbering. Note kinds and the unreviewed banner are original UI conventions. Text is rendered with textContent, never interpreted as markup. No autosave, upload or external dependencies.

This is a local discussion format, not an official RFC template or submission service. Filling every field does not prove quality, agreement or authority. The kind selector and unreviewed banner are our additions. Blank context is advisory; a nonempty thought enables export.

Official status: UNKNOWN · Legacy stream. UNKNOWN is not the formal HISTORIC classification. These educational adaptations are not current Internet standards. RFC 3 is obsoleted by RFC 10. RFC 10 is in turn listed as obsoleted by RFC 16. RFC 10 revises the note conventions and recipient list; RFC 16 adds an MIT recipient. These are historical records, not current contact or submission instructions.

The retrieved errata view lists report 8412 as Reported, not Verified. Its cited section and text do not match the cached RFC, so it is not applied. Follow-up access to the newer endpoint was unavailable; check the linked page for the latest status. The introductory affiliations and distribution list differ. We do not resolve those differences or reuse historical contact details.

Source format: plain text. Full assigned source read and SHA-256 checked before planning.
Source SHA-256: `fc6b8d93a449fe48d21d5519632b79f4d40a08077e134ed2bd529595485040bd`.
Review timestamp: 2026-10-28T23:33:30.593539+00:00.

## Try an example

Load the minimal example. Download the one-line observation with its context still blank. Add an author and a local reference: what becomes easier for a reader to discuss? Compare the two examples with the same title.

Expected: A thought without punctuation still exports. The downloaded text always labels itself as a local, unreviewed discussion note.

## Publication and contribution

The daily runner tests and publishes this standalone directory to its own public
repository and GitHub Pages site. Canonical and source links use the configured
account. Those links become live after runner publication; this build does not
claim that publication has occurred. Pages serves `main` at `/`; `.nojekyll`
disables Jekyll processing.

`ci/test.yml` is an inactive Actions template. The runner enforces local tests.
The current CLI credential cannot upload `.github/workflows` files; the template
remains under `ci/`.

See [PROMOTION.md](PROMOTION.md) for prepared sharing copy and a teaching exercise.
No outreach is performed. Please report issues with the input, expected behavior,
and supporting RFC section. Original code is MIT licensed. Referenced RFCs retain
their own notices. Independent community project, unaffiliated with the IETF or RFC Editor.
