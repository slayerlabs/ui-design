/** Hairline square panel with an optional mono header rail and corner index. */
export interface CardProps {
  /** Left-hand rail label, mono caps. */
  label?: string;
  /** Right-hand rail index, e.g. "004". */
  index?: string;
  tone?: "paper" | "flat" | "carbon" | "red";
  pad?: string | number;
  hoverable?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
