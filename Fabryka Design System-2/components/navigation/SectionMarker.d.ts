/** Section head: heavy rule + section number + condensed caps title + meta. */
export interface SectionMarkerProps {
  /** Rendered as "section 01" with a red section sign. */
  number?: string;
  title: string;
  /** Right-hand mono meta, e.g. "WARSAW / 2026". */
  meta?: string;
  rule?: "heavy" | "hair";
  style?: React.CSSProperties;
}
export function SectionMarker(props: SectionMarkerProps): JSX.Element;
