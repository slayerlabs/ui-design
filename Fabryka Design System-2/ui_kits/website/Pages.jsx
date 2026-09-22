const { SectionMarker, ProductionPlate, Tabs, SpecTable, Button, Tag, MachineLog, Input, Select, Switch, Dialog, MetricReadout, StatusBadge, IconButton, Icon } = window.FabrykaDesignSystem_ec938d;

function Production() {
  const [line, setLine] = React.useState("agents");
  const [deploy, setDeploy] = React.useState(false);
  const plates = {
    agents: { serial: "F-00482", rows: [{ k: "Model", v: "Qwen3.8 27B" }, { k: "Machine", v: "2 × RTX 3090" }, { k: "Quantization", v: "AWQ" }, { k: "Context", v: "131,072" }, { k: "Output", v: "71.4 tok/s", accent: true }, { k: "Cost", v: "0.21 PLN / 1M" }] },
    chat: { serial: "F-00477", rows: [{ k: "Model", v: "Bielik 11B" }, { k: "Machine", v: "1 × RTX 3090" }, { k: "Quantization", v: "FP8" }, { k: "Context", v: "32,768" }, { k: "Output", v: "138.0 tok/s", accent: true }, { k: "Cost", v: "0.09 PLN / 1M" }] },
    batch: { serial: "F-00461", rows: [{ k: "Model", v: "Mistral 24B" }, { k: "Machine", v: "2 × RTX 3090" }, { k: "Quantization", v: "INT4" }, { k: "Context", v: "65,536" }, { k: "Output", v: "91.5 tok/s", accent: true }, { k: "Cost", v: "0.19 PLN / 1M" }] }
  };
  const p = plates[line];
  return (
    <main className="f-grid" style={{ ...window.PAGE, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "3px solid var(--rule)", paddingTop: 10 }}>
        <span className="f-label">§01 Production — inference &amp; routing</span>
        <span className="f-label">OpenAI compatible · api.fabryka.ai/v1</span>
      </div>
      <h1 style={{ fontSize: 88, marginTop: 24, maxWidth: "18ch" }}>More intelligence<br />per GPU<span style={{ color: "var(--red)" }}>.</span></h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 40, borderTop: "1px solid var(--rule)", paddingTop: 20 }}>
        <MetricReadout value="04" unit="lines" label="Production lines" size="md" />
        <MetricReadout value="41.2M" unit="tokens" label="Served / 30d" size="md" />
        <MetricReadout value="118" unit="ms" label="TTFT p50" size="md" accent />
        <MetricReadout value="99.94" unit="%" label="Uptime" size="md" />
      </div>

      <div style={{ marginTop: 56 }}>
        <SectionMarker number="01.1" title="Lines" meta="Select a line" />
        <div style={{ marginTop: 18 }}><Tabs tabs={[{ value: "agents", label: "Agents" }, { value: "chat", label: "Chat" }, { value: "batch", label: "Batch" }]} value={line} onChange={setLine} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 40, marginTop: 24, alignItems: "start" }}>
          <ProductionPlate title="PRODUCTION PLATE" serial={p.serial} rows={p.rows} status="live" tested="03 SEP 2026" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <MachineLog title={"Route " + line} lines={[{ k: "Endpoint", v: "POST /v1/chat/completions" }, { k: "Model id", v: "fabryka/" + line }, { k: "Stream", v: "SSE" }, { k: "Rate", v: "600 RPM" }, { k: "Status", v: "RUNNING", ok: true }]} />
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <Input label="Endpoint" defaultValue="https://api.fabryka.ai/v1" wrapStyle={{ flex: 1 }} />
              <IconButton icon="copy" label="Copy endpoint" />
              <Button variant="primary" onClick={() => setDeploy(true)}>Deploy model</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <SectionMarker number="01.2" title="Economics" meta="Published, per million tokens" />
        <div style={{ marginTop: 20 }}>
          <SpecTable figure="TAB. 02" caption="Price list — PLN per 1M tokens, September 2026"
            columns={[{ key: "model", label: "Model" }, { key: "line", label: "Line" }, { key: "quant", label: "Quant" }, { key: "inp", label: "Input" }, { key: "out", label: "Output" }, { key: "tok", label: "Tok/s" }, { key: "state", label: "State", align: "right" }]}
            rows={[
              { model: "Bielik 11B", line: "chat", quant: "FP8", inp: "0.05", out: "0.09", tok: "138.0", state: <StatusBadge state="live" /> },
              { model: "Llama 4 17B", line: "agents", quant: "AWQ", inp: "0.09", out: "0.17", tok: "104.2", state: <StatusBadge state="live" /> },
              { model: "Qwen3.8 27B", line: "agents", quant: "AWQ", inp: "0.11", out: "0.21", tok: "82.4", state: <StatusBadge state="live" /> },
              { model: "Mistral 24B", line: "batch", quant: "INT4", inp: "0.10", out: "0.19", tok: "91.5", state: <StatusBadge state="warn" /> },
              { model: "Slayer 1B", line: "lab", quant: "FP16", inp: "—", out: "—", tok: "412.0", state: <StatusBadge state="queued" /> }
            ]} />
        </div>
      </div>

      <Dialog open={deploy} title="Deploy model" docNumber="DOC 004" onClose={() => setDeploy(false)}
        footer={<><Button variant="secondary" size="sm" onClick={() => setDeploy(false)}>Cancel</Button><Button variant="primary" size="sm" onClick={() => setDeploy(false)}>Enter production</Button></>}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Model" defaultValue="qwen3.8-27b" />
          <Select label="Line" options={["agents", "chat", "batch"]} />
          <Select label="Quantization" options={["AWQ", "FP8", "INT4"]} />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Switch defaultChecked label="Autoscale" />
            <Tag tone="muted">2 × RTX 3090 available</Tag>
          </div>
        </div>
      </Dialog>
    </main>
  );
}

function Laboratory() {
  return (
    <main className="f-grid" style={{ ...window.PAGE, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "3px solid var(--rule)", paddingTop: 10 }}>
        <span className="f-label">§02 Laboratory — optimisation &amp; post-training</span>
        <span className="f-label">21 experiments / 2026</span>
      </div>
      <h1 style={{ fontSize: 88, marginTop: 24, maxWidth: "20ch" }}>Every change is<br />an experiment<span style={{ color: "var(--red)" }}>.</span></h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 44 }}>
        {[["021", "INT4 vs FP8 batching efficiency", "RUNNING", ["Machine F-WAW-3090-04", "Batch 1–64", "12 h elapsed"]],
          ["020", "Speculative decoding on 27B", "PASS", ["Draft: Slayer 1B", "+18.4% decode", "Shipped to line 03"]],
          ["019", "Polish tokenizer compaction", "PASS", ["−7.2% tokens / doc", "No quality delta", "Merged"]],
          ["018", "AWQ recalibration, 27B", "FAIL", ["−2.1 pts legal QA", "Reverted", "Notes published"]]].map(([n, t, s, meta]) => (
          <div key={n} style={{ border: "1px solid var(--rule)", background: "var(--surface-raised)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid var(--rule-soft)" }}>
              <span className="f-label">Experiment {n}</span>
              <StatusBadge state={s === "RUNNING" ? "running" : s === "PASS" ? "pass" : "fail"} />
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="f-mono" style={{ fontSize: 15 }}>{t}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
                {meta.map((m) => <span key={m} className="f-label">{m}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 56 }}>
        <SectionMarker number="02.1" title="Model shelf" meta="Open weights, published on Hugging Face" />
        <div style={{ marginTop: 20 }}>
          <SpecTable figure="TAB. 04" caption="Fabryka Laboratory checkpoints"
            columns={[{ key: "id", label: "Checkpoint" }, { key: "base", label: "Base" }, { key: "params", label: "Params" }, { key: "quant", label: "Quant" }, { key: "note", label: "Note", align: "right" }]}
            rows={[{ id: "fabryka/qwen3.8-27b-awq", base: "Qwen3.8", params: "27B", quant: "AWQ", note: "Line 03" },
              { id: "fabryka/bielik-11b-fp8", base: "Bielik", params: "11B", quant: "FP8", note: "Line 01" },
              { id: "fabryka/slayer-1b", base: "Slayer series", params: "1B", quant: "FP16", note: "Draft model" }]} />
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { Production, Laboratory });
