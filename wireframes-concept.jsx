// Concept page wireframes — "06 · For Loops & Grids" in 4 layout shapes.

function ConceptHeader({ variant }) {
  const t = useWf();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '20px 36px 6px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono lbl">concept</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>06 / 22</span>
            <span className="chip">Make Systems</span>
            <CCFestBadge />
          </div>
          <h1 className="title" style={{ fontSize: 44, lineHeight: 1, marginTop: 6 }}>
            For Loops & Grids
          </h1>
          <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 4 }}>
            “tell the computer to do it again, but a little different.”
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <span className="lbl">prev · next</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="pill">← 05 Conditionals</span>
            <span className="pill">07 Functions →</span>
          </div>
        </div>
      </div>
      <CornerMark>{variant}</CornerMark>
    </>
  );
}

function LanguageTabs({ active = 'p5.js', vertical }) {
  const t = useWf();
  const tabs = ['p5.js'];
  if (t.showCanvasAPI) tabs.push('Canvas API');
  if (t.showProcessing) tabs.push('Processing (Java)');
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row',
                  gap: vertical ? 2 : 0, alignItems: 'flex-end' }}>
      {tabs.map(name => (
        <span key={name} className={`tab ${name === active ? 'active' : ''}`}>{name}</span>
      ))}
      <span className="tab dim">+ add language</span>
    </div>
  );
}

function CanvasIdeaStrip() {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
      {[
        ['repeat across a row', 'wave'],
        ['stack into a grid', 'grid'],
        ['vary with i', 'stripes'],
        ['nest a loop', 'particles'],
      ].map(([t, k]) => (
        <div key={t} style={{ flex: 1 }}>
          <MiniCanvas kind={k} height={70} />
          <div className="mono" style={{ fontSize: 10, marginTop: 4, color: 'var(--ink-soft)' }}>{t}</div>
        </div>
      ))}
    </div>
  );
}

// ── A · Tabs above one shared canvas+code pane ──────────────────
function ConceptTabs() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="concepts" />
      <ConceptHeader variant="variant A · tabbed pane" />
      <div style={{ padding: '12px 36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
          <div>
            <span className="hand" style={{ fontSize: 22 }}>the canvas idea →</span>
            <Lines n={3} widths={['100%', '92%', '70%']} />
            <CanvasIdeaStrip />
          </div>
          <div>
            <MiniCanvas kind="grid" height={210} label="10 × 6 grid of circles" />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="pill">⏵ play</span>
              <span className="pill">↻ reset</span>
              <span className="pill">edit in p5 ↗</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <LanguageTabs active="p5.js" />
          <div className="box" style={{ borderTop: 'none', padding: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <CodePanel lang="p5.js · JavaScript" lines={12} height={220} label="dialects of the same idea" />
              <div>
                <span className="hand" style={{ fontSize: 20 }}>what to notice ↓</span>
                <Lines n={4} widths={['95%', '85%', '90%', '60%']} />
                <div className="box-dashed" style={{ marginTop: 12, padding: 10 }}>
                  <span className="lbl">try this</span>
                  <Lines n={2} widths={['90%', '70%']} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionRule kicker="related" title="From here you might go to…" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[['07', 'Functions'], ['09', 'Objects'], ['⬡', 'Modulo Bridge'], ['✦', 'Pattern Logic']].map(([n, x]) => (
            <div key={x} className="box" style={{ padding: 10 }}>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{n}</span>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{x}</div>
              <Scribble w="70%" h={4} />
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── B · Three side-by-side code panels with canvas on top ────────
function ConceptSideBySide() {
  const t = useWf();
  const cols = ['p5.js'];
  if (t.showCanvasAPI) cols.push('Canvas API');
  if (t.showProcessing) cols.push('Processing (Java)');
  return (
    <WFFrame density={t.density}>
      <SiteNav active="concepts" />
      <ConceptHeader variant="variant B · side-by-side dialects" />
      <div style={{ padding: '12px 36px 24px' }}>
        <div className="box-rough" style={{ padding: 14, marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <MiniCanvas kind="grid" height={140} style={{ width: 360 }} label="the canvas idea" />
            <div style={{ flex: 1 }}>
              <span className="hand" style={{ fontSize: 22, color: 'var(--accent)' }}>repeat across a grid</span>
              <Lines n={3} widths={['100%', '95%', '70%']} />
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <span className="chip">i, j</span><span className="chip">nested for</span>
                <span className="chip">rows × cols</span><span className="chip">cell width</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: cols.map(() => '1fr').join(' '), gap: 14 }}>
          {cols.map((c, i) => {
            const isProcessing = c.startsWith('Processing');
            return (
              <div key={c} style={{ position: 'relative' }}>
                {!isProcessing && <div className="annot" style={{
                  position: 'absolute', top: -22, left: 0
                }}>interactive →</div>}
                {isProcessing && <div className="annot muted" style={{
                  position: 'absolute', top: -22, left: 0
                }}>read & copy · AP CS A</div>}
                <CodePanel lang={c} lines={14} height={260}
                  label={isProcessing ? 'paste into Processing IDE' : 'live'} />
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <span className="pill" style={{ fontSize: 10 }}>copy</span>
                  {!isProcessing && <span className="pill" style={{ fontSize: 10 }}>open editor ↗</span>}
                </div>
              </div>
            );
          })}
        </div>

        <SectionRule kicker="line by line" title="What's happening inside the loop" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="box" style={{ padding: 10 }}>
            <Lines n={5} widths={['95%', '70%', '85%', '60%', '90%']} />
          </div>
          <div className="box-dashed" style={{ padding: 10 }}>
            <span className="lbl">try this</span>
            <Lines n={4} widths={['90%', '70%', '85%', '60%']} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── C · Stacked: p5 interactive on top, Canvas API & Processing read-along ─
function ConceptStacked() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="concepts" />
      <ConceptHeader variant="variant C · stacked, p5 first" />
      <div style={{ padding: '12px 36px 24px' }}>
        <div style={{ marginBottom: 14 }}>
          <span className="hand" style={{ fontSize: 26 }}>the idea, in pictures</span>
          <CanvasIdeaStrip />
        </div>

        <div className="box-rough" style={{ padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pill accent">live · p5.js</span>
              <span className="hand" style={{ fontSize: 20 }}>change a number, change the picture</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="pill">⏵</span><span className="pill">↻</span><span className="pill">edit ↗</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <MiniCanvas kind="grid" height={200} />
            <CodePanel lang="p5.js" lines={11} height={200} />
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, alignItems: 'center' }}>
            <span className="lbl">rows</span><Scribble w={70} h={4} />
            <span className="lbl">cols</span><Scribble w={70} h={4} />
            <span className="lbl">cell</span><Scribble w={70} h={4} />
            <span className="lbl">color</span><Scribble w={70} h={4} />
          </div>
        </div>

        {t.showCanvasAPI && (
          <div className="box" style={{ padding: 12, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span className="pill">Canvas API · no library</span>
              <span className="lbl">read-along · what p5 is doing under the hood</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }}>
              <CodePanel lang="Canvas API" lines={11} height={160} />
              <div>
                <Lines n={5} widths={['90%', '85%', '70%', '95%', '60%']} />
              </div>
            </div>
          </div>
        )}

        {t.showProcessing && (
          <div className="box" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span className="pill">Processing (Java)</span>
              <span className="lbl">read & copy · for AP CS A and Java classrooms</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }}>
              <CodePanel lang="Processing (Java)" lines={11} height={160} />
              <div>
                <Lines n={5} widths={['85%', '95%', '60%', '80%', '70%']} />
              </div>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

// ── D · Segmented toggle, single pane swaps ─────────────────────
function ConceptToggle() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="concepts" />
      <ConceptHeader variant="variant D · toggle, one pane" />
      <div style={{ padding: '12px 36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 22 }}>
          {/* Left rail: the canvas idea */}
          <div>
            <div className="box-rough" style={{ padding: 12 }}>
              <span className="hand" style={{ fontSize: 22 }}>canvas first</span>
              <MiniCanvas kind="grid" height={150} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span className="pill">⏵</span><span className="pill">↻</span>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <span className="lbl">what to know</span>
              <Lines n={4} widths={['90%', '95%', '60%', '80%']} />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className="lbl">jump to</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                {['the idea', 'the code', 'try it', 'go deeper'].map(x => (
                  <span key={x} style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {x}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: segmented control + swapping pane */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span className="hand" style={{ fontSize: 22, color: 'var(--accent)' }}>same idea, in</span>
              <div className="box" style={{ display: 'inline-flex', padding: 2 }}>
                <span className="pill solid" style={{ borderRadius: 2 }}>p5.js</span>
                {t.showCanvasAPI && <span className="pill" style={{ borderRadius: 2, border: 'none' }}>Canvas API</span>}
                {t.showProcessing && <span className="pill" style={{ borderRadius: 2, border: 'none' }}>Processing (Java)</span>}
              </div>
              <span className="lbl">switch any time</span>
            </div>

            <div className="box-rough" style={{ padding: 14 }}>
              <CodePanel lang="p5.js" lines={14} height={240} label="the code" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div className="box-dashed" style={{ padding: 10 }}>
                  <span className="hand" style={{ fontSize: 18 }}>try changing →</span>
                  <Lines n={3} widths={['85%', '90%', '60%']} />
                </div>
                <div className="box-dashed" style={{ padding: 10 }}>
                  <span className="hand" style={{ fontSize: 18 }}>watch for →</span>
                  <Lines n={3} widths={['90%', '70%', '95%']} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="lbl">how a vanilla-JS dev reads this</span>
              <Scribble w="40%" h={4} />
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </WFFrame>
  );
}

Object.assign(window, { ConceptTabs, ConceptSideBySide, ConceptStacked, ConceptToggle, ConceptHeader, LanguageTabs, CanvasIdeaStrip });
