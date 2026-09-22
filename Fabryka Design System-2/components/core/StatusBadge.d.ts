/** Live machine state with an LED dot. The ONLY place signal green is allowed. */
export interface StatusBadgeProps {
  state?: "live" | "running" | "pass" | "fail" | "warn" | "queued" | "offline";
  /** Overrides the default caps label for the state. */
  label?: string;
  showDot?: boolean;
  style?: React.CSSProperties;
}
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
