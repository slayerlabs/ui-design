/** Square modal with a carbon header rail and a document number. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  /** Mono document number in the header rail, e.g. "DOC 004". */
  docNumber?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number | string;
  style?: React.CSSProperties;
}
export function Dialog(props: DialogProps): JSX.Element;
