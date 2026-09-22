/** Square mono-caps button. Red = the one action that matters on a page.
 * @startingPoint section="Core" subtitle="Buttons, tags, status, cards" viewport="700x260" */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = Fabryka red, solid = carbon, secondary = hairline, ghost = bare. */
  variant?: "primary" | "solid" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  block?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
