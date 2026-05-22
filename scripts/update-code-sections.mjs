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
  const exportLabel = kind === 'p5' ? 'Export to p5.js' : 'Export to CodePen';

  return `<article class="code-pane web-editor ${kind}">
          <div class="editor-chrome"><span class="editor-dots"><span></span><span></span><span></span></span><span class="editor-title">${title}</span><span class="editor-actions"><button class="editor-btn play" type="button" data-editor-play aria-label="Play snippet">Play</button><button class="editor-btn stop" type="button" data-editor-stop aria-label="Stop snippet">Stop</button><button class="editor-btn export" type="button" data-editor-export aria-label="${exportLabel}">${exportLabel}</button></span></div>
          <div class="code-label-row"><div class="code-label ${kind}">${label}</div><div class="file-tabs"><span class="file-tab active">${filename}</span><span class="file-tab">${extra}</span></div></div>
          <div class="editor-preview" aria-live="polite"><span>Preview paused</span></div>
          <pre>${codeHtml}</pre>
        </article>`;
}

function updateCodePanes(html) {
  let next = html.replace(
    /<div class="code-pane">\s*<div class="code-label (p5|canvas-api|java)">([^<]+)<\/div>\s*<pre>([\s\S]*?)<\/pre>\s*<\/div>/g,
    (_, kind, label, codeHtml) => editorPane(kind, label, codeHtml),
  );
  next = next.replace(
    /<article class="code-pane web-editor (p5|canvas-api)">\s*<div class="editor-chrome">[\s\S]*?<\/div>\s*<div class="code-label-row">[\s\S]*?<div class="code-label (p5|canvas-api)">([^<]+)<\/div><div class="file-tabs"><span class="file-tab active">([^<]+)<\/span><span class="file-tab">([^<]+)<\/span><\/div><\/div>\s*(?:<div class="editor-preview"[\s\S]*?<\/div>\s*)?<pre>([\s\S]*?)<\/pre>\s*<\/article>/g,
    (_, kind, labelKind, label, _filename, _extra, codeHtml) => editorPane(kind, label, codeHtml),
  );
  return next;
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
