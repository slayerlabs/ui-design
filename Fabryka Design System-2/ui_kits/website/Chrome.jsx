const { Wordmark, Button, StatusBadge, Icon } = window.FabrykaDesignSystem_ec938d;

function TopRail({ view, setView }) {
  const items = [["home", "Fabryka"], ["production", "Production"], ["laboratory", "Laboratory"], ["codesota", "CodeSOTA"]];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setView("home"); }} style={{ border: 0, textDecoration: "none", color: "var(--carbon)" }}><Wordmark size={22} /></a>
          <nav style={{ display: "flex", gap: 22 }}>
            {items.slice(1).map(([k, l]) => (
              <a key={k} href="#" onClick={(e) => { e.preventDefault(); setView(k); }}
                style={{ border: 0, textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: view === k ? "var(--red)" : "var(--text-muted)" }}>{l}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="f-label">Warsaw / 2026</span>
          <StatusBadge state="live" />
          <Button size="sm" variant="secondary" iconRight={<Icon name="arrow-right" size={12} />}>Docs</Button>
        </div>
      </div>
    </header>
  );
}

function PageFooter() {
  return (
    <footer data-theme="carbon" style={{ background: "var(--carbon)", color: "var(--paper)", borderTop: "3px solid var(--rule)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Wordmark size={34} tone="inverse" />
          <div className="f-label" style={{ color: "var(--grey)", lineHeight: 1.9 }}>Open model factory<br />Warsaw · Poland · est. 2026<br />52°13′N 21°00′E</div>
        </div>
        {[["Production", ["Inference API", "Routing", "Pricing", "Status"]], ["Laboratory", ["Models", "Experiments", "Quantization", "Papers"]], ["Measurement", ["CodeSOTA", "Suites", "Methodology", "Slayer archive"]]].map(([h, links]) => (
          <div key={h} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="f-label" style={{ color: "var(--paper)" }}>{h}</div>
            {links.map((l) => <a key={l} href="#" style={{ border: 0, textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--grey)" }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(241,239,232,.2)", padding: "12px 40px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span className="f-label" style={{ color: "var(--grey-dark)" }}>Fabryka sp. z o.o. — formerly Slayer Lab</span>
          <span className="f-label" style={{ color: "var(--grey-dark)" }}>More intelligence per GPU.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { TopRail, PageFooter });
