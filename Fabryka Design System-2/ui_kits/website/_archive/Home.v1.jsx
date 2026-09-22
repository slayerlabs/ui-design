const { MetricReadout, ProductionPlate, MachineLog, FigureFrame, SectionMarker, Button, Tag, Icon, StatusBadge, SpecTable } = window.FabrykaDesignSystem_ec938d;

const PAGE = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" };

function Home({ setView }) {
  return (
    <main>
      <section style={{ ...PAGE, paddingTop: 40, paddingBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "3px solid var(--rule)", paddingTop: 10 }}>
          <span className="f-label">Open model factory — production 01</span>
          <span className="f-label">§00 — Warsaw / 2026</span>
        </div>
        <h1 style={{ fontSize: 132, marginTop: 28, maxWidth: "16ch" }}>We turn GPUs<br />into intelligence<span style={{ color: "var(--red)" }}>.</span></h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, marginTop: 40, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "52ch" }}>
            <p style={{ fontSize: 19 }}>Open-weight inference, routing, measurement and applied research. Named machines in Warsaw, measured output, visible provenance.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="primary" iconRight={<Icon name="arrow-right" size={13} />}>Read the docs</Button>
              <Button variant="secondary" onClick={() => setView("production")}>Current production</Button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              <Tag tone="carbon">OpenAI compatible</Tag><Tag>Open weights</Tag><Tag>EU / Warsaw</Tag><Tag tone="outlineRed">Measured</Tag>
            </div>
          </div>
          <ProductionPlate title="PRODUCTION PLATE" serial="F-00482" status="live" tested="03 SEP 2026"
            rows={[{ k: "Model", v: "Qwen3.8 27B" }, { k: "Route", v: "agents" }, { k: "Machine", v: "2 × RTX 3090" }, { k: "Quantization", v: "AWQ" }, { k: "Context", v: "131,072" }, { k: "Output", v: "71.4 tok/s", accent: true }, { k: "Cost", v: "0.21 PLN / 1M" }]} />
        </div>
      </section>

      <section data-theme="carbon" style={{ background: "var(--carbon)", color: "var(--paper)", padding: "56px 0" }}>
        <div style={PAGE}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid rgba(241,239,232,.28)", paddingTop: 12 }}>
            <span className="f-label" style={{ color: "var(--paper)" }}>Current production</span>
            <StatusBadge state="live" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 28 }}>
            <MetricReadout value="04" unit="models" label="In production" size="lg" />
            <MetricReadout value="82.7" unit="tok/s" label="Decode mean" size="lg" accent />
            <MetricReadout value="41.2M" unit="tokens" label="Last 30 days" size="lg" />
            <MetricReadout value="99.94" unit="%" label="Uptime 30d" size="lg" />
          </div>
        </div>
      </section>

      <section style={{ ...PAGE, paddingTop: 56, paddingBottom: 56 }}>
        <FigureFrame figure="FIG. 01" caption="Machine hall F-WAW-002" annotations={["NVIDIA RTX 3090 × 8", "192 GB VRAM", "Photographed 2026-09-03"]} ratio="16 / 6" />
      </section>

      <section style={{ ...PAGE, paddingBottom: 72, display: "flex", flexDirection: "column", gap: 44 }}>
        {[["01", "Production", "Inference, routing and the API. Open weights served on known hardware with published economics.", "production"],
          ["02", "Laboratory", "Quantization, post-training and experiments. Every change is an experiment with a number.", "laboratory"],
          ["03", "Measurement", "CodeSOTA measures models — including ours. Suites, methodology and raw results in public.", "codesota"]].map(([n, t, d, v]) => (
          <div key={n}>
            <SectionMarker number={n} title={t} meta={n === "03" ? "A Fabryka project" : "Warsaw"} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 18, alignItems: "start" }}>
              <p style={{ fontSize: 19, maxWidth: "46ch" }}>{d}</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="secondary" size="sm" onClick={() => setView(v)} iconRight={<Icon name="arrow-right" size={12} />}>Open {t.toLowerCase()}</Button>
              </div>
            </div>
          </div>
        ))}
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

Object.assign(window, { Home, PAGE });
