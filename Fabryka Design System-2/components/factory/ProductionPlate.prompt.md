# ProductionPlate
The signature Fabryka device — a riveted machine plate rendered in HTML; use it for models, machines, releases, benchmark cards, social graphics and slides.

```jsx
<ProductionPlate
  title="PRODUCTION PLATE" serial="F-00482"
  rows={[{k:"Model",v:"Qwen3.8 27B"},{k:"Machine",v:"2 x RTX 3090"},{k:"Output",v:"71.4 tok/s",accent:true}]}
  status="live" tested="03 SEP 2026" width={360} />
```

Keep rows to 5-8. `tone="carbon"` for dark sections. Values are mono and right-aligned; `accent` marks the one number that matters.
