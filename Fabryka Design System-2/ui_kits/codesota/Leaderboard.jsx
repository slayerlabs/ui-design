const { SectionMarker, SpecTable, TestStamp, Tabs, MetricReadout, StatusBadge, Tag, Button, Icon, MachineLog, Wordmark } = window.FabrykaDesignSystem_ec938d;

const CS_PAGE = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" };

const SUITES = {
  "Polish legal QA": [
    { model: "Qwen3.8 27B", org: "Fabryka", score: "71.4", tok: "82.4", cost: "0.21", state: "pass" },
    { model: "Llama 4 17B", org: "Fabryka", score: "68.9", tok: "104.2", cost: "0.17", state: "pass" },
    { model: "Bielik 11B", org: "SpeakLeash", score: "64.2", tok: "138.0", cost: "0.09", state: "pass" },
    { model: "Mistral 24B", org: "Mistral", score: "62.7", tok: "91.5", cost: "0.19", state: "pass" },
    { model: "Gemma 3 12B", org: "Google", score: "58.1", tok: "121.4", cost: "0.12", state: "pass" },
    { model: "Slayer 1B", org: "Fabryka lab", score: "31.8", tok: "412.0", cost: "0.01", state: "fail" }
  ],
  "Tool calling": [
    { model: "Llama 4 17B", org: "Fabryka", score: "88.2", tok: "104.2", cost: "0.17", state: "pass" },
    { model: "Qwen3.8 27B", org: "Fabryka", score: "86.7", tok: "82.4", cost: "0.21", state: "pass" },
    { model: "Mistral 24B", org: "Mistral", score: "81.0", tok: "91.5", cost: "0.19", state: "pass" },
    { model: "Bielik 11B", org: "SpeakLeash", score: "72.4", tok: "138.0", cost: "0.09", state: "warn" }
  ],
  "JSON conformance": [
    { model: "Qwen3.8 27B", org: "Fabryka", score: "99.1", tok: "82.4", cost: "0.21", state: "pass" },
    { model: "Bielik 11B", org: "SpeakLeash", score: "97.4", tok: "138.0", cost: "0.09", state: "pass" },
    { model: "Gemma 3 12B", org: "Google", score: "94.0", tok: "121.4", cost: "0.12", state: "pass" }
  ]
};

function CodeSOTA() {
  const names = Object.keys(SUITES);
  const [suite, setSuite] = React.useState(names[0]);
  const [detail, setDetail] = React.useState(null);
  const rows = SUITES[suite];
  return (
    <main style={{ paddingBottom: 80 }}>
      <div data-theme="carbon" style={{ background: "var(--carbon)", color: "var(--paper)", padding: "34px 0 30px" }}>
        <div style={CS_PAGE}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "66%", fontSize: 56, lineHeight: .85, textTransform: "uppercase", letterSpacing: "-.02em" }}>CodeSOTA</div>
              <div className="f-label" style={{ color: "var(--grey)", marginTop: 8 }}>Measurement by Fabryka. · Suites, methodology and raw results in public</div>
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              <Wordmark size={18} tone="inverse" />
              <span className="f-label" style={{ color: "var(--grey-dark)" }}>A Fabryka project</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 30, borderTop: "1px solid rgba(241,239,232,.28)", paddingTop: 18 }}>
            <MetricReadout value="12" unit="models" label="Measured" size="md" />
            <MetricReadout value="04" unit="suites" label="Active" size="md" />
            <MetricReadout value="0271" unit="tests" label="Run to date" size="md" accent />
            <MetricReadout value="100" unit="%" label="Reproducible" size="md" />
          </div>
        </div>
      </div>

      <div style={{ ...CS_PAGE, paddingTop: 40 }}>
        <SectionMarker number="03" title="Leaderboard" meta="Updated 03 SEP 2026 · 02:31 CET" />
        <div style={{ marginTop: 18 }}><Tabs tabs={names} value={suite} onChange={(s) => { setSuite(s); setDetail(null); }} /></div>

        <div style={{ display: "grid", gridTemplateColumns: detail ? "1fr 340px" : "1fr", gap: 40, marginTop: 26, alignItems: "start" }}>
          <div>
            <SpecTable figure={"TEST 0" + (271 - names.indexOf(suite))} caption={suite + " / " + rows.length + " models"}
              columns={[{ key: "rank", label: "#" }, { key: "model", label: "Model" }, { key: "org", label: "Provider" }, { key: "score", label: "Score" }, { key: "tok", label: "Tok/s" }, { key: "cost", label: "PLN / 1M" }, { key: "state", label: "Result", align: "right" }]}
              rows={rows.map((r, i) => ({
                rank: String(i + 1).padStart(2, "0"),
                model: <a href="#" onClick={(e) => { e.preventDefault(); setDetail(r); }} style={{ color: "var(--carbon)", borderBottom: "1px solid var(--rule-soft)" }}>{r.model}</a>,
                org: <span style={{ color: "var(--text-muted)" }}>{r.org}</span>,
                score: <span style={{ color: i === 0 ? "var(--red)" : "inherit" }}>{r.score}</span>,
                tok: r.tok, cost: r.cost, state: <StatusBadge state={r.state} showDot={false} />
              }))} />
            <div style={{ display: "flex", gap: 10, marginTop: 18, alignItems: "center" }}>
              <Button size="sm" variant="secondary" iconRight={<Icon name="download" size={12} />}>Raw results (JSON)</Button>
              <Button size="sm" variant="ghost">Methodology</Button>
              <span className="f-label">Click a model for its test plate</span>
            </div>
          </div>

          {detail && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <MachineLog title={detail.model} lines={[{ k: "Suite", v: suite.toUpperCase() }, { k: "Score", v: detail.score, accent: true }, { k: "Decode", v: detail.tok + " TOK/S" }, { k: "Cost", v: detail.cost + " PLN / 1M" }, { k: "Machine", v: "F-WAW-3090-04" }, { k: "Result", v: detail.state.toUpperCase(), ok: detail.state === "pass" }]} />
              <TestStamp code="F/WAW" number="0271" tone={detail.state === "pass" ? "red" : "carbon"}
                checks={[{ k: "Polish", v: detail.state === "fail" ? "FAIL" : "PASS" }, { k: "Tools", v: "PASS" }, { k: "JSON", v: "PASS" }, { k: "Latency", v: "84 MS" }]} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag tone="muted">{detail.org}</Tag><Tag>Open weights</Tag><Tag tone="outlineRed">Reproducible</Tag>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setDetail(null)}>Close plate</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { CodeSOTA, CS_PAGE });
