/** Annotated figure frame for hardware photography or technical charts.
 * Leave src empty to hold space for a real photograph. */
export interface FigureFrameProps {
  src?: string;
  alt?: string;
  /** Red corner tab, e.g. "FIG. 04". */
  figure?: string;
  caption?: string;
  /** Mono caps annotation run under the frame. */
  annotations?: string[];
  ratio?: string;
  /** Desaturates the image, per the brand's documentary photography rule. Default true. */
  grayscale?: boolean;
  style?: React.CSSProperties;
}
export function FigureFrame(props: FigureFrameProps): JSX.Element;
