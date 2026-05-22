// AP CS A coverage page wireframes — Processing (Java) as the primary column.
// Four variants matching the CSP page structure: matrix-first / pacing / honest-gaps / FAQ.

// ── Curriculum data ──────────────────────────────────────────────
const CSA_UNITS = [
  ['U1',  'Primitive Types',                'int · double · expressions'],
  ['U2',  'Using Objects',                  'method calls · null · String'],
  ['U3',  'Boolean Expressions & if',       'logical · selection · short-circuit'],
  ['U4',  'Iteration',                      'while · for · loops'],
  ['U5',  'Writing Classes',                'methods · constructors · scope'],
  ['U6',  'Array',                          'fixed-size · indexing · traversal'],
  ['U7',  'ArrayList',                      'dynamic · generics · traversal'],
  ['U8',  '2D Array',                       'rows × cols · nested for'],
  ['U9',  'Inheritance',                    'extends · super · polymorphism'],
  ['U10', 'Recursion',                      'base case · recursive case · trees'],
];

// CS Canvas lesson coverage of CS A units.
// 2 = strong, 1 = partial, 0 = not covered.
const COVERAGE_CSA = {
  //    01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22
  U1:  [2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  U2:  [0, 1, 0, 2, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  U3:  [0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  U4:  [0, 0, 2, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
  U5:  [0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  U6:  [0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  U7:  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  U8:  [0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0],
  U9:  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  U10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
};

// CSA-specific cell renderer (smaller — 10 rows is a tall matrix).
function CSACoverageCell({ level }) {
  const styles = {
    2: { background: 'var(--accent)', border: '1.5px solid var(--ink)' },
    1: { background: 'var(--paper-edge)', border: '1.5px dashed var(--ink)' },
    0: { background: 'transparent', border: '1.5px solid var(--ink-faint)' },
  };
  return <span style={{
    display: 'inline-block', width: 10, height: 10, borderRadius: 2, ...styles[level]
  }} />;
}

function CSACoverageMatrix() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px repeat(22, 1fr)',
      border: '1.5px solid var(--ink)', background: 'var(--paper)',
    }}>
      <div style={{ padding: 8, background: 'var(--paper-edge)' }}>
        <span className="lbl" style={{ fontSize: 9 }}>CS A Unit ↓ · Lesson →</span>
      </div>
      {AP_LESSONS.map(([n, name]) => (
        <div key={n} style={{
          padding: '5px 2px', borderLeft: '1px solid var(--ink)',
          background: 'var(--paper-edge)', textAlign: 'center',
        }}>
          <div className="mono" style={{ fontSize: 10, fontWeight: 700 }}>{n}</div>
          <div className="mono compact-hide" style={{ fontSize: 7, color: 'var(--ink-soft)' }}>{name}</div>
        </div>
      ))}
      {CSA_UNITS.map(([code, name, sub]) => (
        <React.Fragment key={code}>
          <div style={{ padding: '6px 10px', borderTop: '1px solid var(--ink)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="mono" style={{ fontWeight: 700, fontSize: 12 }}>{code}</span>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{name}</span>
            </div>
            <div className="mono compact-hide" style={{ fontSize: 8, color: 'var(--ink-soft)', marginTop: 1 }}>{sub}</div>
          </div>
          {COVERAGE_CSA[code].map((level, i) => (
            <div key={`${code}-${i}`} style={{
              padding: 4, borderLeft: '1px solid var(--ink)', borderTop: '1px solid var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: (i >= 16 && i < 20) ? 0.4 : 1, // dim IOC lessons (17-20); 21-22 are AAP again
            }}>
              <CSACoverageCell level={level} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function CSAHeader({ kicker, title, sub, variant }) {
  return (
    <>
      <div style={{ padding: '28px 40px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mono lbl">{kicker}</span>
          <span className="chip" style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
            AP CS A
          </span>
          <span className="chip">Processing · Java primary</span>
          <span className="chip" style={{ borderStyle: 'dashed' }}>also p5.js · Canvas API</span>
        </div>
        <h1 className="title" style={{ fontSize: 42, lineHeight: 1, marginTop: 8 }}>{title}</h1>
        {sub && <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>{sub}</div>}
      </div>
      <CornerMark>{variant}</CornerMark>
    </>
  );
}

// ── A · Matrix-first ─────────────────────────────────────────────
function APCSAMatrix() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <CSAHeader
        kicker="for teachers"
        title={<>Where CS Canvas fits in <em style={{ color: 'var(--accent)' }}>AP CS A.</em></>}
        sub="ten units, twenty-two lessons. processing (java) is the primary column here — full course coverage."
        variant="variant A · the coverage matrix"
      />

      <div style={{ padding: '14px 40px 6px' }}>
        <CoverageLegend />
      </div>

      <div style={{ padding: '12px 40px 6px' }}>
        <CSACoverageMatrix />
      </div>

      <div style={{ padding: '6px 40px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="hand" style={{ fontSize: 20, color: 'var(--accent)' }}>↑ read the rows:</span>
        <span style={{ fontSize: 12 }}>
          All 10 units covered. <b>22 · ArrayList in Action</b> handles U7. <b>21 · Recursion as Fractals</b> handles U10.
          The IOC lessons (17–20) fall outside the CS A scope (dimmed in the matrix).
        </span>
      </div>

      <SectionRule kicker="the killer feature" title="Image data as a 2D array (Unit 8)" />
      <div style={{ padding: '0 40px 18px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div className="box-rough" style={{ padding: 14, borderColor: 'var(--accent)',
              boxShadow: '3px 4px 0 var(--accent)' }}>
          <span className="hand" style={{ fontSize: 22, color: 'var(--accent)' }}>color[][] pixels = …</span>
          <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
            Pixels as <span className="mono">int[][]</span> is the most concrete teaching demo we know for the 2D array FRQ.
            Students can see — literally — what <span className="mono">pixels[r][c]</span> means.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <span className="pill">11 Pixels</span>
            <span className="pill">13 Binary as Pixels</span>
            <span className="pill">15 Histograms</span>
          </div>
        </div>
        <div className="box" style={{ padding: 14 }}>
          <span className="lbl">FRQ practice this unlocks</span>
          <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, lineHeight: 1.5 }}>
            <li>row / column traversal</li>
            <li>neighbour-cell operations (blur, edge-detect)</li>
            <li>boundary-condition handling</li>
            <li>method-on-2D-array signatures</li>
          </ul>
        </div>
      </div>

      <SectionRule kicker="the closers" title="Two lessons that handle the FRQ-critical units" />
      <div style={{ padding: '0 40px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="box-rough" style={{ padding: 14, borderColor: 'var(--accent)', boxShadow: '2px 3px 0 var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 14 }}>U7</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>ArrayList</span>
            <span className="chip" style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)', fontSize: 9 }}>22 · ArrayList in Action</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink)', marginTop: 6 }}>
            A swarm of particles that join and leave a dynamic list. <span className="mono">add</span>, <span className="mono">remove</span>, traversal, generics — all visible on the canvas.
          </div>
        </div>
        <div className="box-rough" style={{ padding: 14, borderColor: 'var(--accent)', boxShadow: '2px 3px 0 var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 14 }}>U10</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Recursion</span>
            <span className="chip" style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)', fontSize: 9 }}>21 · Recursion as Fractals</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink)', marginTop: 6 }}>
            Trees, spirals, Koch snowflakes — base case + recursive case made literal. Students see what call-stack depth means.
          </div>
        </div>
      </div>

      <SiteFooter note="for AP CS A teachers · Processing (Java) primary" />
    </WFFrame>
  );
}

// ── B · Pacing across the year ───────────────────────────────────
function CSAYearStrip() {
  // 36-week AP CS A year, by Unit. CS Canvas lessons highlighted in accent.
  const bands = [
    [2,  'U1',  'Primitives',     true],
    [2,  'U2',  'Using Objects',  true],
    [2,  'U3',  'if / boolean',   true],
    [3,  'U4',  'Iteration',      true],
    [4,  'U5',  'Writing Classes',true],
    [3,  'U6',  'Array',          true],
    [2,  'U7',  'ArrayList',      true],
    [2,  'U8',  '2D Array',       true],
    [3,  'U9',  'Inheritance',    true],
    [2,  'U10', 'Recursion',      true],
    [11, 'FRQ', 'FRQ prep · review · exam', false],
  ];
  return (
    <div>
      <div style={{ display: 'flex', height: 60, border: '1.5px solid var(--ink)' }}>
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
          ← CS Canvas covers all 10 units →
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>week 36</span>
      </div>
    </div>
  );
}

function FRQRecipes() {
  // Free-response prep instead of CSP's Create PT.
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {[
        ['Method writing',          '07 Functions · 09 Objects',
         'design a method, write it, document params and return'],
        ['Class design',            '09 Objects · 10 State Machines',
         'fields, constructors, methods, encapsulation'],
        ['Array / ArrayList',       '08 Arrays · (22 ArrayList ↗)',
         'traversal, modify, find, count'],
        ['2D Array',                '11 Pixels · 13 Binary · 15 Histograms',
         'row / column / neighbour patterns'],
      ].map(([title, lessons, blurb]) => (
        <div key={title} className="box-rough" style={{ padding: 12 }}>
          <span className="hand" style={{ fontSize: 18, color: 'var(--accent)' }}>FRQ</span>
          <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{title}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4 }}>{lessons}</div>
          <div style={{ fontSize: 11, lineHeight: 1.4, marginTop: 6 }}>{blurb}</div>
          <span className="pill" style={{ marginTop: 8, fontSize: 10 }}>see practice set →</span>
        </div>
      ))}
    </div>
  );
}

function APCSACalendar() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <CSAHeader
        kicker="for teachers · pacing"
        title={<>A full year in <em style={{ color: 'var(--accent)' }}>Processing (Java)</em>.</>}
        sub="all ten CS A units covered. 22 lessons across the year, FRQ-aligned throughout."
        variant="variant B · the pacing strip"
      />

      <div style={{ padding: '20px 40px 8px' }}>
        <CSAYearStrip />
      </div>

      <SectionRule kicker="FRQ-first" title="Free-response practice — by recipe" />
      <div style={{ padding: '0 40px 18px' }}>
        <FRQRecipes />
      </div>

      <SectionRule kicker="exam prep" title="The last stretch — FRQ + MCQ practice" />
      <div style={{ padding: '0 40px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          ['Released MCQs', '~6 weeks',
           '40 multiple-choice format · College Board released items, weekly sets'],
          ['Released FRQs', '~4 weeks',
           'four FRQ format · timed practice with rubric calibration'],
          ['Mock exam',     '~1 week',
           'full timed practice exam · debrief + targeted review'],
        ].map(([title, time, blurb]) => (
          <div key={title} className="box-dashed" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{title}</div>
              <span className="lbl" style={{ fontSize: 9 }}>{time}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.4 }}>{blurb}</div>
          </div>
        ))}
      </div>

      <SiteFooter note="for AP CS A teachers · 36-week pacing" />
    </WFFrame>
  );
}

// ── C · Honest gaps ──────────────────────────────────────────────
function CSAUnitItem({ code, name, level, detail, comingLesson }) {
  const conf = {
    full:    { label: 'full coverage',    bg: 'var(--accent)',     fg: '#fff' },
    partial: { label: 'partial',          bg: 'var(--paper-edge)', fg: 'var(--ink)' },
    none:    { label: 'not covered',      bg: 'transparent',       fg: 'var(--ink-soft)' },
  }[level] || {};
  return (
    <div style={{ padding: '8px 0', borderBottom: '1px dashed var(--ink-faint)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="mono" style={{
            fontWeight: 700, fontSize: 12, background: conf.bg, color: conf.fg,
            padding: '1px 5px', border: '1px solid var(--ink)'
          }}>{code}</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
        </div>
        <span className="lbl" style={{ fontSize: 9 }}>
          {comingLesson ? `coming · ${comingLesson}` : conf.label}
        </span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 3 }}>{detail}</div>
    </div>
  );
}

function APCSAGaps() {
  const t = useWf();
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <CSAHeader
        kicker="for teachers · full course coverage"
        title={<>All ten CS A units. <em style={{ color: 'var(--accent)' }}>Every one.</em></>}
        sub="22 lessons, 10 units, every FRQ type. here's how the coverage breaks down."
        variant="variant C · honest gaps"
      />

      <div style={{ padding: '20px 40px 12px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="box-rough" style={{
          padding: 16, borderColor: 'var(--accent)', boxShadow: '3px 4px 0 var(--accent)'
        }}>
          <span className="hand" style={{ fontSize: 26, color: 'var(--accent)' }}>what we teach ✓</span>
          <div style={{ marginTop: 10 }}>
            <CSAUnitItem code="U1" name="Primitive Types"             level="full"
              detail="01 Coordinates, 02 Color — numbers as the substrate of every sketch" />
            <CSAUnitItem code="U2" name="Using Objects"               level="full"
              detail="04 Mouse (PVector), 09 Objects, 10 State — method calls, references, null safety" />
            <CSAUnitItem code="U3" name="Boolean Expressions & if"    level="full"
              detail="05 Conditionals — direct alignment with the AP CS A unit" />
            <CSAUnitItem code="U4" name="Iteration"                   level="full"
              detail="03 Draw Loop, 06 For Loops — while, for, accumulator patterns" />
            <CSAUnitItem code="U5" name="Writing Classes"             level="full"
              detail="07 Functions, 09 Objects, 10 State — methods, constructors, encapsulation" />
            <CSAUnitItem code="U6" name="Array"                       level="full"
              detail="08 Arrays — traversal, modify, return-array methods" />
            <CSAUnitItem code="U8" name="2D Array"                    level="full"
              detail="11 Pixels, 13 Binary, 15 Histograms — image data is the killer 2D-array demo" />
            <CSAUnitItem code="U9" name="Inheritance"                 level="partial"
              detail="09 Objects, 10 State — extends + polymorphism present but not deep yet" />
            <CSAUnitItem code="U7"  name="ArrayList"                    level="full"
              detail="22 · ArrayList in Action — particles joining + leaving a dynamic list. add/remove/traverse, generics, FRQ-aligned" />
            <CSAUnitItem code="U10" name="Recursion"                    level="full"
              detail="21 · Recursion as Fractals — base case + recursive case made literal through trees, spirals, Koch snowflakes" />
          </div>
        </div>
        <div className="box" style={{ padding: 16 }}>
          <span className="hand" style={{ fontSize: 22, color: 'var(--ink-soft)' }}>what we don't —</span>
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
            nothing. all ten units are addressed by the curriculum.
          </div>
          <div className="lbl" style={{ marginTop: 14 }}>caveat</div>
          <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.5 }}>
            U9 Inheritance is the shallowest — covered through 09 Objects + 10 State. If your students need deep
            polymorphism practice, supplement with 2–3 of your own examples.
          </div>
        </div>
      </div>

      <SectionRule kicker="appendix" title="The detailed coverage map" />
      <div style={{ padding: '0 40px 8px' }}>
        <CSACoverageMatrix />
      </div>
      <div style={{ padding: '10px 40px 24px' }}>
        <CoverageLegend />
      </div>

      <SiteFooter note="for AP CS A teachers" />
    </WFFrame>
  );
}

// ── D · Teacher FAQ ──────────────────────────────────────────────
function APCSAFaq() {
  const t = useWf();
  const qa = [
    ['Can I use this for my whole AP CS A course?',
     "Yes. We cover all 10 units across 22 lessons (~25 weeks of curriculum) with the remaining year-time for FRQ + MCQ practice and a mock exam. U7 ArrayList and U10 Recursion are explicitly handled by lessons 21 and 22."],
    ["What's the language story for CS A?",
     "Processing (Java) is the primary column for CS A. Same Java syntax students see on the exam, runs in the Processing IDE most CS A teachers already use. p5.js and Canvas API are still there if you want to show the same idea in JS."],
    ['How do students get FRQ practice?',
     "Each lesson surfaces an FRQ-style assessment moment matching one of the four FRQ types (method, class design, array/ArrayList, 2D array). Image-data lessons in particular generate authentic 2D-array FRQs."],
    ['Does the visual layer help or distract?',
     "Helps. Seeing what \"pixels[r][c]\" means makes the 2D-array unit click for students who hit a wall with abstract grid examples. Same for inheritance (Shape → Circle → Rectangle on screen)."],
    ['What about the AP CS A exam pseudocode?',
     "Java IS the exam pseudocode for CS A (unlike CSP). Processing's syntax is the same Java students will see — no translation layer needed."],
    ['How does this compare to CSP coverage?',
     "CSP gets 4 of 5 Big Ideas (~24 weeks) — broad CS literacy. CS A gets 10 of 10 Units (~25 weeks) — full technical Java coverage. Both run from the same 22 lessons, framed differently for each audience."],
  ];
  return (
    <WFFrame density={t.density}>
      <SiteNav active="teachers" />
      <CornerMark>variant D · CS A teacher FAQ</CornerMark>

      <div style={{ padding: '28px 40px 18px', display: 'grid',
                    gridTemplateColumns: '1.6fr 1fr', gap: 30 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono lbl">for teachers</span>
            <span className="chip" style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
              AP CS A
            </span>
            <span className="chip">Processing · Java primary</span>
          </div>
          <h1 className="title" style={{ fontSize: 42, lineHeight: 1, marginTop: 8 }}>
            Six questions CS A teachers ask.
          </h1>
          <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6 }}>
            answered straight. java is the first-class language here.
          </div>
        </div>
        <div className="box-rough" style={{ padding: 14 }}>
          <span className="lbl">at a glance</span>
          <Stat label="fits into" value="full year · ~25 weeks of curriculum" />
          <Stat label="units covered" value="10 of 10 — all units" />
          <Stat label="lessons" value="22 concepts · ~30 min each" />
          <Stat label="primary language" value="Processing · Java" />
          <Stat label="secondary"        value="p5.js · Canvas API · 'same idea in JS'" />
          <Stat label="exam alignment"   value="Java pseudocode = Processing syntax" />
        </div>
      </div>

      <div style={{ padding: '0 40px 18px' }}>
        {qa.map(([q, a], i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: '1px dashed var(--ink-faint)' }}>
            <div className="hand" style={{ fontSize: 22, color: 'var(--accent)', marginBottom: 6 }}>{q}</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink)', maxWidth: 880 }}>{a}</div>
          </div>
        ))}
      </div>

      <SectionRule kicker="for reference" title="The CS A coverage matrix" />
      <div style={{ padding: '0 40px 8px' }}>
        <CSACoverageMatrix />
      </div>
      <div style={{ padding: '10px 40px 24px' }}>
        <CoverageLegend />
      </div>

      <SiteFooter note="for AP CS A teachers" />
    </WFFrame>
  );
}

Object.assign(window, {
  APCSAMatrix, APCSACalendar, APCSAGaps, APCSAFaq,
  CSA_UNITS, COVERAGE_CSA,
  CSACoverageCell, CSACoverageMatrix, CSAUnitItem, CSAYearStrip, FRQRecipes, CSAHeader,
});
