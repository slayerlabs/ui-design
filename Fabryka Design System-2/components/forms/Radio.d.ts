/** Radio group with square markers (no circles outside status LEDs). */
export interface RadioProps {
  name?: string;
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  direction?: "row" | "column";
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;
