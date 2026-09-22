/** Instant carbon mono tooltip. No fade, no delay theatre.
 * @startingPoint section="Feedback" subtitle="Dialog + tooltip" viewport="700x260" */
export interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): JSX.Element;
