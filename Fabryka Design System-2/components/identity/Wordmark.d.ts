/** The FABRYKA. wordmark, set in type. Never redrawn, never given a symbol.
 * @startingPoint section="Brand" subtitle="Wordmark + F. mark lockups" viewport="700x200" */
export interface WordmarkProps {
  /** Cap height in px. Default 32. */
  size?: number;
  /** Overrides the letterform color. Defaults to currentColor. */
  color?: string;
  /** The period is red by default — it is the mark's one accent. */
  periodColor?: string;
  /** Optional mono suffix, e.g. "OPEN MODEL FACTORY". */
  unit?: string;
  /** Optional territory, e.g. "WARSAW / PL". */
  place?: string;
  tone?: "auto" | "paper" | "inverse";
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export function Wordmark(props: WordmarkProps): JSX.Element;
export interface FmarkProps {
  size?: number;
  tone?: "red" | "carbon" | "outline";
  style?: React.CSSProperties;
}
/** The secondary F. mark — stamped on machines, avatars, stickers. */
export function Fmark(props: FmarkProps): JSX.Element;
