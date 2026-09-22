/** The signature Fabryka device: a riveted machine plate in HTML. Use it for models,
 * machines, releases, benchmark cards, social graphics and slides.
 * @startingPoint section="Brand" subtitle="Production plate — the core brand device" viewport="700x400" */
export interface ProductionPlateProps {
  /** Plate kind, mono caps. e.g. "PRODUCTION PLATE", "MACHINE PLATE". */
  title?: string;
  /** Serial, always red. e.g. "F-00482". */
  serial?: string;
  /** Territory stamp, top right. Default "PL/WAW". */
  territory?: string;
  /** Spec rows. accent renders the value in red. */
  rows?: Array<{ k: string; v: React.ReactNode; accent?: boolean }>;
  status?: "live" | "running" | "pass" | "fail" | "warn" | "queued" | "offline";
  /** Footer date, e.g. "03 SEP 2026". */
  tested?: string;
  tone?: "paper" | "carbon";
  width?: number | string;
  style?: React.CSSProperties;
}
export function ProductionPlate(props: ProductionPlateProps): JSX.Element;
