/** Padding between the faces card edge and the first/last face. */
export const CARD_PADDING = 12;

/** Face diameter is derived from available height, then clamped to this range. */
const FACE_MIN = 40;
const FACE_MAX = 72;

/**
 * Fraction of each face's vertical slot actually occupied by the face,
 * leaving the remainder as the gap between faces.
 */
const FACE_FILL_RATIO = 0.86;

export function faceSizeFor(height: number, count: number): number {
  "worklet";
  const slot = Math.max(0, (height - 2 * CARD_PADDING) / count);
  const ideal = Math.min(FACE_MAX, Math.max(FACE_MIN, slot * FACE_FILL_RATIO));
  return Math.min(ideal, slot);
}

/** y of the topmost face/tick centre. The position of value 1. */
export function travelTop(height: number, count: number): number {
  "worklet";
  return CARD_PADDING + faceSizeFor(height, count) / 2;
}

/** y of the bottommost face/tick centre. The position of value 0. */
export function travelBottom(height: number, count: number): number {
  "worklet";
  return height - CARD_PADDING - faceSizeFor(height, count) / 2;
}

/** Usable travel in px (he distance the thumb can cover). */
export function travelLength(height: number, count: number): number {
  "worklet";
  return travelBottom(height, count) - travelTop(height, count);
}

export function valueToY(value: number, height: number, count: number): number {
  "worklet";
  return travelBottom(height, count) - value * travelLength(height, count);
}

export function yToValue(y: number, height: number, count: number): number {
  "worklet";
  const length = travelLength(height, count);
  if (length <= 0) return 0;
  const raw = (travelBottom(height, count) - y) / length;
  return Math.min(1, Math.max(0, raw));
}

export function nearestIndexFor(value: number, count: number): number {
  "worklet";
  return Math.round(value * (count - 1));
}
