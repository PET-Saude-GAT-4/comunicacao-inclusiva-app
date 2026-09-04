import type React from "react";
import type { SvgProps } from "react-native-svg";

export interface ScaleItem {
  value: number;
  Face: React.FC<SvgProps>;
  label: string;
  severity: string;
}

export interface PainScaleSubmission {
  value: number;
  nearestIndex: number;
}
