// AP coverage subpage wireframes — "Mapping CS Canvas to AP CS Principles"
// Four ways to communicate honest curriculum coverage to teachers.

// ── Curriculum data ──────────────────────────────────────────────
const BIG_IDEAS = [
  ['CRD', 'Creative Development',         'collaboration · iteration · debugging'],
  ['DAT', 'Data',                         'abstraction · representation · information'],
  ['AAP', 'Algorithms & Programming',     'control flow · procedures · data structures'],
  ['CSN', 'Computing Systems & Networks', 'internet · protocols · fault tolerance'],
  ['IOC', 'Impact of Computing',          'bias · ethics · digital divide'],
];

// Coverage map. 2 = strong, 1 = partial (needs framing), 0 = not covered.
// Columns are CS Canvas lessons 01–22, in order.
const COVERAGE = {
  // 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22
  CRD: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  DAT: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 0, 1],
  AAP: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 2, 2],
  CSN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  IOC: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 0],
};

const AP_LESSONS = [
  ['01', 'Coords'],   ['02', 'Color'],  ['03', 'Draw'],   ['04', 'Mouse'],
  ['05', 'Cond'],     ['06', 'Loops'],  ['07', 'Fn'],     ['08', 'Arr'],
  ['09', 'Obj'],      ['10', 'State'],  ['11', 'Pix'],    ['12', 'Bits'],
  ['13', 'Bin'],      ['14', 'Comp'],   ['15', 'Hist'],   ['16', 'Data'],
  ['17', 'Bias'],     ['18', 'A11y'],   ['19', 'Auth'],   ['20', 'Energy'],
  ['21', 'Recur'],    ['22', 'AList'],
];

// ── Primitives ───────────────────────────────────────────────────
function CoverageCell({ level }) {
  const styles = {
    2: { background: 'var(--accent)', border: '1.5px solid var(--ink)' },
    1: { background: 'var(--paper-edge)', border: '1.5px dashed var(--ink)' },
    0: { background: 'transparent', border: '1.5px solid var(--ink-faint)' },
  };
  return <span style={{
    display: 'inline-block', width: 12, height: 12, borderRadius: 2, ...styles[level]
  }} />;
}

function CoverageLegend({ style }) {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 11, ...style }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <CoverageCell level={2} /> strong coverage
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <CoverageCell level={1} /> partial — needs explicit framing
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <CoverageCell level={0} /> not covered
      </span>
    </div>
  );
}

function CoverageMatrix() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px repeat(22, 1fr)',
      border: '1.5px solid var(--ink)', background: 'var(--paper)',
    }}>
      <div style={{ padding: 10, background: 'var(--paper-edge)' }}>
        <span className="lbl" style={{ fontSize: 9 }}>Big Idea ↓ · Lesson →</span>
      </div>
      {AP_LESSONS.map(([n, name]) => (
        <div key={n} style={{
          padding: '6px 2px', borderLeft: '1px solid var(--ink)',
          background: 'var(--paper-edge)', textAlign: 'center',
        }}>
          <div className="mono" style={{ fontSize: 10, fontWeight: 700 }}>{n}</div>
          <div className="mono compact-hide" style={{ fontSize: 7, color: 'var(--ink-soft)' }}>{name}</div>
        </div>
      ))}
      {BIG_IDEAS.map(([code, name, sub]) => (
        <React.Fragment key={code}>
          <div style={{ padding: 10, borderTop: '1px solid var(--ink)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{code}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{name}</span>
            </div>
            <div className="mono compact-hide" style={{ fontSize: 9, color: 'var(--ink-soft)', marginTop: 2 }}>{sub}</div>
          </div>
          {COVERAGE[code].map((level, i) => (
            <div key={`${code}-${i}`} style={{
              padding: 6, borderLeft: '1px solid var(--ink)', borderTop: '1px solid var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CoverageCell level={level} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function APHeader({ kicker, title, sub, variant }) {
  return (
    <>
      <div style={{ padding: '28px 40px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mono lbl">{kicker}</span>
          <span className="chip">AP CS Principles</span>
          <span className="chip" style={{ borderStyle: 'dashed' }}>also AP CS A · Java</span>
        </div>
        <h1 className="title" style={{ fontSize: 42, lineHeight: 1, marginTop: 8 }}>
          {title}
        </h1>
        {sub && <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>{sub}</div>}
      </div>
      <CornerMark>{variant}</CornerMark>
    </>
  );
}

// ── A · Matrix-first ─────────────────────────────────────────────
function APMatrix() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <APHeader
        kicker="for teachers"
        title={<>Where CS Canvas fits in <em style={{ color: 'var(--accent)' }}>AP CSP.</em></>}
        sub="honest coverage. no marketing."
        variant="variant A · the coverage matrix"
      />

      <div style={{ padding: '14px 40px 6px' }}>
        <CoverageLegend />
      </div>

      <div style={{ padding: '12px 40px 6px' }}>
        <CoverageMatrix />
      </div>

      <div style={{ padding: '6px 40px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="hand" style={{ fontSize: 22, color: 'var(--accent)' }}>↑ read the rows:</span>
        <span style={{ fontSize: 13 }}>
          <b>AAP</b>, <b>DAT</b>, <b>IOC</b> covered. <b>CRD</b> threaded across every lesson. <b>CSN</b> — bring your own.
        </span>
      </div>

      <SectionRule kicker="bring your own" title="What this curriculum doesn't teach" />
      <div style={{ padding: '0 40px 18px' }}>
        <div className="box-dashed" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 14 }}>CSN</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Computing Systems & Networks</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6, maxWidth: 720 }}>
            Internet, protocols, fault tolerance, parallel & distributed computing. Canvas-based teaching here feels forced — we leave it to your existing materials.
          </div>
          <div className="lbl" style={{ marginTop: 10 }}>pair with</div>
          <div style={{ fontSize: 12, marginTop: 2 }}>your existing internet / protocols unit · roughly 3 weeks</div>
        </div>
      </div>

      <SectionRule kicker="bonus" title="Create Performance Task starter kits" />
      <div style={{ padding: '0 40px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          ['List + procedure', '08 Arrays · 07 Functions'],
          ['Iteration + selection', '06 For Loops · 05 Conditionals'],
          ['Abstraction + algorithm', '09 Objects · 10 State Machines'],
        ].map(([title, lessons]) => (
          <div key={title} className="box-rough" style={{ padding: 12 }}>
            <span className="hand" style={{ fontSize: 18, color: 'var(--accent)' }}>Create PT</span>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{title}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4 }}>{lessons}</div>
            <Lines n={2} widths={['80%', '60%']} />
            <span className="pill" style={{ marginTop: 8, fontSize: 10 }}>see recipe →</span>
          </div>
        ))}
      </div>

      <SiteFooter note="for AP CSP teachers · also AP CS A" />
    </WFFrame>
  );
}

// ── B · Calendar / pacing ────────────────────────────────────────
function YearStrip() {
  // 36-week AP CSP year. CS Canvas now spans most of it.
  const bands = [
    [3,  'CRD',  'your intro',          false],
    [7,  'CC',   '01–05 · Start→Respond', true],
    [5,  'CC',   '06–10 · Systems',     true],
    [6,  'CC',   '11–16 · Data',        true],
    [3,  'CSN',  'your unit',           false],
    [4,  'CC',   '17–20 · Impact',      true],
    [4,  'CPT',  'Create PT',           false],
    [4,  'rev',  'review · exam',       false],
  ];
  return (
    <div>
      <div style={{ display: 'flex', height: 64, border: '1.5px solid var(--ink)' }}>
        {bands.map(([weeks, code, label, hl], i) => (
          <div key={i} style={{
            flex: weeks,
            background: hl ? 'var(--accent)' : 'var(--paper)',
            color: hl ? '#fff' : 'var(--ink)',
            borderLeft: i > 0 ? '1.5px solid var(--ink)' : 'none',
            padding: '6px 6px', position: 'relative',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{code}</div>
              <div style={{ fontSize: 9, lineHeight: 1.2 }}>{label}</div>
            </div>
            <div className="mono" style={{ fontSize: 9, opacity: 0.7 }}>{weeks}w</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>week 1</span>
        <span className="hand" style={{ fontSize: 16, color: 'var(--accent)' }}>
          ← CS Canvas runs through most of the year →
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>week 36</span>
      </div>
    </div>
  );
}

function SectionStrip() {
  // Six sections of CS Canvas across the year, with the estimated week range each one covers.
  const sections = [
    ['1', 'Start with the Canvas', '01–02',  'weeks 4–5',   'AAP · variables, types',     false],
    ['2', 'Make It Move',          '03',     'weeks 6–7',   'AAP · iteration',            false],
    ['3', 'Make It Respond',       '04–05',  'weeks 8–10',  'AAP · selection, events',    false],
    ['4', 'Make Systems',          '06–10',  'weeks 11–15', 'AAP · procedures, abstr.',   false],
    ['5', 'Data as Material',      '11–16',  'weeks 16–21', 'DAT · representation, info', false],
    ['6', 'Impact of Computing',   '17–20',  'weeks 25–28', 'IOC · bias, ethics, energy', false],
    ['7', 'Algorithms',            '21–22',  'weeks 29–30', 'AAP · recursion, ArrayList', true],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
      {sections.map(([n, name, range, weeks, big, isNew]) => (
        <div key={n} className={isNew ? 'box-rough' : 'box'} style={{
          padding: 11, background: 'var(--paper)',
          borderColor: isNew ? 'var(--accent)' : 'var(--ink)',
          boxShadow: isNew ? '2px 3px 0 var(--accent)' : undefined,
          position: 'relative',
        }}>
          {isNew && <span className="chip" style={{
            position: 'absolute', top: -10, right: 8, fontSize: 9, padding: '1px 6px',
            background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)'
          }}>new</span>}
          <span className="mono lbl" style={{ fontSize: 9 }}>section {n}</span>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 2, lineHeight: 1.2 }}>{name}</div>
          <div className="mono" style={{ fontSize: 10, marginTop: 4 }}>{range}</div>
          <Scribble w="60%" h={3} />
          <div className="mono lbl" style={{ marginTop: 6, fontSize: 8 }}>{weeks}</div>
          <div className="lbl" style={{ marginTop: 4, fontSize: 9 }}>{big}</div>
        </div>
      ))}
    </div>
  );
}

function APCalendar() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <APHeader
        kicker="for teachers · pacing"
        title={<>About <em style={{ color: 'var(--accent)' }}>24 weeks</em> of canvas-based lessons across your CSP year.</>}
        sub="six sections, three CS Canvas bands. you bring CSN + the Create PT scaffolding."
        variant="variant B · the pacing strip"
      />

      <div style={{ padding: '24px 40px 8px' }}>
        <YearStrip />
      </div>

      <SectionRule kicker="zoom in" title="The six CS Canvas sections, in order" />
      <div style={{ padding: '0 40px 18px' }}>
        <SectionStrip />
      </div>

      <SectionRule kicker="the rest of the year" title="What you supply" />
      <div style={{ padding: '0 40px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          ['weeks 1–3',    'CRD · onboarding',  'your intro materials · classroom debugging culture'],
          ['weeks 22–24',  'CSN · your unit',   'internet · protocols · fault tolerance · networks'],
          ['weeks 29–36',  'Create PT + review','CS Canvas seeds available — see PT recipes'],
        ].map(([w, title, x]) => (
          <div key={w} className="box-dashed" style={{ padding: 12 }}>
            <span className="lbl" style={{ fontSize: 10 }}>{w}</span>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{title}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.4 }}>{x}</div>
          </div>
        ))}
      </div>

      <SiteFooter note="for AP CSP teachers · 36-week pacing" />
    </WFFrame>
  );
}

// ── C · Gap-first / honest coverage ──────────────────────────────
function BigIdeaItem({ code, name, level, detail }) {
  const conf = {
    full:     { label: 'full coverage',           bg: 'var(--accent)',     fg: '#fff' },
    threaded: { label: 'threaded · explicit',     bg: 'var(--accent)',     fg: '#fff' },
    partial:  { label: 'partial',                 bg: 'var(--paper-edge)', fg: 'var(--ink)' },
    implicit: { label: 'implicit · needs framing',bg: 'var(--paper-edge)', fg: 'var(--ink)' },
    none:     { label: 'not covered',             bg: 'transparent',       fg: 'var(--ink-soft)' },
  }[level] || {};
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px dashed var(--ink-faint)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="mono" style={{
            fontWeight: 700, fontSize: 13, background: conf.bg, color: conf.fg,
            padding: '1px 6px', border: '1px solid var(--ink)'
          }}>{code}</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{name}</span>
        </div>
        <span className="lbl" style={{ fontSize: 9 }}>{conf.label}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>{detail}</div>
    </div>
  );
}

function APGapFirst() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <APHeader
        kicker="for teachers · what's in, what's out"
        title="Most of AP CSP. Honestly."
        sub="four of five Big Ideas covered. here's exactly what — and what you'll still need to bring."
        variant="variant C · honest gaps"
      />

      <div style={{ padding: '20px 40px 12px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="box-rough" style={{
          padding: 18, borderColor: 'var(--accent)', boxShadow: '3px 4px 0 var(--accent)'
        }}>
          <span className="hand" style={{ fontSize: 28, color: 'var(--accent)' }}>what we teach ✓</span>
          <div style={{ marginTop: 12 }}>
            <BigIdeaItem code="AAP" name="Algorithms & Programming" level="full"
              detail="variables · types · iteration · selection · procedures · lists · abstraction · state · 10 lessons" />
            <BigIdeaItem code="DAT" name="Data" level="full"
              detail="pixels · 24-bit color · binary representation · compression · histograms · datasets · 6 lessons" />
            <BigIdeaItem code="IOC" name="Impact of Computing" level="full"
              detail="bias in filters · accessibility · authorship & ethics · sustainability · 4 lessons" />
            <BigIdeaItem code="CRD" name="Creative Development" level="threaded"
              detail="iteration · collaboration · design-first — three explicit threads + bridge lessons across every section" />
          </div>
        </div>
        <div className="box-dashed" style={{ padding: 18 }}>
          <span className="hand" style={{ fontSize: 28, color: 'var(--ink-soft)' }}>what we don't ✗</span>
          <div style={{ marginTop: 12 }}>
            <BigIdeaItem code="CSN" name="Computing Systems & Networks" level="none"
              detail="internet · protocols · fault tolerance · parallel & distributed computing" />
          </div>
          <div className="lbl" style={{ marginTop: 18 }}>
            roughly 1 of 5 Big Ideas · ~3 weeks of class time
          </div>
        </div>
      </div>

      <SectionRule kicker="pair with" title="One companion for the CSN unit" />
      <div style={{ padding: '0 40px 18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          ['code.org CSP · Internet',  'best free CSN unit · packets, protocols, fault tolerance'],
          ['How the Internet Works',   'video series for at-home / flipped sessions'],
          ['Your existing networks',   'most teachers already have a CSN unit they like'],
        ].map(([name, why]) => (
          <div key={name} className="box" style={{ padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>{why}</div>
            <span className="pill" style={{ marginTop: 8, fontSize: 10 }}>open ↗</span>
          </div>
        ))}
      </div>

      <SectionRule kicker="appendix" title="The detailed coverage map" />
      <div style={{ padding: '0 40px 8px' }}>
        <CoverageMatrix />
      </div>
      <div style={{ padding: '10px 40px 24px' }}>
        <CoverageLegend />
      </div>

      <SiteFooter note="for AP CSP teachers" />
    </WFFrame>
  );
}

// ── D · Teacher FAQ ──────────────────────────────────────────────
function APFaq() {
  const t = useWf();
  const qa = [
    ['Can I use this for my whole AP CSP course?',
     "Close — it covers four of five Big Ideas across 22 lessons (~24 weeks). You'll still need your own CSN unit (internet, protocols, fault tolerance) plus the Create PT scaffolding for the final weeks."],
    ['Does it prep students for the Create Performance Task?',
     "Yes — every sketch can become a Create PT submission. We provide three starter recipes: list + procedure, iteration + selection, abstraction + algorithm. Each maps to the College Board's required artifacts."],
    ['Does it work for AP CS A (Java) too?',
     "The Processing column is read-and-copy Java that runs in the Processing IDE. It doubles as a drawing / algorithms supplement for CS A — same lessons, Java syntax."],
    ['What about AP-style pseudocode on the exam?',
     "Each lesson has a pseudocode bridge — same logic, the College Board's text format. Students see the visual, the code, and the pseudocode side by side."],
    ['How do I assess this?',
     "Every lesson ships a rubric checkpoint (reproduce · modify · extend), answer keys, and a portfolio template. Sample student work included."],
    ['Can students remix without writing code?',
     "Yes. Every sketch has tweak controls — change parameters, see the result. A low-floor entry for students before they touch syntax."],
  ];
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <CornerMark>variant D · teacher FAQ</CornerMark>

      <div style={{ padding: '28px 40px 18px', display: 'grid',
                    gridTemplateColumns: '1.6fr 1fr', gap: 30 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono lbl">for teachers</span>
            <span className="chip">AP CS Principles</span>
            <span className="chip" style={{ borderStyle: 'dashed' }}>AP CS A · Java</span>
          </div>
          <h1 className="title" style={{ fontSize: 42, lineHeight: 1, marginTop: 8 }}>
            Six questions teachers ask.
          </h1>
          <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>
            answered straight. no marketing.
          </div>
        </div>
        <div className="box-rough" style={{ padding: 14 }}>
          <span className="lbl">at a glance</span>
          <Stat label="fits into" value="most of the year · ~24 weeks" />
          <Stat label="big ideas covered" value="4 of 5 (AAP · DAT · IOC · CRD)" />
          <Stat label="lessons" value="22 concepts · ~30 min each" />
          <Stat label="languages" value="p5.js · Canvas API · Processing (Java)" />
          <Stat label="also good for" value="AP CS A · Java" />
        </div>
      </div>

      <div style={{ padding: '0 40px 18px' }}>
        {qa.map(([q, a], i) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: '1px dashed var(--ink-faint)' }}>
            <div className="hand" style={{ fontSize: 22, color: 'var(--accent)', marginBottom: 6 }}>
              {q}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink)', maxWidth: 880 }}>
              {a}
            </div>
          </div>
        ))}
      </div>

      <SectionRule kicker="for reference" title="The coverage matrix" />
      <div style={{ padding: '0 40px 8px' }}>
        <CoverageMatrix />
      </div>
      <div style={{ padding: '10px 40px 24px' }}>
        <CoverageLegend />
      </div>

      <SiteFooter note="for AP CSP & AP CS A teachers" />
    </WFFrame>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ marginTop: 10 }}>
      <span className="lbl" style={{ fontSize: 9 }}>{label}</span>
      <div className="mono" style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, {
  APMatrix, APCalendar, APGapFirst, APFaq,
  BIG_IDEAS, COVERAGE, AP_LESSONS,
  CoverageCell, CoverageLegend, CoverageMatrix,
});
