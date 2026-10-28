import "react-native-svg";

declare module "react-native-svg" {
  export interface AccessibilityProps {
    accessibilityRole?: string;
    accessibilityState?: {
      selected?: boolean;
      disabled?: boolean;
      [key: string]: unknown;
    };
  }
}
