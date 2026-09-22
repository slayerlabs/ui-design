/** Lucide glyph (CDN, CSS-masked so it inherits currentColor). Use sparingly. */
export interface IconProps {
  /** Lucide icon name, kebab-case, e.g. "arrow-right", "cpu". */
  name: string;
  /** Box size in px. Default 16. */
  size?: number;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
