/** Mono text field with a caps label above. Values are typed in mono — they are data.
 * @startingPoint section="Core" subtitle="Fields, selects, checks, switches" viewport="700x300" */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Shows in red and outlines the field. */
  error?: string;
  prefix?: React.ReactNode;
  /** Trailing unit, e.g. "TOK/S". */
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  wrapStyle?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
