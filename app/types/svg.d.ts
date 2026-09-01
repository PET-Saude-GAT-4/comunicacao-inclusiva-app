declare module "react-native-svg" {
  import type { ComponentType } from "react";
  import type { SvgProps as RNSSvgProps } from "react-native-svg";
  export interface SvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    color?: string;
    title?: string;
    children?: any;
    [key: string]: any;
  }
  export const Svg: ComponentType<SvgProps>;
}

declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}
