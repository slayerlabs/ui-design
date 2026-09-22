/** Numbered tab rail (01 / 02 / 03) with a red active underline.
 * @startingPoint section="Navigation" subtitle="Tab rail + section markers" viewport="700x240" */
export interface TabsProps {
  tabs?: Array<string | { value: string; label: string }>;
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  /** Prefix each tab with a two-digit index. Default true. */
  numbered?: boolean;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;
