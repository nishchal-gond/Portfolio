// @splidejs/react-splide ships types, but its package.json "exports" hides them
// from TypeScript's module resolution. Declare the parts this project uses.
declare module "@splidejs/react-splide" {
  import type { ComponentProps, FC, ReactNode } from "react";

  export const Splide: FC<
    Omit<ComponentProps<"div">, "onMove"> & {
      options?: Record<string, unknown>;
      hasTrack?: boolean;
      children?: ReactNode;
    }
  >;
  export const SplideSlide: FC<ComponentProps<"li">>;
  export const SplideTrack: FC<ComponentProps<"div">>;
}
