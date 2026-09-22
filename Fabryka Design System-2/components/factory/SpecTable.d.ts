/** Measurement table styled like a figure in an equipment manual. */
export interface SpecTableProps {
  columns?: Array<{ key: string; label: string; align?: "left" | "right" | "center" }>;
  rows?: Array<Record<string, React.ReactNode>>;
  /** Figure number, red, e.g. "TAB. 03". */
  figure?: string;
  caption?: string;
  dense?: boolean;
  style?: React.CSSProperties;
}
export function SpecTable(props: SpecTableProps): JSX.Element;
