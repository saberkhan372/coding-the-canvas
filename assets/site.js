(() => {
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === '#') link.addEventListener('click', (event) => event.preventDefault());
    const url = new URL(href, window.location.href);
    const normalized = url.pathname.replace(/\/index\.html$/, '/');
    if (normalized === path || (normalized !== '/' && path.startsWith(normalized))) {
      if (link.closest('nav')) link.classList.add('active');
    }
  });

  const webEditors = [...document.querySelectorAll('.web-editor')];

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.append(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      textarea.remove();
      return ok;
    }
  };

  const canvasShell = (code) => {
    const hasCanvasDeclaration = /\b(const|let|var)\s+canvas\b/.test(code);
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin: 0; display: grid; min-height: 100vh; place-items: center; background: #f6f2ea; }
    canvas { width: 400px; height: 260px; border: 1px solid #1c1a17; background: white; }
  </style>
</head>
<body>
  <canvas id="canvas" width="400" height="260"></canvas>
  <script>
${hasCanvasDeclaration ? '' : "const canvas = document.getElementById('canvas');"}
${code}
  <\/script>
</body>
</html>`;
  };

  webEditors.forEach((editor) => {
    const preview = editor.querySelector('.editor-preview');
    const codeBlock = editor.querySelector('pre');
    const play = editor.querySelector('[data-editor-play]');
    const stop = editor.querySelector('[data-editor-stop]');
    const exportButton = editor.querySelector('[data-editor-export]');
    const editorName = editor.classList.contains('p5') ? 'p5.js Web Editor' : 'CodePen';

    play?.addEventListener('click', () => {
      preview?.classList.add('is-running');
      if (preview) preview.innerHTML = '<span>Preview running - copy/export to edit live</span>';
    });

    stop?.addEventListener('click', () => {
      preview?.classList.remove('is-running');
      if (preview) preview.innerHTML = '<span>Preview paused</span>';
    });

    exportButton?.addEventListener('click', async () => {
      const rawCode = codeBlock?.textContent || '';
      const isP5 = editor.classList.contains('p5');
      const copied = await copyText(isP5 ? rawCode : canvasShell(rawCode));
      exportButton.classList.toggle('copied', copied);
      exportButton.textContent = copied ? 'Copied' : 'Copy failed';
      setTimeout(() => {
        exportButton.classList.remove('copied');
        exportButton.textContent = isP5 ? 'Export to p5.js' : 'Export to CodePen';
      }, 1800);
      window.open(isP5 ? 'https://editor.p5js.org/' : 'https://codepen.io/pen/', '_blank', 'noopener,noreferrer');
      if (preview) preview.innerHTML = `<span>Copied code and opened ${editorName}</span>`;
    });
  });

  const cardBands = [...document.querySelectorAll('.cards')];
  if (!cardBands.length) return;

  const pageType = document.body.dataset.page || '';
  const shouldAddFilter = ['browse', 'concepts', 'sections', 'teachers', 'languages'].includes(pageType);
  if (!shouldAddFilter) return;

  const filterBar = document.createElement('section');
  filterBar.className = 'band';
  filterBar.innerHTML = '<label class="meta" for="page-filter">Filter this page</label><div class="actions" style="margin-top:10px"><input id="page-filter" type="search" placeholder="Type a concept, section, language, or resource" style="flex:1;min-width:240px;padding:10px 12px;border:1.5px solid var(--ink);background:#fffdf7;font:inherit"><button class="button" type="button" data-clear-filter>Clear</button></div><p class="meta" data-filter-count style="margin-top:10px"></p>';
  const hero = document.querySelector('.hero');
  hero?.insertAdjacentElement('afterend', filterBar);

  const input = filterBar.querySelector('#page-filter');
  const count = filterBar.querySelector('[data-filter-count]');
  const clear = filterBar.querySelector('[data-clear-filter]');
  const cards = [...document.querySelectorAll('.card')];
  const movementBlocks = [...document.querySelectorAll('.movement-block')];
  const facetTags = [...document.querySelectorAll('.facet-panel .tag')];

  const applyFilter = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const searchable = `${card.textContent} ${card.dataset.tags || ''} ${card.dataset.section || ''}`.toLowerCase();
      const match = !q || searchable.includes(q);
      card.hidden = !match;
      if (match) shown += 1;
    });
    movementBlocks.forEach((block) => {
      const visibleCards = [...block.querySelectorAll('.card')].some((card) => !card.hidden);
      block.hidden = q ? !visibleCards : false;
    });
    facetTags.forEach((tag) => {
      tag.classList.toggle('is-active', q && tag.textContent.trim().toLowerCase() === q);
    });
    count.textContent = q ? `${shown} matching cards` : `${cards.length} cards`;
  };

  facetTags.forEach((tag) => {
    tag.setAttribute('role', 'button');
    tag.setAttribute('tabindex', '0');
    const chooseTag = () => {
      input.value = tag.textContent.trim();
      input.focus();
      applyFilter();
    };
    tag.addEventListener('click', chooseTag);
    tag.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        chooseTag();
      }
    });
  });

  input.addEventListener('input', applyFilter);
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    applyFilter();
  });
  applyFilter();
})();
