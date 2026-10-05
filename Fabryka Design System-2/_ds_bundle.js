/* @ds-bundle: {"format":4,"namespace":"FabrykaDesignSystem_ec938d","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"FigureFrame","sourcePath":"components/factory/FigureFrame.jsx"},{"name":"MachineLog","sourcePath":"components/factory/MachineLog.jsx"},{"name":"MetricReadout","sourcePath":"components/factory/MetricReadout.jsx"},{"name":"ProductionPlate","sourcePath":"components/factory/ProductionPlate.jsx"},{"name":"SpecTable","sourcePath":"components/factory/SpecTable.jsx"},{"name":"TestStamp","sourcePath":"components/factory/TestStamp.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Icon","sourcePath":"components/identity/Icon.jsx"},{"name":"Wordmark","sourcePath":"components/identity/Wordmark.jsx"},{"name":"Fmark","sourcePath":"components/identity/Wordmark.jsx"},{"name":"SectionMarker","sourcePath":"components/navigation/SectionMarker.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Button.jsx":"421ad699e385","components/core/Card.jsx":"9f74bba6f101","components/core/IconButton.jsx":"535adc7f5524","components/core/StatusBadge.jsx":"16aa56635fe7","components/core/Tag.jsx":"1a036cba0e63","components/factory/FigureFrame.jsx":"533dd88b9a60","components/factory/MachineLog.jsx":"8923d564866b","components/factory/MetricReadout.jsx":"595557abdeb9","components/factory/ProductionPlate.jsx":"5ba81933b6be","components/factory/SpecTable.jsx":"80c3a66d1d16","components/factory/TestStamp.jsx":"174de6ddfc71","components/feedback/Dialog.jsx":"efa21c822fdc","components/feedback/Tooltip.jsx":"7f808acc02d6","components/forms/Checkbox.jsx":"ebb0606d8bed","components/forms/Input.jsx":"9781ca8e48c5","components/forms/Radio.jsx":"474b1c56a2f1","components/forms/Select.jsx":"73bc029e5b50","components/forms/Switch.jsx":"92a8f077fdb6","components/identity/Icon.jsx":"298295f687f0","components/identity/Wordmark.jsx":"679806ce6025","components/navigation/SectionMarker.jsx":"257b8001a30c","components/navigation/Tabs.jsx":"79897284c8c1","ui_kits/codesota/Leaderboard.jsx":"7d34bad9f57c","ui_kits/website/Chrome.jsx":"36ee1703f86e","ui_kits/website/Home.jsx":"e8bbe5ced97e","ui_kits/website/Pages.jsx":"bff75b588242","ui_kits/website/_archive/Home.v1.jsx":"eceb9b574063","ui_kits/website/doc-page.js":"f52ae9c02fca"},"inlinedExternals":[],"unexposedExports":[]} */
(()=>{const __ds_ns=(window.FabrykaDesignSystem_ec938d=window.FabrykaDesignSystem_ec938d||{});const __ds_scope={};__ds_ns.__errors=[];
// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: "var(--control-h-sm)",
    px: 10,
    fs: 11,
    gap: 6
  },
  md: {
    h: "var(--control-h)",
    px: 16,
    fs: 12,
    gap: 8
  },
  lg: {
    h: "var(--control-h-lg)",
    px: 22,
    fs: 13,
    gap: 10
  }
};

/* Square, mono-labelled, uppercase. No radius, no gradient, no soft shadow. */
function Button({
  variant = "primary",
  size = "md",
  disabled,
  block,
  href,
  children,
  iconLeft,
  iconRight,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}px`,
    fontFamily: "var(--font-text)",
    fontSize: s.fs,
    fontWeight: 500,
    letterSpacing: "normal",
    textTransform: "none",
    borderRadius: 0,
    border: "1px solid var(--rule)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition: "var(--transition-control)",
    opacity: disabled ? 0.38 : 1,
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--carbon)",
      color: "var(--paper)",
      borderColor: "var(--carbon)"
    },
    accent: {
      background: "var(--red)",
      color: "var(--paper)",
      borderColor: "var(--red)"
    },
    solid: {
      background: "var(--carbon)",
      color: "var(--paper)",
      borderColor: "var(--carbon)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-body)",
      borderColor: "var(--rule)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      borderColor: "transparent"
    }
  };
  const hover = {
    primary: {
      background: "var(--carbon-3)",
      borderColor: "var(--carbon-3)"
    },
    accent: {
      background: "var(--red-dark)",
      borderColor: "var(--red-dark)"
    },
    solid: {
      background: "var(--carbon-3)",
      borderColor: "var(--carbon-3)"
    },
    secondary: {
      background: "var(--carbon)",
      color: "var(--surface)",
      borderColor: "var(--carbon)"
    },
    ghost: {
      color: "var(--red)"
    }
  };
  const [over, setOver] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const st = {
    ...base,
    ...variants[variant],
    ...(over && !disabled ? hover[variant] : null),
    ...(down && !disabled ? {
      transform: "translateY(1px)"
    } : null),
    ...style
  };
  const handlers = {
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => {
      setOver(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft, children, iconRight);
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: st,
    ...handlers,
    ...rest
  }, inner);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    style: st,
    ...handlers,
    ...rest
  }, inner);
}
__ds_scope.Button=Button;__ds_ns.Button=Button;
})(); } catch(e){__ds_ns.__errors.push({path:"components/core/Button.jsx",error:String(e.message||e)});}

// components/core/Card.jsx
try { (() => {
/* Hairline square panel. Optional mono header rail and corner index. */
function Card({
  label,
  index,
  children,
  tone = "paper",
  pad = "var(--card-pad)",
  hoverable,
  style,
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  const tones = {
    paper: {
      background: "var(--surface-card)",
      color: "var(--text-body)"
    },
    flat: {
      background: "transparent",
      color: "var(--text-body)"
    },
    carbon: {
      background: "var(--carbon)",
      color: "var(--paper)"
    },
    red: {
      background: "var(--red)",
      color: "var(--paper)"
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    style: {
      border: "1px solid var(--rule)",
      borderRadius: 0,
      transition: "var(--transition-control)",
      ...tones[tone],
      ...(hoverable && over ? {
        background: tone === "carbon" ? "var(--carbon-3)" : "var(--paper-2)"
      } : null),
      ...style
    },
    ...rest
  }, (label || index) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      padding: "7px 12px",
      borderBottom: "1px solid var(--rule-soft)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, index)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad
    }
  }, children));
}
__ds_scope.Card=Card;__ds_ns.Card=Card;
})(); } catch(e){__ds_ns.__errors.push({path:"components/core/Card.jsx",error:String(e.message||e)});}

// components/core/IconButton.jsx
try { (() => {
const {
  Icon
} = __ds_scope;

/* Square icon button. Same chassis as Button, 1:1 footprint. */
function IconButton({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled,
  style,
  ...rest
}) {
  const dim = size === "sm" ? 28 : size === "lg" ? 46 : 36;
  const [over, setOver] = React.useState(false);
  const variants = {
    primary: {
      background: "var(--carbon)",
      color: "var(--paper)",
      borderColor: "var(--carbon)"
    },
    accent: {
      background: "var(--red)",
      color: "var(--paper)",
      borderColor: "var(--red)"
    },
    solid: {
      background: "var(--carbon)",
      color: "var(--paper)",
      borderColor: "var(--carbon)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-body)",
      borderColor: "var(--rule)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)",
      borderColor: "transparent"
    }
  };
  const hovered = over && !disabled ? variant === "accent" ? {
    background: "var(--red-dark)"
  } : variant === "primary" ? {
    background: "var(--carbon-3)"
  } : variant === "ghost" ? {
    color: "var(--red)"
  } : {
    background: "var(--carbon)",
    color: "var(--surface)",
    borderColor: "var(--carbon)"
  } : null;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    style: {
      display: "inline-grid",
      placeItems: "center",
      width: dim,
      height: dim,
      border: "1px solid var(--rule)",
      borderRadius: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.38 : 1,
      transition: "var(--transition-control)",
      ...variants[variant],
      ...hovered,
      ...style
    },
    ...rest
  }, typeof icon === "string" ? /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === "sm" ? 13 : 16
  }) : icon);
}
__ds_scope.IconButton=IconButton;__ds_ns.IconButton=IconButton;
})(); } catch(e){__ds_ns.__errors.push({path:"components/core/IconButton.jsx",error:String(e.message||e)});}

// components/core/StatusBadge.jsx
try { (() => {
const STATES = {
  live: {
    label: "LIVE",
    color: "var(--status-live)",
    pulse: true
  },
  running: {
    label: "RUNNING",
    color: "var(--status-live)",
    pulse: true
  },
  pass: {
    label: "PASS",
    color: "var(--status-pass)"
  },
  fail: {
    label: "FAIL",
    color: "var(--status-fail)"
  },
  warn: {
    label: "DEGRADED",
    color: "var(--status-warn)"
  },
  queued: {
    label: "QUEUED",
    color: "var(--status-idle)"
  },
  offline: {
    label: "OFFLINE",
    color: "var(--status-idle)"
  }
};

/* State, not decoration. Green appears ONLY through this component. */
function StatusBadge({
  state = "live",
  label,
  showDot = true,
  style,
  ...rest
}) {
  const s = STATES[state] || STATES.live;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-body)",
      ...style
    },
    ...rest
  }, showDot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "var(--dot-size)",
      height: "var(--dot-size)",
      borderRadius: "var(--radius-dot)",
      background: s.color,
      animation: s.pulse ? "f-blink var(--blink) steps(2,end) infinite" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", null, label || s.label), /*#__PURE__*/React.createElement("style", null, "@keyframes f-blink{0%,60%{opacity:1}61%,100%{opacity:.25}}"));
}
__ds_scope.StatusBadge=StatusBadge;__ds_ns.StatusBadge=StatusBadge;
})(); } catch(e){__ds_ns.__errors.push({path:"components/core/StatusBadge.jsx",error:String(e.message||e)});}

// components/core/Tag.jsx
try { (() => {
/* Machine-label tag: mono, caps, hairline box. Used for routes, quantizations, lines. */
function Tag({
  children,
  tone = "default",
  size = "md",
  style,
  ...rest
}) {
  const tones = {
    default: {
      color: "var(--text-body)",
      borderColor: "var(--rule-soft)",
      background: "transparent"
    },
    muted: {
      color: "var(--text-muted)",
      borderColor: "var(--rule-faint)",
      background: "transparent"
    },
    red: {
      color: "var(--paper)",
      borderColor: "var(--red)",
      background: "var(--red)"
    },
    carbon: {
      color: "var(--surface)",
      borderColor: "var(--carbon)",
      background: "var(--carbon)"
    },
    outlineRed: {
      color: "var(--red)",
      borderColor: "var(--red)",
      background: "transparent"
    }
  };
  const pad = size === "sm" ? "2px 5px" : "3px 7px";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-mono)",
      fontSize: size === "sm" ? 10 : 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      lineHeight: 1.3,
      padding: pad,
      border: "1px solid",
      borderRadius: 0,
      ...tones[tone],
      ...style
    },
    ...rest
  }, children);
}
__ds_scope.Tag=Tag;__ds_ns.Tag=Tag;
})(); } catch(e){__ds_ns.__errors.push({path:"components/core/Tag.jsx",error:String(e.message||e)});}

// components/factory/FigureFrame.jsx
try { (() => {
/* Annotated figure frame: hard-flash hardware photography or a technical chart,
   captioned like a plate in an equipment manual. `src` optional — an empty frame
   renders the annotation block only, ready for a real photograph. */
function FigureFrame({
  src,
  alt = "",
  figure = "FIG. 01",
  caption,
  annotations = [],
  ratio = "3 / 2",
  grayscale = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      border: "1px solid var(--rule)",
      background: "var(--paper-3)",
      overflow: "hidden"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: grayscale ? "grayscale(1) contrast(1.08)" : "none",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      backgroundImage: "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
      backgroundSize: "24px 24px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Hardware photograph")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      background: "var(--red)",
      color: "var(--paper)",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      padding: "3px 6px"
    }
  }, figure)), (caption || annotations.length > 0) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      borderTop: "1px solid var(--rule)",
      marginTop: -1,
      padding: "8px 0 0",
      display: "flex",
      flexWrap: "wrap",
      gap: "4px 20px",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, caption && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)"
    }
  }, caption), annotations.map((a, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, a))));
}
__ds_scope.FigureFrame=FigureFrame;__ds_ns.FigureFrame=FigureFrame;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/FigureFrame.jsx",error:String(e.message||e)});}

// components/factory/MachineLog.jsx
try { (() => {
/* Terminal/console block: aligned key–value machine output on carbon.
   Pass `lines` as [{k,v}] or raw strings. */
function MachineLog({
  title,
  lines = [],
  tone = "carbon",
  pad = 14,
  style,
  ...rest
}) {
  const carbon = tone === "carbon";
  const fg = carbon ? "var(--paper)" : "var(--carbon)";
  const width = lines.reduce((m, l) => l && l.k ? Math.max(m, String(l.k).length) : m, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: carbon ? "var(--carbon)" : "var(--paper-2)",
      color: fg,
      border: carbon ? "1px solid var(--carbon)" : "1px solid var(--rule-soft)",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      lineHeight: "var(--leading-mono)",
      ...style
    },
    ...rest
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${pad - 6}px ${pad}px`,
      borderBottom: `1px solid ${carbon ? "rgba(241,239,232,.2)" : "var(--rule-faint)"}`,
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: carbon ? "var(--grey)" : "var(--text-muted)"
    }
  }, title), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: pad,
      whiteSpace: "pre",
      overflowX: "auto",
      fontFamily: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit"
    }
  }, lines.map((l, i) => {
    if (typeof l === "string") return l + (i < lines.length - 1 ? "\n" : "");
    const key = String(l.k).toUpperCase().padEnd(width + 4, " ");
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: carbon ? "var(--grey)" : "var(--text-muted)"
      }
    }, key), /*#__PURE__*/React.createElement("span", {
      style: {
        color: l.accent ? "var(--red)" : l.ok ? "var(--signal-green)" : fg
      }
    }, l.v), i < lines.length - 1 ? "\n" : "");
  })));
}
__ds_scope.MachineLog=MachineLog;__ds_ns.MachineLog=MachineLog;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/MachineLog.jsx",error:String(e.message||e)});}

// components/factory/MetricReadout.jsx
try { (() => {
/* Giant measured number + mono caption. The primary "hero graphic" of the brand. */
function MetricReadout({
  value,
  unit,
  label,
  note,
  size = "lg",
  align = "left",
  accent = false,
  style,
  ...rest
}) {
  const fs = size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 44 : 30;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: align === "right" ? "flex-end" : "flex-start",
      textAlign: align,
      ...style
    },
    ...rest
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      color: accent ? "var(--red)" : "var(--text-heading)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontStretch: "normal",
      fontSize: fs,
      lineHeight: 0.82,
      letterSpacing: "-0.02em",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: Math.max(11, fs * 0.2),
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, unit)), note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-faint)",
      letterSpacing: "var(--track-mono)"
    }
  }, note));
}
__ds_scope.MetricReadout=MetricReadout;__ds_ns.MetricReadout=MetricReadout;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/MetricReadout.jsx",error:String(e.message||e)});}

// components/factory/ProductionPlate.jsx
try { (() => {
const {
  StatusBadge
} = __ds_scope;

/* THE core brand device. A riveted machine plate, rendered in HTML.
   Header rail (brand + territory) → plate title + serial → spec rows → footer stamp. */
function ProductionPlate({
  title = "Production Plate",
  serial,
  territory = "PL/WAW",
  rows = [],
  status,
  tested,
  tone = "paper",
  width,
  style,
  ...rest
}) {
  const carbon = tone === "carbon";
  const fg = carbon ? "var(--paper)" : "var(--carbon)";
  const bg = carbon ? "var(--carbon)" : "var(--surface-raised)";
  const rule = carbon ? "rgba(241,239,232,.28)" : "rgba(17,17,17,.22)";
  const mono = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "var(--track-label)",
    textTransform: "uppercase"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      background: bg,
      color: fg,
      border: `1.5px solid ${carbon ? "var(--paper)" : "var(--carbon)"}`,
      position: "relative",
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 12px",
      borderBottom: `1px solid ${rule}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontStretch: "normal",
      fontSize: 17,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, "Fabryka", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red)"
    }
  }, ".")), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: carbon ? "var(--grey)" : "var(--text-muted)"
    }
  }, territory)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 16,
      padding: "10px 12px",
      borderBottom: `1px solid ${rule}`,
      background: carbon ? "rgba(241,239,232,.04)" : "var(--plate-tint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12
    }
  }, title), serial && /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12,
      color: "var(--red)"
    }
  }, serial)), /*#__PURE__*/React.createElement("div", null, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(96px,38%) 1fr",
      gap: 12,
      padding: "6px 12px",
      borderBottom: i === rows.length - 1 ? "none" : `1px solid ${carbon ? "rgba(241,239,232,.14)" : "rgba(17,17,17,.09)"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: carbon ? "var(--grey)" : "var(--text-muted)"
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      letterSpacing: "var(--track-mono)",
      color: r.accent ? "var(--red)" : fg,
      textAlign: "right"
    }
  }, r.v)))), (status || tested) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      padding: "8px 12px",
      borderTop: `1px solid ${rule}`
    }
  }, status ? /*#__PURE__*/React.createElement(StatusBadge, {
    state: status
  }) : /*#__PURE__*/React.createElement("span", null), tested && /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: carbon ? "var(--grey)" : "var(--text-muted)"
    }
  }, "Tested ", tested)));
}
__ds_scope.ProductionPlate=ProductionPlate;__ds_ns.ProductionPlate=ProductionPlate;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/ProductionPlate.jsx",error:String(e.message||e)});}

// components/factory/SpecTable.jsx
try { (() => {
/* Measurement table — hairline rules, mono figures, right-aligned numerics.
   Looks like a table in an equipment manual, not a dashboard widget. */
function SpecTable({
  columns = [],
  rows = [],
  caption,
  figure,
  dense = false,
  style,
  ...rest
}) {
  const pad = dense ? "5px 10px" : "9px 12px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    },
    ...rest
  }, (figure || caption) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline",
      marginBottom: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, figure && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red)"
    }
  }, figure), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, caption)), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: c.align || (i === 0 ? "left" : "right"),
      padding: pad,
      borderTop: "1.5px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      fontSize: 10.5,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      fontWeight: 500,
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, c.label || c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => {
    const key = c.key || c;
    const cell = r[key];
    return /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        textAlign: c.align || (ci === 0 ? "left" : "right"),
        padding: pad,
        borderBottom: "1px solid var(--rule-faint)",
        color: ci === 0 ? "var(--text-body)" : "var(--text-body)",
        whiteSpace: "nowrap"
      }
    }, typeof cell === "object" && cell !== null ? cell : cell);
  }))))));
}
__ds_scope.SpecTable=SpecTable;__ds_ns.SpecTable=SpecTable;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/SpecTable.jsx",error:String(e.message||e)});}

// components/factory/TestStamp.jsx
try { (() => {
/* Inspection stamp: F / test number / pass-fail lines. Never stars, never scores out of 10. */
function TestStamp({
  code = "F/WAW",
  number = "0271",
  checks = [],
  tone = "red",
  style,
  ...rest
}) {
  const c = tone === "red" ? "var(--red)" : "var(--carbon)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      border: `2px solid ${c}`,
      color: c,
      padding: "8px 10px",
      background: "transparent",
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderBottom: `1px solid ${c}`,
      paddingBottom: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontStretch: "normal",
      fontSize: 26,
      lineHeight: 0.8,
      textTransform: "uppercase"
    }
  }, "F."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      lineHeight: 1.3
    }
  }, code, /*#__PURE__*/React.createElement("br", null), "Tested ", number)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, checks.map((ch, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 14,
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", null, ch.k), /*#__PURE__*/React.createElement("span", null, ch.v)))));
}
__ds_scope.TestStamp=TestStamp;__ds_ns.TestStamp=TestStamp;
})(); } catch(e){__ds_ns.__errors.push({path:"components/factory/TestStamp.jsx",error:String(e.message||e)});}

// components/feedback/Dialog.jsx
try { (() => {
const {
  IconButton
} = __ds_scope;

/* Square modal on a carbon scrim. Header is a mono rail with a document number. */
function Dialog({
  open = true,
  title,
  docNumber,
  children,
  footer,
  onClose,
  width = 520,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(17,17,17,.62)",
      display: "grid",
      placeItems: "center",
      zIndex: 100,
      padding: 24
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: "100%",
      background: "var(--surface-raised)",
      border: "1px solid var(--rule)",
      boxShadow: "var(--shadow-overlay)",
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "10px 12px",
      borderBottom: "1px solid var(--rule)",
      background: "var(--carbon)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", null, title), docNumber && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--grey)"
    }
  }, docNumber)), onClose && /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose,
    style: {
      color: "var(--paper)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      padding: 12,
      borderTop: "1px solid var(--rule-soft)",
      background: "var(--paper-2)"
    }
  }, footer)));
}
__ds_scope.Dialog=Dialog;__ds_ns.Dialog=Dialog;
})(); } catch(e){__ds_ns.__errors.push({path:"components/feedback/Dialog.jsx",error:String(e.message||e)});}

// components/feedback/Tooltip.jsx
try { (() => {
/* Carbon mono tooltip, square, instant. Appears on hover with no fade-in delay theatre. */
function Tooltip({
  content,
  side = "top",
  children,
  style,
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    ...rest
  }, children, over && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      ...pos,
      zIndex: 50,
      whiteSpace: "nowrap",
      background: "var(--carbon)",
      color: "var(--paper)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-mono)",
      padding: "4px 7px",
      border: "1px solid var(--carbon)"
    }
  }, content));
}
__ds_scope.Tooltip=Tooltip;__ds_ns.Tooltip=Tooltip;
})(); } catch(e){__ds_ns.__errors.push({path:"components/feedback/Tooltip.jsx",error:String(e.message||e)});}

// components/forms/Checkbox.jsx
try { (() => {
/* Square box, red fill, hard tick. Inspection-form logic. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  hint,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "inline-flex",
      gap: 10,
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      flex: "0 0 auto",
      marginTop: 1,
      border: "1.5px solid var(--rule)",
      background: on ? "var(--red)" : "var(--surface-raised)",
      display: "grid",
      placeItems: "center",
      transition: "var(--transition-control)"
    }
  }, on && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: "var(--paper)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "var(--track-mono)",
      color: "var(--text-body)"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, hint)));
}
__ds_scope.Checkbox=Checkbox;__ds_ns.Checkbox=Checkbox;
})(); } catch(e){__ds_ns.__errors.push({path:"components/forms/Checkbox.jsx",error:String(e.message||e)});}

// components/forms/Input.jsx
try { (() => {
/* Field label sits above in mono caps; the input itself is a hairline box, no radius. */
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = "md",
  style,
  wrapStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 11,
      letterSpacing: "normal",
      textTransform: "none",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      height: h,
      background: "var(--surface-raised)",
      border: `1px solid ${error ? "var(--red)" : focus ? "var(--carbon)" : "var(--rule-soft)"}`,
      boxShadow: focus ? "inset 0 0 0 1px var(--carbon)" : "none"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "0 8px",
      fontFamily: "var(--font-text)",
      fontSize: 12,
      color: "var(--text-faint)"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      height: "100%",
      padding: "0 10px",
      border: 0,
      outline: "none",
      background: "transparent",
      color: "var(--text-body)",
      fontFamily: "var(--font-text)",
      fontSize: 13,
      letterSpacing: "var(--track-mono)",
      ...style
    },
    ...rest
  }), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "0 8px",
      fontFamily: "var(--font-text)",
      fontSize: 11,
      letterSpacing: "normal",
      textTransform: "none",
      color: "var(--text-faint)"
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 11,
      color: error ? "var(--red)" : "var(--text-faint)"
    }
  }, error || hint));
}
__ds_scope.Input=Input;__ds_ns.Input=Input;
})(); } catch(e){__ds_ns.__errors.push({path:"components/forms/Input.jsx",error:String(e.message||e)});}

// components/forms/Radio.jsx
try { (() => {
/* Radio group. Square dots — the system has no circles except status LEDs. */
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  direction = "column",
  disabled,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const sel = value === undefined ? inner : value;
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: direction === "row" ? 20 : 10,
      ...style
    },
    ...rest
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    const on = sel === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => {
        if (disabled) return;
        if (value === undefined) setInner(v);
        onChange && onChange(v);
      },
      style: {
        display: "inline-flex",
        gap: 10,
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        flex: "0 0 auto",
        border: "1.5px solid var(--rule)",
        background: "var(--surface-raised)",
        display: "grid",
        placeItems: "center"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        background: "var(--red)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-body)"
      }
    }, l));
  }));
}
__ds_scope.Radio=Radio;__ds_ns.Radio=Radio;
})(); } catch(e){__ds_ns.__errors.push({path:"components/forms/Radio.jsx",error:String(e.message||e)});}

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  hint,
  size = "md",
  style,
  wrapStyle,
  ...rest
}) {
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 11,
      letterSpacing: "normal",
      textTransform: "none",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", {
    style: {
      appearance: "none",
      width: "100%",
      height: h,
      padding: "0 30px 0 10px",
      background: "var(--surface-raised)",
      border: "1px solid var(--rule-soft)",
      borderRadius: 0,
      color: "var(--text-body)",
      fontFamily: "var(--font-text)",
      fontSize: 13,
      cursor: "pointer",
      ...style
    },
    ...rest
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      fontFamily: "var(--font-text)",
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "▾")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, hint));
}
__ds_scope.Select=Select;__ds_ns.Select=Select;
})(); } catch(e){__ds_ns.__errors.push({path:"components/forms/Select.jsx",error:String(e.message||e)});}

// components/forms/Switch.jsx
try { (() => {
/* Industrial rocker switch: square travel, ON/OFF legend, no easing bounce. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  legend = true,
  disabled,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 44,
      height: 22,
      border: "1px solid var(--rule)",
      background: on ? "var(--carbon)" : "var(--paper-3)",
      transition: "background-color var(--dur-fast) var(--ease-mech)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: on ? 24 : 2,
      width: 16,
      height: 16,
      background: on ? "var(--paper)" : "var(--carbon)",
      transition: "left var(--dur-fast) var(--ease-mech)"
    }
  })), (label || legend) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-body)"
    }
  }, label || (on ? "ON" : "OFF")));
}
__ds_scope.Switch=Switch;__ds_ns.Switch=Switch;
})(); } catch(e){__ds_ns.__errors.push({path:"components/forms/Switch.jsx",error:String(e.message||e)});}

// components/identity/Icon.jsx
try { (() => {
/* Lucide (stroke 1.5) loaded from CDN as a CSS mask so the glyph inherits currentColor.
   Fabryka uses icons sparingly — labels and numbers do most of the work. */
function Icon({
  name,
  size = 16,
  strokeWidth,
  style,
  ...rest
}) {
  const url = `https://unpkg.com/lucide-static@0.469.0/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      background: "currentColor",
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      flex: "0 0 auto",
      opacity: strokeWidth ? 1 : 1,
      ...style
    },
    ...rest
  });
}
__ds_scope.Icon=Icon;__ds_ns.Icon=Icon;
})(); } catch(e){__ds_ns.__errors.push({path:"components/identity/Icon.jsx",error:String(e.message||e)});}

// components/identity/Wordmark.jsx
try { (() => {
/* Production text signature. Official factory marks are distributed under assets/. */
function Wordmark({
  size = 32,
  color,
  periodColor = "var(--red)",
  unit,
  place,
  tone = "auto",
  as = "span",
  style,
  ...rest
}) {
  const Tag = as;
  const fg = color || (tone === "inverse" ? "var(--paper)" : tone === "paper" ? "var(--carbon)" : "currentColor");
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      display: "inline-flex",
      alignItems: "flex-end",
      gap: Math.round(size * 0.42),
      color: fg,
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontStretch: "normal",
      textTransform: "none",
      letterSpacing: "-0.02em",
      lineHeight: 1,
      fontSize: size
    }
  }, "Fabryka", /*#__PURE__*/React.createElement("span", {
    style: {
      color: periodColor
    }
  }, ".")), (unit || place) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: Math.max(9, Math.round(size * 0.26)),
      letterSpacing: "var(--track-label)",
      textTransform: "none",
      lineHeight: 1,
      paddingBottom: Math.round(size * 0.06),
      color: "var(--text-muted)",
      display: "flex",
      gap: 8
    }
  }, unit && /*#__PURE__*/React.createElement("span", null, unit), place && /*#__PURE__*/React.createElement("span", null, place)));
}

/* Compatibility component: renders the official factory symbol, never an invented F. badge. */
function Fmark({
  size = 40,
  tone = "red",
  assetBase = "https://fabryka.ai/assets/brand",
  style,
  ...rest
}) {
  const inverse = tone === "carbon";
  const file = inverse ? "fabryka-mark-paper.svg" : "fabryka-mark-ink.svg";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      padding: Math.round(size * .2),
      background: inverse ? "var(--carbon)" : "transparent",
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}/${file}`,
    width: size,
    height: size,
    alt: "Fabryka",
    style: {
      objectFit: "contain"
    }
  }));
}
__ds_scope.Wordmark=Wordmark;__ds_ns.Wordmark=Wordmark;
__ds_scope.Fmark=Fmark;__ds_ns.Fmark=Fmark;
})(); } catch(e){__ds_ns.__errors.push({path:"components/identity/Wordmark.jsx",error:String(e.message||e)});}

// components/navigation/SectionMarker.jsx
try { (() => {
/* §-numbered section head with a full-width rule. The spine of every long page. */
function SectionMarker({
  number,
  title,
  meta,
  rule = "heavy",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      ...style
    },
    ...rest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: rule === "heavy" ? "var(--border-heavy) solid var(--rule)" : "1px solid var(--rule)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 16
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "var(--track-label)",
      color: "var(--red)"
    }
  }, "§", number), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontStretch: "68%",
      textTransform: "uppercase",
      letterSpacing: "-0.01em",
      lineHeight: 0.9,
      fontSize: 34
    }
  }, title)), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, meta)));
}
__ds_scope.SectionMarker=SectionMarker;__ds_ns.SectionMarker=SectionMarker;
})(); } catch(e){__ds_ns.__errors.push({path:"components/navigation/SectionMarker.jsx",error:String(e.message||e)});}

// components/navigation/Tabs.jsx
try { (() => {
/* Numbered tabs — 01 / 02 / 03. Active tab is carbon-underlined, mono caps. */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  numbered = true,
  style,
  ...rest
}) {
  const first = typeof tabs[0] === "string" ? tabs[0] : tabs[0] && tabs[0].value;
  const [inner, setInner] = React.useState(defaultValue || first);
  const sel = value === undefined ? inner : value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid var(--rule)",
      gap: 0,
      ...style
    },
    ...rest
  }, tabs.map((t, i) => {
    const v = typeof t === "string" ? t : t.value;
    const l = typeof t === "string" ? t : t.label;
    const on = sel === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => {
        if (value === undefined) setInner(v);
        onChange && onChange(v);
      },
      style: {
        appearance: "none",
        border: 0,
        borderBottom: on ? "3px solid var(--red)" : "3px solid transparent",
        background: "transparent",
        cursor: "pointer",
        padding: "8px 16px 7px",
        marginBottom: -1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 8,
        fontFamily: "var(--font-text)",
        fontSize: 16,
        letterSpacing: "normal",
        textTransform: "none",
        color: on ? "var(--text-body)" : "var(--text-muted)",
        transition: "var(--transition-control)"
      }
    }, numbered && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: on ? "var(--red)" : "var(--text-faint)"
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", null, l));
  }));
}
__ds_scope.Tabs=Tabs;__ds_ns.Tabs=Tabs;
})(); } catch(e){__ds_ns.__errors.push({path:"components/navigation/Tabs.jsx",error:String(e.message||e)});}

// ui_kits/codesota/Leaderboard.jsx
try { (() => {
const {
  SectionMarker,
  SpecTable,
  TestStamp,
  Tabs,
  MetricReadout,
  StatusBadge,
  Tag,
  Button,
  Icon,
  MachineLog,
  Wordmark
} = window.FabrykaDesignSystem_ec938d;
const CS_PAGE = {
  maxWidth: 1440,
  margin: "0 auto",
  padding: "0 40px"
};
const SUITES = {
  "Polish legal QA": [{
    model: "Qwen3.8 27B",
    org: "Fabryka",
    score: "71.4",
    tok: "82.4",
    cost: "0.21",
    state: "pass"
  }, {
    model: "Llama 4 17B",
    org: "Fabryka",
    score: "68.9",
    tok: "104.2",
    cost: "0.17",
    state: "pass"
  }, {
    model: "Bielik 11B",
    org: "SpeakLeash",
    score: "64.2",
    tok: "138.0",
    cost: "0.09",
    state: "pass"
  }, {
    model: "Mistral 24B",
    org: "Mistral",
    score: "62.7",
    tok: "91.5",
    cost: "0.19",
    state: "pass"
  }, {
    model: "Gemma 3 12B",
    org: "Google",
    score: "58.1",
    tok: "121.4",
    cost: "0.12",
    state: "pass"
  }, {
    model: "Slayer 1B",
    org: "Fabryka lab",
    score: "31.8",
    tok: "412.0",
    cost: "0.01",
    state: "fail"
  }],
  "Tool calling": [{
    model: "Llama 4 17B",
    org: "Fabryka",
    score: "88.2",
    tok: "104.2",
    cost: "0.17",
    state: "pass"
  }, {
    model: "Qwen3.8 27B",
    org: "Fabryka",
    score: "86.7",
    tok: "82.4",
    cost: "0.21",
    state: "pass"
  }, {
    model: "Mistral 24B",
    org: "Mistral",
    score: "81.0",
    tok: "91.5",
    cost: "0.19",
    state: "pass"
  }, {
    model: "Bielik 11B",
    org: "SpeakLeash",
    score: "72.4",
    tok: "138.0",
    cost: "0.09",
    state: "warn"
  }],
  "JSON conformance": [{
    model: "Qwen3.8 27B",
    org: "Fabryka",
    score: "99.1",
    tok: "82.4",
    cost: "0.21",
    state: "pass"
  }, {
    model: "Bielik 11B",
    org: "SpeakLeash",
    score: "97.4",
    tok: "138.0",
    cost: "0.09",
    state: "pass"
  }, {
    model: "Gemma 3 12B",
    org: "Google",
    score: "94.0",
    tok: "121.4",
    cost: "0.12",
    state: "pass"
  }]
};
function CodeSOTA() {
  const names = Object.keys(SUITES);
  const [suite, setSuite] = React.useState(names[0]);
  const [detail, setDetail] = React.useState(null);
  const rows = SUITES[suite];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-theme": "carbon",
    style: {
      background: "var(--carbon)",
      color: "var(--paper)",
      padding: "34px 0 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CS_PAGE
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontStretch: "66%",
      fontSize: 56,
      lineHeight: .85,
      textTransform: "uppercase",
      letterSpacing: "-.02em"
    }
  }, "CodeSOTA"), /*#__PURE__*/React.createElement("div", {
    className: "f-label",
    style: {
      color: "var(--grey)",
      marginTop: 8
    }
  }, "Measurement by Fabryka. · Suites, methodology and raw results in public")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 18,
    tone: "inverse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "f-label",
    style: {
      color: "var(--grey-dark)"
    }
  }, "A Fabryka project"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 24,
      marginTop: 30,
      borderTop: "1px solid rgba(241,239,232,.28)",
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement(MetricReadout, {
    value: "12",
    unit: "models",
    label: "Measured",
    size: "md"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "04",
    unit: "suites",
    label: "Active",
    size: "md"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "0271",
    unit: "tests",
    label: "Run to date",
    size: "md",
    accent: true
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "100",
    unit: "%",
    label: "Reproducible",
    size: "md"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...CS_PAGE,
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    number: "03",
    title: "Leaderboard",
    meta: "Updated 03 SEP 2026 · 02:31 CET"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: names,
    value: suite,
    onChange: s => {
      setSuite(s);
      setDetail(null);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: detail ? "1fr 340px" : "1fr",
      gap: 40,
      marginTop: 26,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SpecTable, {
    figure: "TEST 0" + (271 - names.indexOf(suite)),
    caption: suite + " / " + rows.length + " models",
    columns: [{
      key: "rank",
      label: "#"
    }, {
      key: "model",
      label: "Model"
    }, {
      key: "org",
      label: "Provider"
    }, {
      key: "score",
      label: "Score"
    }, {
      key: "tok",
      label: "Tok/s"
    }, {
      key: "cost",
      label: "PLN / 1M"
    }, {
      key: "state",
      label: "Result",
      align: "right"
    }],
    rows: rows.map((r, i) => ({
      rank: String(i + 1).padStart(2, "0"),
      model: /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: e => {
          e.preventDefault();
          setDetail(r);
        },
        style: {
          color: "var(--carbon)",
          borderBottom: "1px solid var(--rule-soft)"
        }
      }, r.model),
      org: /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-muted)"
        }
      }, r.org),
      score: /*#__PURE__*/React.createElement("span", {
        style: {
          color: i === 0 ? "var(--red)" : "inherit"
        }
      }, r.score),
      tok: r.tok,
      cost: r.cost,
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: r.state,
        showDot: false
      })
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 18,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    })
  }, "Raw results (JSON)"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Methodology"), /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "Click a model for its test plate"))), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MachineLog, {
    title: detail.model,
    lines: [{
      k: "Suite",
      v: suite.toUpperCase()
    }, {
      k: "Score",
      v: detail.score,
      accent: true
    }, {
      k: "Decode",
      v: detail.tok + " TOK/S"
    }, {
      k: "Cost",
      v: detail.cost + " PLN / 1M"
    }, {
      k: "Machine",
      v: "F-WAW-3090-04"
    }, {
      k: "Result",
      v: detail.state.toUpperCase(),
      ok: detail.state === "pass"
    }]
  }), /*#__PURE__*/React.createElement(TestStamp, {
    code: "F/WAW",
    number: "0271",
    tone: detail.state === "pass" ? "red" : "carbon",
    checks: [{
      k: "Polish",
      v: detail.state === "fail" ? "FAIL" : "PASS"
    }, {
      k: "Tools",
      v: "PASS"
    }, {
      k: "JSON",
      v: "PASS"
    }, {
      k: "Latency",
      v: "84 MS"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "muted"
  }, detail.org), /*#__PURE__*/React.createElement(Tag, null, "Open weights"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outlineRed"
  }, "Reproducible")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => setDetail(null)
  }, "Close plate")))));
}
Object.assign(window, {
  CodeSOTA,
  CS_PAGE
});

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/codesota/Leaderboard.jsx",error:String(e.message||e)});}

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Wordmark
} = window.FabrykaDesignSystem_ec938d;
function TopRail({
  view,
  setView
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--paper)',
      borderBottom: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: 'auto',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai",
    style: {
      border: 0
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 32
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Nawigacja",
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
      fontFamily: 'var(--font-text)',
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/research"
  }, "Badania"), /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/publications"
  }, "Publikacje"), /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/doing"
  }, "Praca"), /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/platform"
  }, "Platforma API"))));
}
function PageFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--rule)',
      padding: 24,
      maxWidth: 1440,
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement("p", null, "Fabryka AI · niezależne laboratorium badawcze · Warszawa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/media"
  }, "Materiały marki"), /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/story"
  }, "Historia"), /*#__PURE__*/React.createElement("a", {
    href: "https://fabryka.ai/docs"
  }, "Dokumentacja API")));
}
Object.assign(window, {
  TopRail,
  PageFooter
});

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/website/Chrome.jsx",error:String(e.message||e)});}

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button
} = window.FabrykaDesignSystem_ec938d;
function Home({
  setView
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1440,
      margin: 'auto',
      padding: '64px 24px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "f-label"
  }, "Fabryka AI / niezależne laboratorium badawcze"), /*#__PURE__*/React.createElement("h1", {
    style: {
      maxWidth: 900,
      margin: '24px 0'
    }
  }, "Budujemy modele.", /*#__PURE__*/React.createElement("br", null), "Potem je wykorzystujemy."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 660,
      fontSize: 19,
      lineHeight: 1.7
    }
  }, "Badamy małe modele językowe, wydajną inferencję oraz polskie dane i ewaluację."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      margin: '32px 0'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "https://fabryka.ai/research"
  }, "Zobacz badania"), /*#__PURE__*/React.createElement(Button, {
    href: "https://fabryka.ai/doing",
    variant: "secondary"
  }, "Zobacz bieżącą pracę")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 24,
      marginTop: 64
    }
  }, [['01', 'Małe modele', 'Trening, tokenizacja, mieszanki danych i destylacja.', 'https://fabryka.ai/research#slm'], ['02', 'Wydajna inferencja', 'Koszt, opóźnienie i jakość na opisanym sprzęcie.', 'https://fabryka.ai/research#sys'], ['03', 'Polskie dane i ewaluacja', 'DynaWord, benchmarki i powtarzalny pomiar.', 'https://fabryka.ai/research#data']].map(([id, title, text, url]) => /*#__PURE__*/React.createElement("article", {
    key: id,
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "f-label"
  }, id, " / program badań"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 38,
      margin: '16px 0'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      marginBottom: 20
    }
  }, text), /*#__PURE__*/React.createElement("a", {
    href: url
  }, "Przeczytaj program ↗")))), /*#__PURE__*/React.createElement("p", {
    className: "f-label",
    style: {
      marginTop: 64
    }
  }, "Przykład interfejsu. Aktualne wyniki i dostępność: fabryka.ai."));
}
Object.assign(window, {
  Home
});

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/website/Home.jsx",error:String(e.message||e)});}

// ui_kits/website/Pages.jsx
try { (() => {
const {
  SectionMarker,
  ProductionPlate,
  Tabs,
  SpecTable,
  Button,
  Tag,
  MachineLog,
  Input,
  Select,
  Switch,
  Dialog,
  MetricReadout,
  StatusBadge,
  IconButton,
  Icon
} = window.FabrykaDesignSystem_ec938d;
function Production() {
  const [line, setLine] = React.useState("agents");
  const [deploy, setDeploy] = React.useState(false);
  const plates = {
    agents: {
      serial: "F-00482",
      rows: [{
        k: "Model",
        v: "Qwen3.8 27B"
      }, {
        k: "Machine",
        v: "2 × RTX 3090"
      }, {
        k: "Quantization",
        v: "AWQ"
      }, {
        k: "Context",
        v: "131,072"
      }, {
        k: "Output",
        v: "71.4 tok/s",
        accent: true
      }, {
        k: "Cost",
        v: "0.21 PLN / 1M"
      }]
    },
    chat: {
      serial: "F-00477",
      rows: [{
        k: "Model",
        v: "Bielik 11B"
      }, {
        k: "Machine",
        v: "1 × RTX 3090"
      }, {
        k: "Quantization",
        v: "FP8"
      }, {
        k: "Context",
        v: "32,768"
      }, {
        k: "Output",
        v: "138.0 tok/s",
        accent: true
      }, {
        k: "Cost",
        v: "0.09 PLN / 1M"
      }]
    },
    batch: {
      serial: "F-00461",
      rows: [{
        k: "Model",
        v: "Mistral 24B"
      }, {
        k: "Machine",
        v: "2 × RTX 3090"
      }, {
        k: "Quantization",
        v: "INT4"
      }, {
        k: "Context",
        v: "65,536"
      }, {
        k: "Output",
        v: "91.5 tok/s",
        accent: true
      }, {
        k: "Cost",
        v: "0.19 PLN / 1M"
      }]
    }
  };
  const p = plates[line];
  return /*#__PURE__*/React.createElement("main", {
    className: "f-grid",
    style: {
      ...window.PAGE,
      paddingTop: 40,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "3px solid var(--rule)",
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "§01 Production — inference & routing"), /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "OpenAI compatible · api.fabryka.ai/v1")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 88,
      marginTop: 24,
      maxWidth: "18ch"
    }
  }, "More intelligence", /*#__PURE__*/React.createElement("br", null), "per GPU", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 24,
      marginTop: 40,
      borderTop: "1px solid var(--rule)",
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(MetricReadout, {
    value: "04",
    unit: "lines",
    label: "Production lines",
    size: "md"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "41.2M",
    unit: "tokens",
    label: "Served / 30d",
    size: "md"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "118",
    unit: "ms",
    label: "TTFT p50",
    size: "md",
    accent: true
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "99.94",
    unit: "%",
    label: "Uptime",
    size: "md"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    number: "01.1",
    title: "Lines",
    meta: "Select a line"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      value: "agents",
      label: "Agents"
    }, {
      value: "chat",
      label: "Chat"
    }, {
      value: "batch",
      label: "Batch"
    }],
    value: line,
    onChange: setLine
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "360px 1fr",
      gap: 40,
      marginTop: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(ProductionPlate, {
    title: "PRODUCTION PLATE",
    serial: p.serial,
    rows: p.rows,
    status: "live",
    tested: "03 SEP 2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(MachineLog, {
    title: "Route " + line,
    lines: [{
      k: "Endpoint",
      v: "POST /v1/chat/completions"
    }, {
      k: "Model id",
      v: "fabryka/" + line
    }, {
      k: "Stream",
      v: "SSE"
    }, {
      k: "Rate",
      v: "600 RPM"
    }, {
      k: "Status",
      v: "RUNNING",
      ok: true
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Endpoint",
    defaultValue: "https://api.fabryka.ai/v1",
    wrapStyle: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "copy",
    label: "Copy endpoint"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setDeploy(true)
  }, "Deploy model"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    number: "01.2",
    title: "Economics",
    meta: "Published, per million tokens"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(SpecTable, {
    figure: "TAB. 02",
    caption: "Price list — PLN per 1M tokens, September 2026",
    columns: [{
      key: "model",
      label: "Model"
    }, {
      key: "line",
      label: "Line"
    }, {
      key: "quant",
      label: "Quant"
    }, {
      key: "inp",
      label: "Input"
    }, {
      key: "out",
      label: "Output"
    }, {
      key: "tok",
      label: "Tok/s"
    }, {
      key: "state",
      label: "State",
      align: "right"
    }],
    rows: [{
      model: "Bielik 11B",
      line: "chat",
      quant: "FP8",
      inp: "0.05",
      out: "0.09",
      tok: "138.0",
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: "live"
      })
    }, {
      model: "Llama 4 17B",
      line: "agents",
      quant: "AWQ",
      inp: "0.09",
      out: "0.17",
      tok: "104.2",
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: "live"
      })
    }, {
      model: "Qwen3.8 27B",
      line: "agents",
      quant: "AWQ",
      inp: "0.11",
      out: "0.21",
      tok: "82.4",
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: "live"
      })
    }, {
      model: "Mistral 24B",
      line: "batch",
      quant: "INT4",
      inp: "0.10",
      out: "0.19",
      tok: "91.5",
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: "warn"
      })
    }, {
      model: "Slayer 1B",
      line: "lab",
      quant: "FP16",
      inp: "—",
      out: "—",
      tok: "412.0",
      state: /*#__PURE__*/React.createElement(StatusBadge, {
        state: "queued"
      })
    }]
  }))), /*#__PURE__*/React.createElement(Dialog, {
    open: deploy,
    title: "Deploy model",
    docNumber: "DOC 004",
    onClose: () => setDeploy(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => setDeploy(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => setDeploy(false)
    }, "Enter production"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Model",
    defaultValue: "qwen3.8-27b"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Line",
    options: ["agents", "chat", "batch"]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Quantization",
    options: ["AWQ", "FP8", "INT4"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true,
    label: "Autoscale"
  }), /*#__PURE__*/React.createElement(Tag, {
    tone: "muted"
  }, "2 × RTX 3090 available")))));
}
function Laboratory() {
  return /*#__PURE__*/React.createElement("main", {
    className: "f-grid",
    style: {
      ...window.PAGE,
      paddingTop: 40,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "3px solid var(--rule)",
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "§02 Laboratory — optimisation & post-training"), /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "21 experiments / 2026")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 88,
      marginTop: 24,
      maxWidth: "20ch"
    }
  }, "Every change is", /*#__PURE__*/React.createElement("br", null), "an experiment", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      marginTop: 44
    }
  }, [["021", "INT4 vs FP8 batching efficiency", "RUNNING", ["Machine F-WAW-3090-04", "Batch 1–64", "12 h elapsed"]], ["020", "Speculative decoding on 27B", "PASS", ["Draft: Slayer 1B", "+18.4% decode", "Shipped to line 03"]], ["019", "Polish tokenizer compaction", "PASS", ["−7.2% tokens / doc", "No quality delta", "Merged"]], ["018", "AWQ recalibration, 27B", "FAIL", ["−2.1 pts legal QA", "Reverted", "Notes published"]]].map(([n, t, s, meta]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      border: "1px solid var(--rule)",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 12px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "Experiment ", n), /*#__PURE__*/React.createElement(StatusBadge, {
    state: s === "RUNNING" ? "running" : s === "PASS" ? "pass" : "fail"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "f-mono",
    style: {
      fontSize: 15
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "4px 16px"
    }
  }, meta.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    className: "f-label"
  }, m))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    number: "02.1",
    title: "Model shelf",
    meta: "Open weights, published on Hugging Face"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(SpecTable, {
    figure: "TAB. 04",
    caption: "Fabryka Laboratory checkpoints",
    columns: [{
      key: "id",
      label: "Checkpoint"
    }, {
      key: "base",
      label: "Base"
    }, {
      key: "params",
      label: "Params"
    }, {
      key: "quant",
      label: "Quant"
    }, {
      key: "note",
      label: "Note",
      align: "right"
    }],
    rows: [{
      id: "fabryka/qwen3.8-27b-awq",
      base: "Qwen3.8",
      params: "27B",
      quant: "AWQ",
      note: "Line 03"
    }, {
      id: "fabryka/bielik-11b-fp8",
      base: "Bielik",
      params: "11B",
      quant: "FP8",
      note: "Line 01"
    }, {
      id: "fabryka/slayer-1b",
      base: "Slayer series",
      params: "1B",
      quant: "FP16",
      note: "Draft model"
    }]
  }))));
}
Object.assign(window, {
  Production,
  Laboratory
});

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/website/Pages.jsx",error:String(e.message||e)});}

// ui_kits/website/_archive/Home.v1.jsx
try { (() => {
const {
  MetricReadout,
  ProductionPlate,
  MachineLog,
  FigureFrame,
  SectionMarker,
  Button,
  Tag,
  Icon,
  StatusBadge,
  SpecTable
} = window.FabrykaDesignSystem_ec938d;
const PAGE = {
  maxWidth: 1440,
  margin: "0 auto",
  padding: "0 40px"
};
function Home({
  setView
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...PAGE,
      paddingTop: 40,
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "3px solid var(--rule)",
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "Open model factory — production 01"), /*#__PURE__*/React.createElement("span", {
    className: "f-label"
  }, "§00 — Warsaw / 2026")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 132,
      marginTop: 28,
      maxWidth: "16ch"
    }
  }, "We turn GPUs", /*#__PURE__*/React.createElement("br", null), "into intelligence", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 380px",
      gap: 48,
      marginTop: 40,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: "52ch"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19
    }
  }, "Open-weight inference, routing, measurement and applied research. Named machines in Warsaw, measured output, visible provenance."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 13
    })
  }, "Read the docs"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setView("production")
  }, "Current production")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "carbon"
  }, "OpenAI compatible"), /*#__PURE__*/React.createElement(Tag, null, "Open weights"), /*#__PURE__*/React.createElement(Tag, null, "EU / Warsaw"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outlineRed"
  }, "Measured"))), /*#__PURE__*/React.createElement(ProductionPlate, {
    title: "PRODUCTION PLATE",
    serial: "F-00482",
    status: "live",
    tested: "03 SEP 2026",
    rows: [{
      k: "Model",
      v: "Qwen3.8 27B"
    }, {
      k: "Route",
      v: "agents"
    }, {
      k: "Machine",
      v: "2 × RTX 3090"
    }, {
      k: "Quantization",
      v: "AWQ"
    }, {
      k: "Context",
      v: "131,072"
    }, {
      k: "Output",
      v: "71.4 tok/s",
      accent: true
    }, {
      k: "Cost",
      v: "0.21 PLN / 1M"
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    "data-theme": "carbon",
    style: {
      background: "var(--carbon)",
      color: "var(--paper)",
      padding: "56px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: PAGE
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderTop: "1px solid rgba(241,239,232,.28)",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "f-label",
    style: {
      color: "var(--paper)"
    }
  }, "Current production"), /*#__PURE__*/React.createElement(StatusBadge, {
    state: "live"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 24,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(MetricReadout, {
    value: "04",
    unit: "models",
    label: "In production",
    size: "lg"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "82.7",
    unit: "tok/s",
    label: "Decode mean",
    size: "lg",
    accent: true
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "41.2M",
    unit: "tokens",
    label: "Last 30 days",
    size: "lg"
  }), /*#__PURE__*/React.createElement(MetricReadout, {
    value: "99.94",
    unit: "%",
    label: "Uptime 30d",
    size: "lg"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...PAGE,
      paddingTop: 56,
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement(FigureFrame, {
    figure: "FIG. 01",
    caption: "Machine hall F-WAW-002",
    annotations: ["NVIDIA RTX 3090 × 8", "192 GB VRAM", "Photographed 2026-09-03"],
    ratio: "16 / 6"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...PAGE,
      paddingBottom: 72,
      display: "flex",
      flexDirection: "column",
      gap: 44
    }
  }, [["01", "Production", "Inference, routing and the API. Open weights served on known hardware with published economics.", "production"], ["02", "Laboratory", "Quantization, post-training and experiments. Every change is an experiment with a number.", "laboratory"], ["03", "Measurement", "CodeSOTA measures models — including ours. Suites, methodology and raw results in public.", "codesota"]].map(([n, t, d, v]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    number: n,
    title: t,
    meta: n === "03" ? "A Fabryka project" : "Warsaw"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      marginTop: 18,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      maxWidth: "46ch"
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setView(v),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 12
    })
  }, "Open ", t.toLowerCase())))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...PAGE,
      paddingBottom: 80,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(MachineLog, {
    title: "Line 03 — live",
    lines: [{
      k: "Model",
      v: "QWEN3.8-27B"
    }, {
      k: "Machine",
      v: "F-WAW-3090-04"
    }, {
      k: "Quant",
      v: "FP8"
    }, {
      k: "Batch",
      v: "24"
    }, {
      k: "Decode",
      v: "82.4 TOK/S",
      accent: true
    }, {
      k: "Status",
      v: "RUNNING",
      ok: true
    }, {
      k: "Updated",
      v: "02:31:08 CET"
    }]
  }), /*#__PURE__*/React.createElement(SpecTable, {
    figure: "TAB. 01",
    caption: "Production lines — 30-day mean",
    columns: [{
      key: "line",
      label: "Line"
    }, {
      key: "model",
      label: "Model"
    }, {
      key: "tok",
      label: "Tok/s"
    }, {
      key: "cost",
      label: "PLN / 1M"
    }],
    rows: [{
      line: "01",
      model: "Bielik 11B",
      tok: "138.0",
      cost: "0.09"
    }, {
      line: "02",
      model: "Llama 4 17B",
      tok: "104.2",
      cost: "0.17"
    }, {
      line: "03",
      model: "Qwen3.8 27B",
      tok: "82.4",
      cost: "0.21"
    }, {
      line: "04",
      model: "Mistral 24B",
      tok: "91.5",
      cost: "0.19"
    }]
  })));
}
Object.assign(window, {
  Home,
  PAGE
});

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/website/_archive/Home.v1.jsx",error:String(e.message||e)});}

// ui_kits/website/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();

})(); } catch(e){__ds_ns.__errors.push({path:"ui_kits/website/doc-page.js",error:String(e.message||e)});}

})();
