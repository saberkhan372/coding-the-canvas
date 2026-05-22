import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const conceptsDir = join(root, 'concepts');

function editorPane(kind, label, codeHtml) {
  if (kind === 'java') {
    return `<article class="code-pane processing-code"><div class="code-label java">Processing / Java</div><pre>${codeHtml}</pre></article>`;
  }

  const title = kind === 'p5' ? 'p5.js Web Editor' : 'Canvas API Sandbox';
  const filename = kind === 'p5' ? 'sketch.js' : 'script.js';
  const extra = kind === 'p5' ? 'index.html' : 'index.html';

  return `<article class="code-pane web-editor ${kind}">
          <div class="editor-chrome"><span class="editor-dots"><span></span><span></span><span></span></span><span class="editor-title">${title}</span><span class="run-pill">Run</span></div>
          <div class="code-label-row"><div class="code-label ${kind}">${label}</div><div class="file-tabs"><span class="file-tab active">${filename}</span><span class="file-tab">${extra}</span></div></div>
          <pre>${codeHtml}</pre>
        </article>`;
}

function updateCodePanes(html) {
  return html.replace(
    /<div class="code-pane">\s*<div class="code-label (p5|canvas-api|java)">([^<]+)<\/div>\s*<pre>([\s\S]*?)<\/pre>\s*<\/div>/g,
    (_, kind, label, codeHtml) => editorPane(kind, label, codeHtml),
  );
}

let changed = 0;
for (const entry of readdirSync(conceptsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = join(conceptsDir, entry.name, 'index.html');
  let html;
  try {
    html = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const next = updateCodePanes(html);
  if (next !== html) {
    writeFileSync(file, next);
    changed++;
  }
}

console.log(`Updated ${changed} concept code sections.`);
