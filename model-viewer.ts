// model-viewer.d.ts
// Custom JSX type declaration so TypeScript recognizes <model-viewer />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      "disable-tap"?: boolean;
      "ar"?: boolean;
      "ar-modes"?: string;
      poster?: string;
      exposure?: string | number;
      "shadow-intensity"?: string | number;
    };
  }
}
