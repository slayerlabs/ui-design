# StatusBadge
Live machine state with an LED dot — the only component allowed to use signal green.

```jsx
<StatusBadge state="live" />
<StatusBadge state="fail" label="FAIL 3/12" />
```

States: `live`, `running`, `pass`, `fail`, `warn`, `queued`, `offline`. `live`/`running` blink in steps (no smooth fade).
