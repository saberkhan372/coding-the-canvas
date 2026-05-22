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
