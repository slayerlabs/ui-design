/** Inspection stamp for anything that passed the evaluation pipeline. Pass/fail lines only. */
export interface TestStampProps {
  /** Facility code, e.g. "F/WAW". */
  code?: string;
  /** Test number, e.g. "0271". */
  number?: string;
  checks?: Array<{ k: string; v: string }>;
  tone?: "red" | "carbon";
  style?: React.CSSProperties;
}
export function TestStamp(props: TestStampProps): JSX.Element;
