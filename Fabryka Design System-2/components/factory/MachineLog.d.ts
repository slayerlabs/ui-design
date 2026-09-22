/** Aligned key-value machine output on carbon — the "machine layer" of the identity. */
export interface MachineLogProps {
  title?: string;
  /** Key-value lines (keys auto-uppercased and column-aligned) or raw strings. */
  lines?: Array<string | { k: string; v: React.ReactNode; accent?: boolean; ok?: boolean }>;
  tone?: "carbon" | "paper";
  pad?: number;
  style?: React.CSSProperties;
}
export function MachineLog(props: MachineLogProps): JSX.Element;
