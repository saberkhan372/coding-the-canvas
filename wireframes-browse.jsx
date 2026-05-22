// Browse / Index page wireframes — all concepts filterable, 4 variants.

const BROWSE_ITEMS = [
  ['01', 'Coordinates', 'Start',          ['p5','C'],     'circle'],
  ['02', 'Shapes & Color', 'Start',       ['p5','C','P'], 'stripes'],
  ['03', 'Draw Loop / Time','Move',       ['p5','C','P'], 'wave'],
  ['04', 'Mouse Input', 'Respond',        ['p5','C'],     'particles'],
  ['05', 'Conditionals','Respond',        ['p5','C','P'], 'grid'],
  ['06', 'For Loops & Grids','Systems',   ['p5','C','P'], 'grid'],
  ['07', 'Functions','Systems',           ['p5','C','P'], 'stripes'],
  ['08', 'Arrays','Systems',              ['p5','C','P'], 'particles'],
  ['09', 'Objects','Systems',             ['p5','C'],     'circle'],
  ['10', 'State Machines','Systems',      ['p5','C'],     'wave'],
  ['11', 'Pixels / Image Data','Data',    ['p5','C'],     'stripes'],
  ['12', 'Color is 24 Bits','Data',       ['p5','C'],     'stripes'],
  ['13', 'Binary as Pixels','Data',       ['p5','C'],     'grid'],
  ['14', 'Compression by Drawing','Data', ['p5','C'],     'particles'],
  ['15', 'Histograms & Sampling','Data',  ['p5','C'],     'wave'],
  ['16', 'Data as Material','Data',       ['p5','C','P'], 'grid'],
  ['17', 'Bias in a Filter','Impact',     ['p5','C'],     'particles'],
  ['18', 'Color & Accessibility','Impact',['p5','C'],     'stripes'],
  ['19', 'Whose Authorship?','Impact',    ['p5','C'],     'circle'],
  ['20', 'Energy of a Sketch','Impact',   ['p5','C'],     'wave'],
  ['21', 'Recursion as Fractals','Algorithms', ['p5','C','P'], 'particles'],
  ['22', 'ArrayList in Action','Algorithms',['p5','C','P'], 'particles'],
];

function BrowseHeader({ variant, count = 12 }) {
  return (
    <>
      <CornerMark>{variant}</CornerMark>
      <div style={{ padding: '24px 36px 8px' }}>
        <span className="lbl">browse · everything in the atlas</span>
        <h1 className="title" style={{ fontSize: 44, lineHeight: 1, marginTop: 6 }}>
          {count} concepts, your filters.
        </h1>
      </div>
    </>
  );
}

function FilterChips({ active, density }) {
  const t = useWf();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {[
        ['section', ['all', 'Start', 'Move', 'Respond', 'Systems', 'Data', 'Impact', 'Algorithms']],
        ['language', ['p5.js', t.showCanvasAPI && 'Canvas API', t.showProcessing && 'Processing (Java)'].filter(Boolean)],
        ['type', ['concept', 'bridge', 'tool', 'sketch']],
      ].map(([label, opts]) => (
        <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span className="lbl">{label}:</span>
          {opts.map((o, i) => (
            <span key={o} className={`chip ${i === 0 ? '' : ''}`} style={{
              background: (i === 0 && label === 'section') ? 'var(--ink)' : 'var(--paper)',
              color: (i === 0 && label === 'section') ? 'var(--paper)' : 'var(--ink)',
            }}>{o}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── A · Filter chips + responsive card grid ─────────────────────
function BrowseGrid() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="browse" />
      <BrowseHeader variant="variant A · chips + grid" />
      <div style={{ padding: '6px 36px 14px' }}>
        <FilterChips />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: 10, gap: 12 }}>
          <div className="box" style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', flex: '0 0 auto' }}>
            <span style={{ color: 'var(--ink-soft)' }}>⌕</span>
            <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>search the atlas…</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="lbl">sort</span>
            <span className="pill">curriculum order</span>
            <span className="pill">A–Z</span>
            <span className="pill">newest</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '6px 36px 24px',
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {BROWSE_ITEMS.map(([n, name, section, langs, kind]) => (
          <div key={n} className="box" style={{ padding: 10, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, right: 8 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>{n}</span>
            </div>
            <MiniCanvas kind={kind} height={80} />
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6 }}>{name}</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-soft)' }}>{section}</div>
            <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
              {langs.map(l => <span key={l} className="chip" style={{ padding: '1px 5px', fontSize: 9 }}>{l}</span>)}
            </div>
          </div>
        ))}
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── B · Sortable table view ─────────────────────────────────────
function BrowseTable() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="browse" />
      <BrowseHeader variant="variant B · spreadsheet" />
      <div style={{ padding: '6px 36px 24px' }}>
        <FilterChips />
        <div style={{ marginTop: 14, border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1.6fr 1fr 1.6fr 0.8fr 80px',
                        background: 'var(--paper-edge)', borderBottom: '1.5px solid var(--ink)' }}>
            {['#', 'concept ↑', 'section', 'languages', 'difficulty', ''].map(h => (
              <div key={h} className="lbl" style={{ padding: '10px 12px' }}>{h}</div>
            ))}
          </div>
          {BROWSE_ITEMS.map(([n, name, section, langs, kind], i) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '50px 1.6fr 1fr 1.6fr 0.8fr 80px',
              borderBottom: i === BROWSE_ITEMS.length - 1 ? 'none' : '1px dotted var(--ink-faint)',
              background: n === '06' ? '#fff3e8' : 'transparent', alignItems: 'center',
            }}>
              <div className="mono" style={{ padding: '10px 12px', fontWeight: 700 }}>{n}</div>
              <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 24, position: 'relative', flexShrink: 0 }}>
                  <div className="canvas-stage" style={{ position: 'absolute', inset: 0 }}>
                    <CanvasGuts kind={kind} />
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{name}</span>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <span className="chip">{section}</span>
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', gap: 4 }}>
                {langs.map(l => <span key={l} className="chip" style={{ padding: '1px 5px', fontSize: 9 }}>{l}</span>)}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => (
                    <div key={s} style={{
                      width: 8, height: 8, border: '1px solid var(--ink)',
                      background: s <= Math.ceil(parseInt(n) / 3) ? 'var(--ink)' : 'transparent',
                    }} />
                  ))}
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <span className="pill" style={{ fontSize: 10 }}>open →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── C · Sidebar facets + dense grid ─────────────────────────────
function BrowseFacets() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="browse" />
      <BrowseHeader variant="variant C · facets + dense grid" />
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 0,
                    borderTop: '1.5px solid var(--ink)', marginTop: 8 }}>
        <aside style={{ borderRight: '1.5px solid var(--ink)', padding: '16px 18px',
              background: 'var(--paper-edge)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--ink-soft)' }}>⌕</span>
            <div className="box" style={{ flex: 1, padding: '3px 8px', fontSize: 11, color: 'var(--ink-faint)' }}>search…</div>
          </div>
          {[
            ['section', ['Start', 'Move', 'Respond', 'Systems', 'Data', 'Impact', 'Algorithms']],
            ['language', ['p5.js', t.showCanvasAPI && 'Canvas API', t.showProcessing && 'Processing (Java)'].filter(Boolean)],
            ['type', ['concept', 'concept bridge', 'workshop tool', 'starter sketch']],
            ['who for', ['self-learner', 'teacher', 'student', 'curious dev']],
          ].map(([label, opts]) => (
            <div key={label} style={{ marginTop: 16 }}>
              <span className="lbl">{label}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                {opts.map((o, i) => (
                  <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <span style={{ width: 12, height: 12, border: '1.2px solid var(--ink)',
                          background: i === 0 ? 'var(--ink)' : 'transparent' }} />
                    {o}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <span className="pill" style={{ fontSize: 11 }}>clear all filters</span>
          </div>
        </aside>

        <div style={{ padding: '14px 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              showing <strong>{BROWSE_ITEMS.length}</strong> · filtered by <strong>Start</strong> · sorted by <strong>curriculum</strong>
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="pill" style={{ fontSize: 10 }}>grid</span>
              <span className="pill solid" style={{ fontSize: 10 }}>list</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {BROWSE_ITEMS.map(([n, name, section, langs, kind]) => (
              <div key={n} className="box" style={{ padding: 10, display: 'grid',
                    gridTemplateColumns: '70px 1fr', gap: 10, alignItems: 'center' }}>
                <MiniCanvas kind={kind} height={56} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 700 }}>{n}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{name}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--ink-soft)' }}>{section}</div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                    {langs.map(l => <span key={l} className="chip"
                      style={{ padding: '0 4px', fontSize: 9 }}>{l}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── D · Search-led + tag cloud ──────────────────────────────────
function BrowseSearch() {
  const t = useWf();
  const tags = ['for', 'while', 'array', 'object', 'mouseX', 'setup', 'draw', 'frameCount',
                'noise', 'random', 'map', 'lerp', 'translate', 'rotate', 'class', 'pixels',
                'loadTable', 'fill', 'stroke', 'sin', 'cos', 'dist', 'image', 'preload'];
  return (
    <WFFrame density={t.density}>
      <SiteNav active="browse" />
      <CornerMark>variant D · type to find</CornerMark>
      <div style={{ padding: '40px 36px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="lbl">browse</span>
        <h1 className="title" style={{ fontSize: 40, lineHeight: 1, marginTop: 4, textAlign: 'center' }}>
          What do you want to learn?
        </h1>
        <div className="box-rough" style={{ marginTop: 18, padding: '10px 16px', width: 'min(720px, 92%)',
              display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, color: 'var(--ink-soft)' }}>⌕</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>for loop</span>
            <span style={{ display: 'inline-block', width: 1, height: 16, background: 'var(--ink)',
                  marginLeft: 1, animation: 'none', verticalAlign: 'middle' }} />
          </div>
          <span className="pill">⌘K</span>
        </div>
      </div>

      <div style={{ padding: '14px 36px 6px', display: 'flex', flexWrap: 'wrap', gap: 6,
                    justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
        {tags.map((tg, i) => (
          <span key={tg} className="chip" style={{
            fontSize: 10 + (i % 4) * 2,
            padding: `${2 + (i % 3)}px ${6 + (i % 3) * 2}px`,
            background: i === 0 ? 'var(--accent)' : 'var(--paper)',
            color: i === 0 ? '#fff' : 'var(--ink)',
            borderColor: i === 0 ? 'var(--accent)' : 'var(--ink)',
          }}>{tg}</span>
        ))}
      </div>

      <SectionRule kicker="matches" title="3 concepts, 4 bridges, 8 tools" />

      <div style={{ padding: '0 36px 24px',
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          ['concept', '06 · For Loops & Grids', 'grid'],
          ['bridge ⬡', 'Arrays: One Thing to Many', 'particles'],
          ['workshop tool', 'For Loop Stepper', 'stripes'],
        ].map(([kind, title, c]) => (
          <div key={title} className="box-rough" style={{ padding: 12 }}>
            <span className="lbl">{kind}</span>
            <div style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}>{title}</div>
            <MiniCanvas kind={c} height={100} style={{ marginTop: 8 }} />
            <Lines n={2} widths={['90%', '60%']} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <span className="pill" style={{ fontSize: 10 }}>open →</span>
            </div>
          </div>
        ))}
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

Object.assign(window, { BrowseGrid, BrowseTable, BrowseFacets, BrowseSearch, BROWSE_ITEMS });
