import { BodyMapContent, PainContent } from "@/types/interaction.types";

export function formatPainRecord(content: PainContent): string {
  return `Dor relatada: ${content.severity} (${content.level + 1}/${content.levelCount})`;
}

export function formatBodyMapRecord(content: BodyMapContent): string {
  return `Dor: ${content.regions.map((region) => region.label).join(", ")}`;
}
