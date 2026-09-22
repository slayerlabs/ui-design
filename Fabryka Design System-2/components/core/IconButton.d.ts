/** 1:1 square icon button. Always give it a label — it becomes aria-label + title. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name or a node. */
  icon: string | React.ReactNode;
  label: string;
  variant?: "primary" | "solid" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}
export function IconButton(props: IconButtonProps): JSX.Element;
