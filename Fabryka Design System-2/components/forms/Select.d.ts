/** Native select in Fabryka chassis; caret is a mono glyph. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Array<string | { value: string; label: string }>;
  hint?: string;
  size?: "sm" | "md" | "lg";
  wrapStyle?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
