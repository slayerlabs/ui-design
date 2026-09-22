/** Huge measured number with mono unit + caption. The brand's hero graphic.
 * @startingPoint section="Brand" subtitle="Metric readouts, stamps, figures" viewport="700x260" */
export interface MetricReadoutProps {
  value: React.ReactNode;
  /** e.g. "TOK/S", "GB", "PLN / 1M". */
  unit?: string;
  label?: string;
  note?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right";
  accent?: boolean;
  style?: React.CSSProperties;
}
export function MetricReadout(props: MetricReadoutProps): JSX.Element;
