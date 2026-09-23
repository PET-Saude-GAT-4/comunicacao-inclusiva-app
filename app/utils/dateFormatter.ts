/**
 * Formats an ISO timestamp string to Brazilian date format.
 * @example "2026-06-06T18:40:00.000Z" → "06/06/2026 15:40"
 */
export function formatTimestampBR(timestamp: string): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Formats an ISO timestamp string to short Brazilian date (no time).
 * @example "2026-06-06T18:40:00.000Z" → "06/06/2026"
 */
export function formatDateBR(timestamp: string): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formats an ISO timestamp string to time only.
 * @example "2026-06-06T18:40:00.000Z" → "15:40"
 */
export function formatTimeBR(timestamp: string): string {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
