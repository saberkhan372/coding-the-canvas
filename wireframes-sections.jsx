// Section page wireframes — "Make Systems" used as the example, 4 variants.

const SECTION_TITLE = 'Make Systems';
const SECTION_KICKER = 'section 04 of 07';
const SECTION_INTRO = "Let code repeat, branch, and think for itself. Loops, functions, arrays, objects — the parts that turn one drawing into a whole behavior.";
const SECTION_CONCEPTS = [
  ['06', 'For Loops & Grids', 'repeat across rows + columns'],
  ['07', 'Functions', 'package an idea, call it again'],
  ['08', 'Arrays', 'one variable, many values'],
  ['09', 'Objects', 'data + behavior bundled'],
  ['10', 'State Machines', 'sketches with modes'],
];

function SectionTopnav() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 36px 0' }}>
      {['Start with the Canvas', 'Make It Move', 'Make It Respond', 'Make Systems', 'Data as Material'].map((s, i) => (
        <React.Fragment key={s}>
          <span style={{
            fontSize: 11, padding: '4px 10px',
            border: i === 3 ? '1.5px solid var(--ink)' : '1px dashed var(--ink-faint)',
            background: i === 3 ? 'var(--paper)' : 'transparent',
            fontWeight: i === 3 ? 700 : 400,
            color: i === 3 ? 'var(--ink)' : 'var(--ink-soft)',
          }}>{`0${i + 1} · ${s}`}</span>
          {i < 4 && <span style={{ color: 'var(--ink-faint)' }}>·</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function SectionHeader({ variant }) {
  return (
    <>
      <SectionTopnav />
      <div style={{ padding: '16px 36px 8px' }}>
        <span className="lbl">{SECTION_KICKER}</span>
        <h1 className="title" style={{ fontSize: 56, lineHeight: 1, marginTop: 4 }}>{SECTION_TITLE}</h1>
        <div className="hand" style={{ fontSize: 22, color: 'var(--accent)', marginTop: 6 }}>
          loops, branches, and the patterns that make code feel alive.
        </div>
        <div style={{ maxWidth: 700, marginTop: 10 }}>
          <Lines n={2} widths={['100%', '85%']} />
        </div>
      </div>
      <CornerMark>{variant}</CornerMark>
    </>
  );
}

// ── A · Linear list with big intro ──────────────────────────────
function SectionLinear() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="sections" />
      <SectionHeader variant="variant A · the long read" />
      <div style={{ padding: '16px 36px 24px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18 }}>
          <span className="lbl">in this section</span>
          <span className="pill">5 ideas</span>
          <span className="pill">≈ 30 min each</span>
          <span className="pill">p5.js · Canvas API</span>
        </div>

        {SECTION_CONCEPTS.map(([n, name, sub], i) => (
          <div key={n} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 280px', gap: 18,
            padding: '18px 0', borderTop: i === 0 ? '1.5px solid var(--ink)' : '1px dotted var(--ink-faint)',
          }}>
            <div className={`num-circle ${n === '06' ? 'accent' : ''}`} style={{ width: 44, height: 44, fontSize: 22 }}>{n}</div>
            <div>
              <h2 className="section-title" style={{ fontSize: 22 }}>{name}</h2>
              <div className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)' }}>{sub}</div>
              <div style={{ marginTop: 8 }}><Lines n={2} widths={['100%', '70%']} /></div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <span className="chip">p5</span>
                {t.showCanvasAPI && <span className="chip">Canvas API</span>}
                {t.showProcessing && <span className="chip">Processing (Java)</span>}
                <span className="chip" style={{ borderStyle: 'dashed' }}>workshop tool</span>
              </div>
            </div>
            <MiniCanvas kind={['grid', 'wave', 'particles', 'circle', 'stripes'][i]} height={110} />
          </div>
        ))}

        <div className="box-rough" style={{ marginTop: 22, padding: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="hand" style={{ fontSize: 22 }}>finished this section?</span>
            <div>Move on to <strong>Data as Material</strong>, or jump back to any concept.</div>
          </div>
          <span className="pill accent">next section · Data as Material →</span>
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── B · Card grid ───────────────────────────────────────────────
function SectionGrid() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="sections" />
      <SectionHeader variant="variant B · card grid" />
      <div style={{ padding: '14px 36px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="pill solid">all 5</span>
          <span className="pill">interactive</span>
          <span className="pill">bridges</span>
          <span className="pill">starter sketches</span>
          <span className="pill" style={{ borderStyle: 'dashed' }}>filter ↓</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {SECTION_CONCEPTS.map(([n, name, sub], i) => (
            <div key={n} className="box-rough" style={{ padding: 12, position: 'relative',
                  borderColor: n === '06' ? 'var(--accent)' : 'var(--ink)' }}>
              <div style={{ position: 'absolute', top: -14, left: 10 }}>
                <div className={`num-circle ${n === '06' ? 'accent' : 'solid'}`} style={{ width: 28, height: 28, fontSize: 14 }}>{n}</div>
              </div>
              <MiniCanvas kind={['grid', 'wave', 'particles', 'circle', 'stripes'][i]} height={110} />
              <div style={{ fontWeight: 800, fontSize: 17, marginTop: 8 }}>{name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>{sub}</div>
              <Lines n={2} widths={['95%', '60%']} />
              <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                <span className="chip">p5</span>
                {t.showCanvasAPI && <span className="chip">C</span>}
                {t.showProcessing && <span className="chip">P</span>}
                {n === '06' && <span className="chip" style={{ background: 'var(--accent)', color: '#fff',
                  border: 'none' }}>continue</span>}
              </div>
            </div>
          ))}
          <div className="box-dashed" style={{ padding: 12, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            <span className="hand" style={{ fontSize: 22, color: 'var(--ink-soft)' }}>more soon</span>
            <Scribble w="60%" h={4} />
            <Scribble w="40%" h={4} />
          </div>
        </div>

        <SectionRule kicker="from the camp" title="Workshop tools that pair with this section" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['For Loop Stepper', 'Rows + Columns', 'Function Builder', 'Array Explorer'].map(x => (
            <div key={x} className="box" style={{ padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{x}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>workshop tool</div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── C · Storyboard / journey ────────────────────────────────────
function SectionStoryboard() {
  const t = useWf();
  const beats = [
    ['You start with', 'a single shape, drawn once.', 'circle'],
    ['Then you ask', 'what if it happened many times?', 'grid'],
    ['Now you can', 'package it as a function.', 'stripes'],
    ['And remember', 'many of them, in an array.', 'particles'],
    ['Finally', 'each item knows what it does.', 'wave'],
  ];
  return (
    <WFFrame density={t.density}>
      <SiteNav active="sections" />
      <SectionHeader variant="variant C · storyboard" />
      <div style={{ padding: '14px 36px 24px' }}>
        <div className="hand" style={{ fontSize: 22, color: 'var(--ink-soft)', marginBottom: 12 }}>
          read it as a story, then dive into the concept of your choice ↓
        </div>
        <div style={{ position: 'relative', paddingBottom: 12 }}>
          <div style={{ position: 'absolute', top: 110, left: 0, right: 0, height: 2,
                        borderTop: '2px dashed var(--ink)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, position: 'relative' }}>
            {beats.map(([kicker, line, kind], i) => (
              <div key={kicker} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <MiniCanvas kind={kind} height={100} style={{ width: '100%' }} />
                <div className={`num-circle ${i === 0 ? 'accent' : 'solid'}`}
                     style={{ width: 26, height: 26, fontSize: 13, marginTop: 8, background: 'var(--paper)',
                              color: i === 0 ? '#fff' : 'var(--ink)', border: '2px solid var(--ink)' }}>
                  {SECTION_CONCEPTS[i][0]}
                </div>
                <div className="hand" style={{ fontSize: 18, color: 'var(--accent)', marginTop: 6, textAlign: 'center' }}>
                  {kicker}
                </div>
                <div style={{ fontSize: 13, textAlign: 'center', marginTop: 2 }}>{line}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginTop: 6 }}>
                  {SECTION_CONCEPTS[i][1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionRule kicker="all at once" title="Or just open them" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {SECTION_CONCEPTS.map(([n, name]) => (
            <span key={n} className="pill" style={{ justifyContent: 'flex-start', padding: '6px 10px' }}>
              <span className="mono" style={{ fontWeight: 700 }}>{n}</span> · {name}
            </span>
          ))}
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── D · Sidebar TOC + content scroll ────────────────────────────
function SectionSidebar() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="sections" />
      <CornerMark>variant D · sidebar reader</CornerMark>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100% - 100px)' }}>
        <aside style={{
          borderRight: '1.5px solid var(--ink)', padding: '20px 18px', background: 'var(--paper-edge)'
        }}>
          <span className="lbl">section 04</span>
          <h2 className="section-title" style={{ fontSize: 22, marginTop: 4 }}>{SECTION_TITLE}</h2>
          <Scribble w="60%" h={3} />
          <div style={{ marginTop: 16 }}>
            <span className="lbl">contents</span>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8, gap: 6 }}>
              {SECTION_CONCEPTS.map(([n, name]) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 8px', borderLeft: n === '06' ? '3px solid var(--accent)' : '3px solid transparent',
                  background: n === '06' ? 'var(--paper)' : 'transparent',
                }}>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{n}</span>
                  <span style={{ fontSize: 13, fontWeight: n === '06' ? 700 : 400 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span className="lbl">read in</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
              <span className="chip">p5.js (default)</span>
              {t.showCanvasAPI && <span className="chip">Canvas API</span>}
              {t.showProcessing && <span className="chip">Processing (Java)</span>}
            </div>
          </div>
          <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px dashed var(--ink)' }}>
            <span className="lbl">next section</span>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>05 · Data as Material →</div>
          </div>
        </aside>

        <main style={{ padding: '24px 30px' }}>
          <span className="lbl">overview</span>
          <h1 className="title" style={{ fontSize: 38, lineHeight: 1, marginTop: 4 }}>
            What it means to <em style={{ color: 'var(--accent)' }}>make a system.</em>
          </h1>
          <div style={{ maxWidth: 620, marginTop: 10 }}>
            <Lines n={3} widths={['100%', '92%', '60%']} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
            <MiniCanvas kind="grid" height={130} label="06 · for loops" />
            <MiniCanvas kind="particles" height={130} label="09 · objects" />
          </div>

          <SectionRule kicker="continue" title="06 · For Loops & Grids" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18 }}>
            <div>
              <Lines n={5} widths={['100%', '95%', '70%', '85%', '60%']} />
              <div className="box-dashed" style={{ padding: 10, marginTop: 12 }}>
                <span className="hand" style={{ fontSize: 20 }}>try this →</span>
                <Lines n={2} widths={['90%', '70%']} />
              </div>
            </div>
            <CodePanel lang="p5.js" lines={11} height={200} />
          </div>
        </main>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

Object.assign(window, { SectionLinear, SectionGrid, SectionStoryboard, SectionSidebar });
