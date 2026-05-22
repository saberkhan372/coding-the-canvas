// Language picker wireframes — "Choose Your Language" hub, 4 variants.

const LANGS = [
  {
    key: 'p5',
    name: 'p5.js',
    syntax: 'JavaScript',
    pitch: 'The friendly creative-coding library. Runs in the browser, zero install, huge community.',
    badge: 'recommended',
    good: ['no setup', 'web-native', 'lots of examples'],
    less: ['hides a few things you might want to see'],
    canvas: 'circle',
  },
  {
    key: 'canvas',
    name: 'Canvas API',
    syntax: 'JavaScript · no library',
    pitch: 'The raw web API p5 sits on top of. Same browser, no framework — closer to the metal.',
    badge: 'under the hood',
    good: ['nothing to install', 'matches MDN docs', 'shows what p5 abstracts away'],
    less: ['more boilerplate per sketch', 'you write the loop yourself'],
    canvas: 'stripes',
  },
  {
    key: 'pjs',
    name: 'Processing (Java)',
    syntax: 'read & copy reference',
    pitch: 'The classroom Java standard. Read it, port it, paste it into the Processing IDE. For AP CS A and the Shiffman lineage.',
    badge: 'AP CS A · Java',
    good: ['classroom Java standard', 'huge body of classic sketches', 'copy-paste into the Processing IDE'],
    less: ['not interactive here — read & copy only', 'install Processing locally to run it'],
    canvas: 'grid',
  },
];

// ── A · Three big stacked cards ─────────────────────────────────
// Filter LANGS by which optional columns the tweaks enable.
function useVisibleLangs() {
  const t = useWf();
  return LANGS.filter(l => l.key === 'p5'
    || (l.key === 'canvas' && t.showCanvasAPI)
    || (l.key === 'pjs' && t.showProcessing));
}

function LangCards() {
  const t = useWf();
  const visible = useVisibleLangs();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="languages" />
      <CornerMark>variant A · two doors</CornerMark>
      <div style={{ padding: '28px 40px 18px' }}>
        <span className="lbl">choose your language</span>
        <h1 className="title" style={{ fontSize: 46, lineHeight: 1, marginTop: 6 }}>
          One canvas. <span className="hand" style={{ color: 'var(--accent)' }}>two ways in.</span>
        </h1>
        <div style={{ maxWidth: 660, marginTop: 10 }}>
          <Lines n={2} widths={['100%', '70%']} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: visible.map(() => '1fr').join(' '),
                    gap: 18, padding: '6px 40px 24px' }}>
        {visible.map((l, i) => (
          <div key={l.key} className="box-rough" style={{ padding: 16, position: 'relative',
                borderColor: i === 0 ? 'var(--accent)' : 'var(--ink)',
                boxShadow: i === 0 ? '3px 4px 0 var(--accent)' : '2px 3px 0 var(--ink)' }}>
            {i === 0 && <div className="hand" style={{
              position: 'absolute', top: -22, right: 10, color: 'var(--accent)', fontSize: 22,
            }}>start here ↘</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1 }}>{l.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{l.syntax}</div>
              </div>
              <span className="chip" style={{ borderStyle: 'dashed' }}>{l.badge}</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.4 }}>{l.pitch}</div>
            <MiniCanvas kind={l.canvas} height={120} style={{ marginTop: 12 }} />
            <div style={{ marginTop: 10 }}>
              <span className="lbl">good for</span>
              <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12 }}>
                {l.good.map(g => <li key={g}>{g}</li>)}
              </ul>
            </div>
            <div style={{ marginTop: 8 }}>
              <span className="lbl">trade-offs</span>
              <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: 'var(--ink-soft)' }}>
                {l.less.map(g => <li key={g}>{g}</li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <span className={`pill ${i === 0 ? 'accent' : ''}`}>{l.key === 'pjs' ? 'read & copy' : 'start tour'}</span>
              <span className="pill">{l.key === 'pjs' ? 'install Processing ↗' : 'setup ↗'}</span>
            </div>
          </div>
        ))}
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── B · Comparison matrix ───────────────────────────────────────
function LangMatrix() {
  const t = useWf();
  const visible = useVisibleLangs();
  // Cell values keyed by lang.key so toggling columns stays aligned.
  const rows = [
    ['runs where',       { p5: 'browser',
                           canvas: 'browser',
                           pjs: 'Processing IDE (paste)' }],
    ['interactive here?',{ p5: 'yes — live edit',
                           canvas: 'yes — live edit',
                           pjs: 'no — read & copy only' }],
    ['install',          { p5: 'none — just open a page',
                           canvas: 'none — built into every browser',
                           pjs: 'Processing.org IDE' }],
    ['syntax flavor',    { p5: 'JS, friendly wrapper',
                           canvas: 'JS, the raw web API',
                           pjs: 'Java, classroom standard' }],
    ['great for',        { p5: 'quick demos, sharing online',
                           canvas: 'understanding what p5 abstracts',
                           pjs: 'AP CS A, Java courses, porting sketches' }],
  ];
  return (
    <WFFrame density={t.density}>
      <SiteNav active="languages" />
      <CornerMark>variant B · side-by-side matrix</CornerMark>
      <div style={{ padding: '28px 40px 6px' }}>
        <h1 className="title" style={{ fontSize: 40, lineHeight: 1 }}>
          What changes when you switch languages?
        </h1>
        <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>
          short answer: the words. long answer: a few things.
        </div>
      </div>

      <div style={{ padding: '20px 40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `180px ${visible.map(() => '1fr').join(' ')}`,
                      border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
          <div style={{ padding: 12 }} />
          {visible.map((l, i) => (
            <div key={l.key} style={{
              padding: 12, borderLeft: '1px solid var(--ink)',
              background: i === 0 ? 'var(--paper-edge)' : 'transparent'
            }}>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{l.name}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{l.syntax}</div>
              <MiniCanvas kind={l.canvas} height={80} style={{ marginTop: 8 }} />
            </div>
          ))}
          {rows.map(([k, vals], rIdx) => (
            <React.Fragment key={k}>
              <div style={{ padding: '10px 12px', borderTop: '1px solid var(--ink)',
                            fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em',
                            color: 'var(--ink-soft)', background: 'var(--paper-edge)' }}>{k}</div>
              {visible.map((l) => (
                <div key={l.key + k} style={{ padding: '10px 12px',
                      borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)',
                      fontSize: 13 }}>{vals[l.key]}</div>
              ))}
            </React.Fragment>
          ))}
          {/* CTA row */}
          <div style={{ padding: 10, borderTop: '1.5px solid var(--ink)' }} />
          {visible.map((l, i) => (
            <div key={l.key + 'cta'} style={{ padding: 10, borderTop: '1.5px solid var(--ink)',
                  borderLeft: '1px solid var(--ink)' }}>
              <span className={`pill ${i === 0 ? 'accent' : ''}`}>
                {l.key === 'pjs' ? `open ${l.name} reference →` : `open ${l.name} tour →`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── C · Wizard / quiz: pick your situation, get a recommendation ─
function LangWizard() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="languages" />
      <CornerMark>variant C · the quiz</CornerMark>
      <div style={{ padding: '28px 40px 6px' }}>
        <span className="lbl">two questions, one recommendation</span>
        <h1 className="title" style={{ fontSize: 40, lineHeight: 1, marginTop: 6 }}>
          Which path fits where you are right now?
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, padding: '20px 40px 30px' }}>
        <div>
          <div className="box-rough" style={{ padding: 16, marginBottom: 14 }}>
            <span className="hand" style={{ fontSize: 22 }}>1 · how comfortable are you with JS?</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {['brand new', 'some basics', 'pretty comfy', 'I write JS daily'].map((x, i) => (
                <span key={x} className={`pill ${i === 0 ? 'accent' : ''}`}>{x}</span>
              ))}
            </div>
          </div>
          <div className="box-rough" style={{ padding: 16, marginBottom: 14 }}>
            <span className="hand" style={{ fontSize: 22 }}>2 · what's pulling you in?</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {['make things fast', 'understand the fundamentals', 'school / coursework', 'just curious'].map((x, i) => (
                <span key={x} className={`pill ${i === 0 ? 'accent' : ''}`}>{x}</span>
              ))}
            </div>
          </div>
          <div className="box-dashed" style={{ padding: 14 }}>
            <span className="lbl">or just</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="pill">show me both</span>
              <span className="pill">surprise me</span>
            </div>
          </div>
        </div>

        <div className="box-rough" style={{ padding: 16, position: 'relative' }}>
          <span className="lbl">your match</span>
          <div style={{ fontWeight: 800, fontSize: 28, marginTop: 4 }}>p5.js</div>
          <div className="hand" style={{ fontSize: 20, color: 'var(--accent)' }}>start in the browser, today.</div>
          <MiniCanvas kind="circle" height={120} style={{ marginTop: 10 }} />
          <Lines n={3} widths={['95%', '85%', '70%']} />
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            <span className="pill accent">begin tour →</span>
            <span className="pill">why not the other?</span>
          </div>
          <Arrow from={[10, 30]} to={[80, 90]} dashed label="based on your picks" />
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── D · Hello-Canvas: same sketch, multiple implementations ──────
function LangHello() {
  const t = useWf();
  const visible = useVisibleLangs();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="languages" />
      <CornerMark>variant D · hello, canvas</CornerMark>
      <div style={{ padding: '28px 40px 8px' }}>
        <h1 className="title" style={{ fontSize: 40, lineHeight: 1 }}>
          Hello, canvas — same sketch, side by side.
        </h1>
        <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>
          one circle. the smallest possible sketch. read them side by side. pick the one that feels right.
        </div>
      </div>

      <div style={{ padding: '20px 40px 12px' }}>
        <div className="box-rough" style={{ padding: 14, background: '#fffdf7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="hand" style={{ fontSize: 22 }}>the result, everyone</span>
            <span className="lbl">canvas 400 × 240</span>
          </div>
          <MiniCanvas kind="circle" height={140} style={{ marginTop: 6 }} />
        </div>
      </div>

      <div style={{ padding: '6px 40px 24px',
                    display: 'grid', gridTemplateColumns: visible.map(() => '1fr').join(' '), gap: 14 }}>
        {visible.map((l, i) => (
          <div key={l.key}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{l.name}</div>
              <span className="lbl">{l.syntax}</span>
            </div>
            <CodePanel lang={l.name} lines={8} height={150}
              label={l.key === 'pjs' ? 'paste into Processing IDE' : 'hello, canvas'} />
            <Lines n={2} widths={['85%', '60%']} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <span className={`pill ${i === 0 ? 'accent' : ''}`}>
                {l.key === 'p5' ? 'try in browser'
                  : l.key === 'canvas' ? 'try in browser'
                  : 'copy for Processing IDE'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

Object.assign(window, { LangCards, LangMatrix, LangWizard, LangHello, LANGS, useVisibleLangs });
