// Homepage wireframes — linear curriculum (1 → 22), 4 variants.

const CONCEPTS = [
  ['01', 'Coordinates', 'pixels, x/y, origin'],
  ['02', 'Shapes & Color', 'fill, stroke, palette'],
  ['03', 'Draw Loop / Time', 'setup, draw, frameCount'],
  ['04', 'Mouse Input', 'mouseX, mousePressed'],
  ['05', 'Conditionals', 'if / else / boolean'],
  ['06', 'For Loops & Grids', 'i, nesting, patterns'],
  ['07', 'Functions', 'parameters, return'],
  ['08', 'Arrays', 'lists, index, loops'],
  ['09', 'Objects', 'data + behavior'],
  ['10', 'State Machines', 'modes, screens'],
  ['11', 'Pixels / Image Data', 'pictures as numbers'],
  ['12', 'Color is 24 Bits', 'RGB · binary'],
  ['13', 'Binary as Pixels', 'bits → bitmap'],
  ['14', 'Compression by Drawing', 'RLE · lossless · lossy'],
  ['15', 'Histograms & Sampling', 'extract info'],
  ['16', 'Data as Material', 'CSV, JSON, drawing'],
  ['17', 'Bias in a Filter', 'visible failure'],
  ['18', 'Color & Accessibility', 'palette · contrast · simulate'],
  ['19', 'Whose Authorship?', 'human vs algorithm'],
  ['20', 'Energy of a Sketch', 'compute · sustainability'],
  ['21', 'Recursion as Fractals', 'base case, recursive case'],
  ['22', 'ArrayList in Action', 'dynamic lists, particles'],
];

// ── A · Spine path: numbered curriculum running down the page ────
function HomeSpine() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="home" />
      <CornerMark>variant A · the spine</CornerMark>
      <div style={{ padding: '28px 40px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <h1 className="title" style={{ fontSize: 52, lineHeight: 1, maxWidth: 620 }}>
            Learn CS by <span style={{ color: 'var(--accent)' }}>seeing code</span><br />
            act on a canvas.
          </h1>
          <div style={{ flex: 1 }} />
          <CCFestBadge size="lg" />
        </div>
        <div style={{ marginTop: 14, maxWidth: 560 }}>
          <Lines n={2} widths={['92%', '70%']} />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <span className="pill accent">start at 01 →</span>
          <span className="pill">pick a language</span>
          <span className="pill">browse all 22</span>
        </div>
      </div>

      <SectionRule kicker="the path" title="22 ideas, in order — but every stop stands alone" />

      <div style={{ position: 'relative', padding: '0 60px 40px' }}>
        {/* central spine */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 40, width: 2,
                      background: 'var(--ink)', transform: 'translateX(-50%)' }} />
        {CONCEPTS.map(([n, name, sub], i) => {
          const left = i % 2 === 0;
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', marginBottom: 14, position: 'relative' }}>
              <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end',
                            paddingRight: left ? 30 : 0, paddingLeft: left ? 0 : 30 }}>
                {left && <ConceptCard n={n} name={name} sub={sub} active={n === '06'} side="left" />}
              </div>
              <div className={`num-circle ${n === '06' ? 'accent' : ''}`} style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 2,
              }}>{n}</div>
              <div style={{ width: '50%', paddingLeft: left ? 0 : 30, paddingRight: left ? 30 : 0 }}>
                {!left && <ConceptCard n={n} name={name} sub={sub} active={n === '06'} side="right" />}
              </div>
            </div>
          );
        })}
      </div>

      <CCFestOrigin />
      <SiteFooter />
    </WFFrame>
  );
}

function ConceptCard({ n, name, sub, active, side }) {
  return (
    <div className="box" style={{
      padding: '10px 14px', minWidth: 280, maxWidth: 320,
      boxShadow: active ? '3px 4px 0 var(--accent)' : '2px 3px 0 var(--ink)',
      borderColor: active ? 'var(--accent)' : 'var(--ink)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{name}</span>
        {active && <span className="hand" style={{ color: 'var(--accent)', fontSize: 16 }}>you are here</span>}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 2 }}>{sub}</div>
      <div className="compact-hide" style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <span className="chip">p5.js</span>
        <span className="chip">Canvas API</span>
      </div>
    </div>
  );
}

// ── B · Big hero + 12-step ribbon ────────────────────────────────
function HomeRibbon() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="home" />
      <CornerMark>variant B · the ribbon</CornerMark>
      <div style={{ padding: '40px 48px 24px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
        <div>
          <span className="lbl">a visual atlas of computer science</span>
          <h1 className="title" style={{ fontSize: 62, lineHeight: 0.98, marginTop: 8 }}>
            Coding the<br /> <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Canvas</em>.
          </h1>
          <div style={{ maxWidth: 460, marginTop: 16 }}><Lines n={3} widths={['100%', '92%', '60%']} /></div>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <span className="pill accent">begin · 01 Coordinates</span>
            <span className="pill">teacher mode</span>
            <CCFestBadge size="lg" />
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <MiniCanvas kind="grid" height={240} label="06 · for loops & grids" />
          <div className="annot" style={{ position: 'absolute', top: -18, left: 10 }}>same idea, friendly + raw ↓</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
            <CodePanel lang="p5.js" height={70} lines={5} />
            <CodePanel lang="Canvas API" height={70} lines={5} />
          </div>
        </div>
      </div>

      <SectionRule kicker="the arc" title="From first marks to data as material" />

      <div style={{ padding: '0 48px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflow: 'hidden' }}>
          {CONCEPTS.map(([n, name], i) => (
            <React.Fragment key={n}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 38 }}>
                <div className={`num-circle ${n === '06' ? 'accent' : ''}`} style={{ width: 24, height: 24, fontSize: 13 }}>{n}</div>
                <div className="mono" style={{ fontSize: 8, marginTop: 5, color: 'var(--ink-soft)',
                      textAlign: 'center', lineHeight: 1.15, maxWidth: 56, minHeight: 24 }}>{name}</div>
              </div>
              {i < CONCEPTS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: 'var(--ink)', opacity: i < 5 ? 1 : 0.3, minWidth: 4 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <SectionRule kicker="seven movements" title="The big arc, in seven sections" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, padding: '0 48px 24px' }}>
        {[
          ['Start with the Canvas', '01–02', 'circle'],
          ['Make It Move', '03', 'wave'],
          ['Make It Respond', '04–05', 'particles'],
          ['Make Systems', '06–10', 'grid'],
          ['Data as Material', '11–16', 'stripes'],
          ['Impact of Computing', '17–20', 'circle'],
          ['Algorithms', '21–22', 'particles'],
        ].map(([title, range, kind]) => (
          <div key={title} className="box" style={{ padding: 12 }}>
            <MiniCanvas kind={kind} height={80} />
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8 }}>{title}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>{range}</div>
          </div>
        ))}
      </div>

      <CCFestOrigin />
      <SiteFooter />
    </WFFrame>
  );
}

// ── C · Notebook / TOC ───────────────────────────────────────────
function HomeNotebook() {
  const t = useWf();
  return (
    <WFFrame density={t.density} style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 27px, rgba(28,26,23,.06) 27px 28px)'
    }}>
      <SiteNav active="home" />
      <CornerMark>variant C · the syllabus</CornerMark>
      <div style={{ padding: '28px 60px 8px', display: 'flex', alignItems: 'baseline', gap: 20 }}>
        <span className="hand" style={{ fontSize: 36 }}>chapter zero —</span>
        <h1 className="title" style={{ fontSize: 36 }}>a canvas, an idea, a language.</h1>
      </div>
      <div style={{ padding: '0 60px 18px', maxWidth: 720 }}>
        <Lines n={2} widths={['100%', '60%']} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, padding: '0 60px 30px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span className="hand" style={{ fontSize: 22, color: 'var(--accent)' }}>contents</span>
            <div style={{ flex: 1, height: 1, borderBottom: '1.5px dashed var(--ink)' }} />
            <span className="lbl">22 ideas</span>
          </div>
          {CONCEPTS.map(([n, name, sub]) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '36px 1fr auto', alignItems: 'baseline',
              padding: '8px 0', borderBottom: '1px dotted var(--ink-faint)', columnGap: 10,
            }}>
              <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{n}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
                <div className="mono compact-hide" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>{sub}</div>
              </div>
              <div className="compact-hide" style={{ display: 'flex', gap: 4 }}>
                <span className="chip" style={{ padding: '1px 6px', fontSize: 9 }}>p5</span>
                {t.showCanvasAPI && <span className="chip" style={{ padding: '1px 6px', fontSize: 9 }}>C</span>}
                {t.showProcessing && <span className="chip" style={{ padding: '1px 6px', fontSize: 9 }}>P</span>}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="box-rough" style={{ padding: 14 }}>
            <span className="hand" style={{ fontSize: 22 }}>how to read this book</span>
            <ol style={{ paddingLeft: 18, margin: '8px 0 0', fontSize: 13, lineHeight: 1.5 }}>
              <li>Pick a chapter — every one stands alone.</li>
              <li>See the canvas before you read the code.</li>
              <li>Try it in your way: p5.js, raw Canvas API, or copy to Processing for Java.</li>
              <li>Remix the example. Make it yours.</li>
            </ol>
          </div>
          <div className="box-dashed" style={{ marginTop: 14, padding: 14 }}>
            <span className="lbl">if you're a…</span>
            <Lines n={4} widths={['80%', '90%', '70%', '85%']} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <span className="chip">self-learner</span><span className="chip">teacher</span>
              <span className="chip">student</span><span className="chip">curious dev</span>
            </div>
          </div>
        </div>
      </div>

      <CCFestOrigin />
      <SiteFooter />
    </WFFrame>
  );
}

// ── D · Card stack with sticky progress sidebar ──────────────────
function HomeProgress() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="home" />
      <CornerMark>variant D · progress rail</CornerMark>
      <div style={{ padding: '24px 40px 12px' }}>
        <h1 className="title" style={{ fontSize: 46, lineHeight: 1, maxWidth: 760 }}>
          Twelve ideas. <span className="hand" style={{ color: 'var(--accent)' }}>any language.</span>
          One canvas at a time.
        </h1>
        <div style={{ maxWidth: 600, marginTop: 12 }}><Lines n={2} widths={['100%', '70%']} /></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, padding: '14px 40px 30px' }}>
        <div>
          <div style={{ position: 'sticky', top: 14 }}>
            <span className="lbl">your path</span>
            <div className="box" style={{ marginTop: 8, padding: 10 }}>
              {CONCEPTS.map(([n, name]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <div className={`num-circle ${n === '06' ? 'accent' : (parseInt(n) < 6 ? 'solid' : '')}`}
                       style={{ width: 22, height: 22, fontSize: 12 }}>{n}</div>
                  <span style={{ fontSize: 12, fontWeight: parseInt(n) === 6 ? 700 : 400 }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ink-soft)' }}>
              <span className="hand" style={{ fontSize: 18, color: 'var(--accent)' }}>5 / 22 →</span>
              <Scribble w="60%" h={4} />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {CONCEPTS.map(([n, name, sub], i) => (
            <div key={n} className="box" style={{ padding: 12, position: 'relative',
                  borderColor: n === '06' ? 'var(--accent)' : 'var(--ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mono" style={{ fontWeight: 700, fontSize: 12 }}>{n} / 22</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span className="chip" style={{ padding: '1px 5px', fontSize: 9 }}>p5</span>
                  {t.showCanvasAPI && <span className="chip" style={{ padding: '1px 5px', fontSize: 9 }}>C</span>}
                  {t.showProcessing && <span className="chip" style={{ padding: '1px 5px', fontSize: 9 }}>P</span>}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)', marginBottom: 8 }}>{sub}</div>
              <MiniCanvas kind={['grid','circle','wave','particles','stripes'][i % 5]} height={70} />
            </div>
          ))}
        </div>
      </div>

      <CCFestOrigin />
      <SiteFooter />
    </WFFrame>
  );
}

// ── Reusable CC Fest origin section ──────────────────────────────
function CCFestOrigin() {
  const t = useWf();
  if (!t.ccFest) return null;
  return (
    <div style={{
      margin: '18px 40px 30px', padding: '20px 24px', position: 'relative',
      borderTop: '1.5px dashed var(--ink)', borderBottom: '1.5px dashed var(--ink)',
    }}>
      <span className="hand" style={{
        position: 'absolute', top: -14, left: 24, background: 'var(--paper)',
        padding: '0 8px', fontSize: 22, color: 'var(--accent)',
      }}>born from CC Fest →</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>This atlas began as a coding camp.</div>
          <div style={{ marginTop: 6 }}><Lines n={3} widths={['100%', '95%', '70%']} /></div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <span className="pill">visit ccfest.rocks ↗</span>
            <span className="pill">camp roadmap</span>
          </div>
        </div>
        <div>
          <span className="lbl">what came with it</span>
          <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, lineHeight: 1.6 }}>
            <li>21 concept bridges</li>
            <li>60+ workshop tools</li>
            <li>40 starter sketches</li>
          </ul>
        </div>
        <div>
          <span className="lbl">teaching notes</span>
          <div style={{ marginTop: 6 }}><Lines n={3} widths={['90%', '80%', '60%']} /></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeSpine, HomeRibbon, HomeNotebook, HomeProgress, CONCEPTS, CCFestOrigin });
