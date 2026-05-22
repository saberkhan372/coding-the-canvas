// Root app — wires Tweaks + DesignCanvas + every wireframe screen.

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "siteName": "CS Canvas",
  "accent": "#d96a3d",
  "showCanvasAPI": true,
  "showProcessing": true,
  "density": "spacious",
  "ccFest": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);

  // Apply the chosen accent at the root.
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t.accent]);

  // Pre-build the artboards so we can pass `tweak context` down.
  return (
    <wfTweaksCtx.Provider value={t}>
      <DesignCanvas>
        {/* ─── Homepage ─── */}
        <DCSection id="home" title="Homepage — CS Canvas"
          subtitle="Linear curriculum 1 → 22, seven movements, plus a dedicated 'born from CC Fest' section.">
          <DCArtboard id="home-spine"   label="A · the spine"     width={1100} height={2100}><HomeSpine /></DCArtboard>
          <DCArtboard id="home-ribbon"  label="B · the ribbon"    width={1100} height={1500}><HomeRibbon /></DCArtboard>
          <DCArtboard id="home-toc"     label="C · the syllabus"  width={1100} height={1800}><HomeNotebook /></DCArtboard>
          <DCArtboard id="home-progress" label="D · progress rail" width={1100} height={2000}><HomeProgress /></DCArtboard>
        </DCSection>

        {/* ─── Concept page ─── */}
        <DCSection id="concept" title="Concept page — 06 · For Loops & Grids"
          subtitle="Same idea, expressed in p5.js and the raw Canvas API. Four ways to lay it out.">
          <DCArtboard id="con-tabs"  label="A · tabbed pane"       width={1100} height={1300}><ConceptTabs /></DCArtboard>
          <DCArtboard id="con-side"  label="B · side-by-side"      width={1100} height={1300}><ConceptSideBySide /></DCArtboard>
          <DCArtboard id="con-stack" label="C · stacked"           width={1100} height={1500}><ConceptStacked /></DCArtboard>
          <DCArtboard id="con-tog"   label="D · toggle, one pane"  width={1100} height={1300}><ConceptToggle /></DCArtboard>
        </DCSection>

        {/* ─── Language picker ─── */}
        <DCSection id="lang" title="Language picker — Choose Your Path"
          subtitle="p5.js front door · raw Canvas API under the hood · Processing as Java reference.">
          <DCArtboard id="lang-cards"  label="A · the doors"       width={1100} height={1200}><LangCards /></DCArtboard>
          <DCArtboard id="lang-matrix" label="B · comparison matrix" width={1100} height={1200}><LangMatrix /></DCArtboard>
          <DCArtboard id="lang-quiz"   label="C · the quiz"        width={1100} height={1100}><LangWizard /></DCArtboard>
          <DCArtboard id="lang-hello"  label="D · hello, canvas"   width={1100} height={1100}><LangHello /></DCArtboard>
        </DCSection>

        {/* ─── Section page ─── */}
        <DCSection id="section" title="Section page — Make Systems"
          subtitle="A mid-level page that groups 4–6 concepts under a movement.">
          <DCArtboard id="sec-linear" label="A · the long read"   width={1100} height={1500}><SectionLinear /></DCArtboard>
          <DCArtboard id="sec-grid"   label="B · card grid"       width={1100} height={1400}><SectionGrid /></DCArtboard>
          <DCArtboard id="sec-story"  label="C · storyboard"      width={1100} height={1100}><SectionStoryboard /></DCArtboard>
          <DCArtboard id="sec-side"   label="D · sidebar reader"  width={1100} height={1300}><SectionSidebar /></DCArtboard>
        </DCSection>

        {/* ─── Browse / Index ─── */}
        <DCSection id="browse" title="Browse — all 22 concepts, filterable"
          subtitle="Where teachers and curious devs come to scan everything at once.">
          <DCArtboard id="brw-grid"   label="A · chips + grid"    width={1100} height={1300}><BrowseGrid /></DCArtboard>
          <DCArtboard id="brw-table"  label="B · spreadsheet"     width={1100} height={1300}><BrowseTable /></DCArtboard>
          <DCArtboard id="brw-facet"  label="C · facets + dense"  width={1100} height={1300}><BrowseFacets /></DCArtboard>
          <DCArtboard id="brw-search" label="D · type to find"    width={1100} height={1300}><BrowseSearch /></DCArtboard>
        </DCSection>

        {/* ─── AP coverage / Teachers ─── */}
        <DCSection id="ap" title="AP CS Principles coverage — for teachers"
          subtitle="Honest mapping onto AP CSP. Strong on AAP, DAT, IOC; CRD threaded across every lesson; CSN remains bring-your-own.">
          <DCArtboard id="ap-matrix"   label="A · matrix-first"  width={1100} height={1500}><APMatrix /></DCArtboard>
          <DCArtboard id="ap-calendar" label="B · pacing strip"  width={1100} height={1400}><APCalendar /></DCArtboard>
          <DCArtboard id="ap-gaps"     label="C · honest gaps"   width={1100} height={1500}><APGapFirst /></DCArtboard>
          <DCArtboard id="ap-faq"      label="D · teacher FAQ"   width={1100} height={1500}><APFaq /></DCArtboard>
        </DCSection>

        {/* ─── AP CS A coverage (Processing/Java track) ─── */}
        <DCSection id="apcsa" title="AP CS A coverage — for teachers"
          subtitle="Processing (Java) as the primary column. All 10 Units covered across 22 lessons.">
          <DCArtboard id="apcsa-matrix"   label="A · matrix-first"  width={1100} height={1600}><APCSAMatrix /></DCArtboard>
          <DCArtboard id="apcsa-calendar" label="B · pacing strip"  width={1100} height={1300}><APCSACalendar /></DCArtboard>
          <DCArtboard id="apcsa-gaps"     label="C · honest gaps"   width={1100} height={1700}><APCSAGaps /></DCArtboard>
          <DCArtboard id="apcsa-faq"      label="D · teacher FAQ"   width={1100} height={1600}><APCSAFaq /></DCArtboard>
        </DCSection>

        <DCPostIt top={-60} left={120} rotate={-3} width={260}>
          rough wireframes — sketchy on purpose. tweak the panel to change name, languages, density, accent.
        </DCPostIt>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakSelect label="Site name" value={t.siteName} onChange={(v) => setTweak('siteName', v)}
          options={['CS Canvas', 'Coding the Canvas', 'Canvas CS Atlas']} />
        <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak('accent', v)}
          options={['#d96a3d', '#2a6fdb', '#1f8a5b', '#7a4ed1']} />

        <TweakSection label="Languages shown" />
        <TweakToggle label="Show Canvas API" value={t.showCanvasAPI}
          onChange={(v) => setTweak('showCanvasAPI', v)} />
        <TweakToggle label="Show Processing (Java, read-only)" value={t.showProcessing}
          onChange={(v) => setTweak('showProcessing', v)} />

        <TweakSection label="Layout & framing" />
        <TweakRadio label="Density" value={t.density} onChange={(v) => setTweak('density', v)}
          options={['spacious', 'compact']} />
        <TweakToggle label="CC Fest framing" value={t.ccFest}
          onChange={(v) => setTweak('ccFest', v)} />
      </TweaksPanel>
    </wfTweaksCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
