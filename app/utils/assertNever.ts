/**
 * Compile-time exhaustiveness check for a discriminated union: a `default`
 * branch calling this stops compiling as soon as a new variant is added.
 *
 * It returns instead of throwing because a session restored from AsyncStorage
 * may carry a variant written by a newer build. Rendering a placeholder keeps
 * the report readable; throwing would take the whole screen down.
 */
export function assertNever(value: never): string {
  console.warn("Tipo de interação não suportado:", value);
  return "[registro não suportado]";
}
