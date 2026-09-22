# SpecTable
Measurement table styled like a figure in an equipment manual — for benchmarks, pricing and machine inventories.

```jsx
<SpecTable figure="TAB. 03" caption="Polish legal QA / 12 models"
  columns={[{key:"model",label:"Model"},{key:"score",label:"Score"}]}
  rows={[{model:"Qwen3.8 27B",score:"71.4"}]} />
```

First column left, numerics right, mono throughout. Never add zebra striping or rounded card wrappers.
