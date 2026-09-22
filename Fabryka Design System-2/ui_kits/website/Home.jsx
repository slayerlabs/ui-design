const { MetricReadout, ProductionPlate, MachineLog, FigureFrame, SectionMarker, Button, Tag, Icon, StatusBadge, SpecTable, TestStamp } = window.FabrykaDesignSystem_ec938d;

const PAGE = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" };
const MONO = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase" };

/* Plate rail: the mono key/value run used inside every plate frame on the page. */
function PlateRows({ rows }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div key={r.k} style={{ display: "grid", gridTemplateColumns: "minmax(88px,42%) 1fr", gap: 12, padding: "7px 14px", borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--rule-faint)" }}>
          <span style={{ ...MONO, color: "var(--text-muted)" }}>{r.k}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: "var(--track-mono)", textAlign: "right", color: r.accent ? "var(--red)" : "inherit" }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

/* A framed plate: title rail + serial, everything on the page lives in one of these. */
function Frame({ title, serial, meta, children, tone, style, onClick }) {
  const carbon = tone === "carbon";
  return (
    <div onClick={onClick} data-theme={carbon ? "carbon" : undefined} style={{ border: "1.5px solid var(--rule)", background: carbon ? "var(--carbon)" : "var(--surface-raised)", color: carbon ? "var(--paper)" : "var(--text-body)", cursor: onClick ? "pointer" : undefined, ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "9px 14px", borderBottom: "1px solid var(--rule-soft)", background: "var(--plate-tint)" }}>
        <span style={{ ...MONO, fontSize: 12 }}>{title}</span>
        <span style={{ ...MONO, fontSize: 12, color: serial ? "var(--red)" : "var(--text-muted)" }}>{serial || meta}</span>
      </div>
      {children}
    </div>
  );
}

function Home({ setView }) {
  const sections = [
    { n: "01", t: "Production", v: "production", serial: "F-00482", rows: [{ k: "Lines", v: "04" }, { k: "Endpoint", v: "api.fabryka.ai/v1" }, { k: "Compatibility", v: "OpenAI" }, { k: "Served / 30d", v: "41.2M tok", accent: true }], status: "live" },
    { n: "02", t: "Laboratory", v: "laboratory", serial: "F-00521", rows: [{ k: "Experiments", v: "21 / 2026" }, { k: "Running", v: "01" }, { k: "Checkpoints", v: "03 public" }, { k: "Best delta", v: "+18.4% decode", accent: true }], status: "running" },
    { n: "03", t: "Measurement", v: "codesota", serial: "F-00104", rows: [{ k: "Project", v: "CodeSOTA" }, { k: "Suites", v: "06" }, { k: "Models rated", v: "48" }, { k: "Method", v: "Public", accent: true }], status: "pass" }
  ];
  return (
    <main className="f-grid">
      {/* Masthead: the plate IS the hero. */}
      <section style={{ ...PAGE, paddingTop: 32, paddingBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "3px solid var(--rule)", paddingTop: 10, paddingBottom: 14 }}>
          <span className="f-label">Fabryka — open model factory</span>
          <span className="f-label">Production 01 · Warsaw · 2026</span>
        </div>
        <Frame title="Production 01 — open model factory" serial="F-00482">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", alignItems: "stretch" }}>
            <div style={{ padding: "34px 32px 28px", borderRight: "1px solid var(--rule-soft)", display: "flex", flexDirection: "column", gap: 24 }}>
              <h1 style={{ fontSize: 108, maxWidth: "15ch" }}>We turn GPUs<br />into intelligence<span style={{ color: "var(--red)" }}>.</span></h1>
              <p style={{ fontSize: 19, maxWidth: "50ch" }}>Open-weight inference, routing, measurement and applied research. Named machines in Warsaw, measured output, visible provenance.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="primary" iconRight={<Icon name="arrow-right" size={13} />}>Read the docs</Button>
                <Button variant="secondary" onClick={() => setView("production")}>Current production</Button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag tone="carbon">OpenAI compatible</Tag><Tag>Open weights</Tag><Tag>EU / Warsaw</Tag><Tag tone="outlineRed">Measured</Tag>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "9px 14px", borderBottom: "1px solid var(--rule-soft)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ ...MONO, color: "var(--text-muted)" }}>Line 03 — live</span><StatusBadge state="live" />
              </div>
              <PlateRows rows={[{ k: "Model", v: "Qwen3.8 27B" }, { k: "Route", v: "agents" }, { k: "Machine", v: "2 × RTX 3090" }, { k: "Quantization", v: "AWQ" }, { k: "Context", v: "131,072" }, { k: "Output", v: "71.4 tok/s", accent: true }, { k: "Cost", v: "0.21 PLN / 1M" }]} />
              <div style={{ marginTop: "auto", borderTop: "1px solid var(--rule-soft)", padding: 14, display: "flex", justifyContent: "center" }}>
                <TestStamp code="F/WAW" number="0271" checks={[{ k: "Throughput", v: "Pass" }, { k: "Legal QA", v: "Pass" }, { k: "Drift 30d", v: "None" }]} style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </Frame>
      </section>

      {/* Measurement band — readouts as instrument panel, not stat cards. */}
      <section data-theme="carbon" className="f-grid" style={{ background: "var(--carbon)", color: "var(--paper)", padding: "44px 0", borderTop: "1.5px solid var(--rule)", borderBottom: "1.5px solid var(--rule)" }}>
        <div style={PAGE}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--rule-soft)", paddingBottom: 12 }}>
            <span className="f-label" style={{ color: "var(--paper)" }}>Instrument panel — 30-day mean</span>
            <span className="f-label">Read 03 SEP 2026 · 02:31 CET</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 4 }}>
            {[["A", "04", "models", "In production", false], ["B", "82.7", "tok/s", "Decode mean", true], ["C", "41.2M", "tokens", "Last 30 days", false], ["D", "99.94", "%", "Uptime 30d", false]].map(([ix, v, u, l, acc], i) => (
              <div key={ix} style={{ padding: "22px 24px 4px", borderLeft: i === 0 ? "none" : "1px solid var(--rule-soft)" }}>
                <div style={{ ...MONO, color: "var(--grey)", marginBottom: 14 }}>Datum {ix}</div>
                <MetricReadout value={v} unit={u} label={l} size="lg" accent={acc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...PAGE, paddingTop: 48, paddingBottom: 52 }}>
        <FigureFrame figure="FIG. 01" caption="Machine hall F-WAW-002" annotations={["NVIDIA RTX 3090 × 8", "192 GB VRAM", "Photographed 2026-09-03"]} ratio="16 / 6" />
      </section>

      {/* Divisions as plates — navigation is a plate rack. */}
      <section style={{ ...PAGE, paddingBottom: 64 }}>
        <SectionMarker number="00" title="Divisions" meta="Three plates, one factory" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 20 }}>
          {sections.map((s) => (
            <ProductionPlate key={s.n} title={"§" + s.n + " " + s.t} serial={s.serial} rows={s.rows} status={s.status} tested="03 SEP 2026" onClick={() => setView(s.v)} style={{ cursor: "pointer" }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 12 }}>
          {sections.map((s) => (
            <Button key={s.n} variant="secondary" size="sm" onClick={() => setView(s.v)} iconRight={<Icon name="arrow-right" size={12} />}>Open {s.t.toLowerCase()}</Button>
          ))}
        </div>
      </section>

      <section style={{ ...PAGE, paddingBottom: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
        <MachineLog title="Line 03 — live" lines={[{ k: "Model", v: "QWEN3.8-27B" }, { k: "Machine", v: "F-WAW-3090-04" }, { k: "Quant", v: "FP8" }, { k: "Batch", v: "24" }, { k: "Decode", v: "82.4 TOK/S", accent: true }, { k: "Status", v: "RUNNING", ok: true }, { k: "Updated", v: "02:31:08 CET" }]} />
        <SpecTable figure="TAB. 01" caption="Production lines — 30-day mean"
          columns={[{ key: "line", label: "Line" }, { key: "model", label: "Model" }, { key: "tok", label: "Tok/s" }, { key: "cost", label: "PLN / 1M" }]}
          rows={[{ line: "01", model: "Bielik 11B", tok: "138.0", cost: "0.09" }, { line: "02", model: "Llama 4 17B", tok: "104.2", cost: "0.17" }, { line: "03", model: "Qwen3.8 27B", tok: "82.4", cost: "0.21" }, { line: "04", model: "Mistral 24B", tok: "91.5", cost: "0.19" }]} />
      </section>
    </main>
  );
}

Object.assign(window, { Home, PAGE, PlateRows, Frame });
