/** Machine-label tag for routes, quantizations, lines, model families. */
export interface TagProps {
  children?: React.ReactNode;
  tone?: "default" | "muted" | "red" | "carbon" | "outlineRed";
  size?: "sm" | "md";
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
