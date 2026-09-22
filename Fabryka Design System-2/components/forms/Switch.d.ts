/** Industrial rocker switch with an ON/OFF legend. Square travel, no bounce. */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  /** Replaces the ON/OFF legend. */
  label?: string;
  legend?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): JSX.Element;
