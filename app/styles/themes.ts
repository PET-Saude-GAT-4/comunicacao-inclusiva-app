/**
 * Base palette. Split out only so derived groups below (e.g. painScale) can
 * reference these values instead of repeating their hexes.
 */
const CORE = {
  primary: "#78d6c7",
  primaryDark: "#006B5F",
  secondary: "#814C77",
  background: "#F4FBF8",
  surface: {
    primary: "#F4FBF8",
    secondary: "#DAE5E1",
    secondaryDark: "#394f46",
  },
  outlineCommon: "#BEC9C5",
  text: {
    onPrimary: "#313937",
    onPrimaryDark: "#FFFFFF",
    onPrimaryVariant: "#6F7976",
    onPrimaryDarkVariant: "#D1D1D1",
    onSecondary: "#FFFFFF",
  },
};

export const COLORS = {
  ...CORE,
  painScale: {
    panelBg: CORE.background,
    cardBg: "#FFFFFF",
    cardBorder: CORE.outlineCommon,
    track: CORE.surface.secondary,
    tick: CORE.text.onPrimaryVariant,
    thumb: CORE.primaryDark,
    scrim: "rgba(0, 0, 0, 0.4)",
    submitBg: CORE.primaryDark,
    submitFg: CORE.text.onPrimaryDark,
  },
  // Misc
  errorPrimary: "#BA1A1A",
  errorSecondary: "#ba1a1a3c",
  success: "#078809",
  successSecondary: "#0788093c",
};

export const CONTAINERS = {
  spacings: {
    xs: 4,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  sizes: {
    xs: 16,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    xxl: 148,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
};

export const TYPOGRAPHY = {
  font: {
    title: "Roboto",
    body: "Inter",
  },
  sizes: {
    small: 9,
    body: 14,
    bodyEmph: 16,
    heading: 20,
    title: 36,
    extravagantTitle: 42,
  },
  weights: {
    regular: "400",
    medium: "500",
    bold: "700",
  } as const,
};

// To be added later into development
export const SHADOW = {
  small: {},
  medium: {},
  large: {},
};
