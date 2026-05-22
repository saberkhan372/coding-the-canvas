// Shared sketchy wireframe primitives.
// All components are exposed on window for cross-file Babel scope.

const wfTweaksCtx = React.createContext({
  siteName: 'CS Canvas',
  accent: '#d96a3d',
  showCanvasAPI: true,
  showProcessing: false,
  density: 'spacious',
  ccFest: true,
});
const useWf = () => React.useContext(wfTweaksCtx);

// ── Sketchy primitives ────────────────────────────────────────────
function WFFrame({ children, density, style }) {
  // Root for an artboard's sketched page. Applies density class.
  return (
    <div className={`wf ${density === 'compact' ? 'compact' : ''}`} style={style}>
      {children}
    </div>
  );
}

function CornerMark({ children }) {
  return <div className="corner-mark">{children}</div>;
}

function SiteNav({ active = 'home', onNav }) {
  const t = useWf();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', borderBottom: '1.5px solid var(--ink)', background: 'var(--paper)'
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="hand" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{t.siteName}</span>
        <span className="lbl" style={{ marginLeft: 6 }}>v0 · sketch</span>
      </div>
      <div style={{ display: 'flex', gap: 18 }}>
        {['concepts', 'sections', 'languages', 'browse', 'teachers', 'about'].map(k => (
          <span key={k} className="nav-link" style={{
            fontWeight: active === k ? 700 : 400,
            color: active === k ? 'var(--ink)' : 'var(--ink-soft)',
            borderBottom: active === k ? '2px solid var(--accent)' : '2px solid transparent',
            paddingBottom: 2,
          }}>{k}</span>
        ))}
      </div>
    </div>
  );
}

function SiteFooter({ note }) {
  const t = useWf();
  return (
    <div style={{
      borderTop: '1.5px solid var(--ink)', padding: '14px 28px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 11, color: 'var(--ink-soft)'
    }}>
      <span>{t.siteName} · canvas as a way to learn CS</span>
      <span>{note || 'p5.js · Canvas API · Processing (Java)'}</span>
    </div>
  );
}

// A faux line of text — for placeholder copy.
function Scribble({ w = '100%', h = 8, dim = false }) {
  return <div className="scribble" style={{ width: w, height: h, opacity: dim ? 0.4 : 0.82 }} />;
}

// A block of N scribble lines.
function Lines({ n = 3, widths }) {
  const ws = widths || Array.from({ length: n }, (_, i) => `${85 - i * 10}%`);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {ws.slice(0, n).map((w, i) => <Scribble key={i} w={w} h={6} />)}
    </div>
  );
}

// Faux mini canvas (for showing the live sketch).
function MiniCanvas({ kind = 'grid', label, height = 160, style }) {
  return (
    <div className="canvas-stage" style={{ height, ...style }}>
      <CanvasGuts kind={kind} />
      {label && <div className="lbl" style={{
        position: 'absolute', bottom: 6, left: 8, zIndex: 2, background: 'rgba(255,255,255,.7)',
        padding: '1px 6px', borderRadius: 2,
      }}>{label}</div>}
    </div>
  );
}

function CanvasGuts({ kind }) {
  // SVG illustrations that suggest what a p5 canvas would show.
  if (kind === 'grid') {
    const dots = [];
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) {
      const x = 30 + c * 30, y = 25 + r * 22;
      const s = 4 + ((r + c) % 4) * 1.2;
      dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={s} fill="var(--ink)" opacity={0.65} />);
    }
    return <svg viewBox="0 0 280 170" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{dots}</svg>;
  }
  if (kind === 'circle') {
    return <svg viewBox="0 0 280 170" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <circle cx="140" cy="85" r="48" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="140" cy="85" r="6" fill="var(--accent)" />
    </svg>;
  }
  if (kind === 'wave') {
    let d = 'M 0 100 ';
    for (let x = 0; x <= 280; x += 4) d += `L ${x} ${85 + Math.sin(x / 22) * 35} `;
    return <svg viewBox="0 0 280 170" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="2" />
    </svg>;
  }
  if (kind === 'stripes') {
    const lines = [];
    for (let i = 0; i < 10; i++)
      lines.push(<line key={i} x1={20 + i * 28} y1={20} x2={20 + i * 28} y2={150}
        stroke="var(--ink)" strokeWidth={1 + (i % 3)} opacity={0.7} />);
    return <svg viewBox="0 0 280 170" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{lines}</svg>;
  }
  if (kind === 'particles') {
    const dots = [];
    for (let i = 0; i < 24; i++) {
      const x = 20 + (i * 53) % 260, y = 15 + (i * 31) % 145;
      dots.push(<circle key={i} cx={x} cy={y} r={3 + (i % 4)} fill="var(--ink)" opacity={0.55} />);
    }
    return <svg viewBox="0 0 280 170" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{dots}</svg>;
  }
  return null;
}

// Fake code panel: a window of "code lines" with a language label.
function CodePanel({ lang = 'p5.js', height = 200, lines = 10, accent, label, style }) {
  // pattern of indentation/keywords to vary the look
  const rows = [];
  const tmpl = [
    [0, false], [0, true], [1, false], [1, true], [2, false], [1, false], [0, true],
    [1, false], [2, true], [1, false], [2, false], [1, true], [0, false], [1, true]
  ];
  for (let i = 0; i < lines; i++) {
    const [indent, kw] = tmpl[i % tmpl.length];
    const w = 30 + ((i * 17) % 55);
    rows.push(
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 14 }}>
        <span className="mono" style={{ color: 'var(--ink-faint)', fontSize: 9, width: 14, textAlign: 'right' }}>{i + 1}</span>
        <div style={{ width: indent * 14 }} />
        <div className={`code-line ${kw ? 'kw' : ''}`} style={{ width: `${w}%` }} />
      </div>
    );
  }
  return (
    <div className="box" style={{ background: '#fffdf7', display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '6px 10px', borderBottom: '1px solid var(--ink)', background: 'var(--paper-edge)',
      }}>
        <span className="mono" style={{ fontSize: 11, fontWeight: 600 }}>{lang}</span>
        <span className="lbl">{label || 'code'}</span>
      </div>
      <div style={{ padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 6, height: height, overflow: 'hidden' }}>
        {rows}
      </div>
    </div>
  );
}

// A wide divider with a small title — used between sections.
function SectionRule({ kicker, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 4, marginBottom: 10 }}>
      <span className="hand" style={{ fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>{kicker}</span>
      <h2 className="section-title" style={{ fontSize: 22 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: 'var(--ink)', marginBottom: 8 }} />
    </div>
  );
}

// Pencil-y arrow from a→b coords inside a relative container.
function Arrow({ from, to, dashed, label }) {
  const [x1, y1] = from; const [x2, y2] = to;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 14;
  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
        className="arrow" strokeDasharray={dashed ? '4 4' : 'none'} />
      <polygon points={`${x2},${y2} ${x2 - 8},${y2 - 4} ${x2 - 8},${y2 + 4}`} fill="var(--accent)" />
      {label && <text x={mx} y={my - 4} textAnchor="middle" className="hand"
        style={{ fontFamily: 'var(--hand)', fontSize: 16, fill: 'var(--accent)' }}>{label}</text>}
    </svg>
  );
}

// CC Fest origin badge — shows only when `ccFest` tweak is on.
function CCFestBadge({ size = 'sm' }) {
  const t = useWf();
  if (!t.ccFest) return null;
  return (
    <span className="chip" style={{
      borderStyle: 'dashed', fontSize: size === 'lg' ? 12 : 10, padding: size === 'lg' ? '4px 10px' : '2px 8px'
    }}>
      <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%' }} />
      born at CC Fest
    </span>
  );
}

Object.assign(window, {
  wfTweaksCtx, useWf, WFFrame, CornerMark, SiteNav, SiteFooter,
  Scribble, Lines, MiniCanvas, CanvasGuts, CodePanel, SectionRule, Arrow, CCFestBadge,
});
