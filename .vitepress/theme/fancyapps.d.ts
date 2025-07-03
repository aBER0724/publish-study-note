declare module '@fancyapps/ui' {
  export interface FancyboxOptions {
    Toolbar?: {
      display?: {
        left?: string[];
        middle?: string[];
        right?: string[];
      };
    };
    Images?: {
      zoom?: boolean;
    };
    closeButton?: string;
    caption?: (fancybox: any, carousel: any, slide: any) => string;
  }

  export class Fancybox {
    static bind(selector: string, options?: FancyboxOptions): void;
    static destroy(): void;
  }
}

declare module '@fancyapps/ui/dist/fancybox/fancybox.css' {
  const content: string;
  export default content;
} 