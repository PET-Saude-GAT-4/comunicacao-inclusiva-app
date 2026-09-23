import { COLORS } from "./themes";

export const primaryButtonProps = {
  buttonColor: COLORS.primaryDark,
  textColor: COLORS.text.onPrimaryDark,
  mode: "contained",
} as const;

export const secondaryButtonProps = {
  buttonColor: COLORS.secondary,
  textColor: COLORS.text.onPrimaryDark,
  mode: "contained",
} as const;

export const textInputAreaProps = {
  activeOutlineColor: COLORS.primaryDark,
  outlineStyle: {
    borderRadius: 24,
  },
  textColor: "black",
  mode: "outlined",
  placeholderTextColor: "#6F7976",
} as const;

export const keyboardAvoidantView = {
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: "handled",
} as const;
