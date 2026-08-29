import { InteractionEntry } from "@/types/interaction.types";
import { Term } from "@/types/term.types";
import { formatDateBR, formatTimeBR } from "@/utils/dateFormatter";
import { useMemo } from "react";

export function useClipboard(interactions: InteractionEntry[]): string {
  return useMemo(() => {
    const consultationDate =
      interactions.length > 0
        ? formatDateBR(interactions[0].timestamp)
        : formatDateBR(new Date().toISOString());

    const body = interactions
      .map((interaction) => {
        const isPatient = interaction.speaker === "patient";
        const speaker = isPatient ? "Paciente" : "Profissional";
        const time = formatTimeBR(interaction.timestamp);
        let content = "";
        switch (interaction.type) {
          case "text":
            content += `${speaker} (${time}): \n${interaction.content}`;
            break;
          case "term":
            content += `${speaker} (${time}): \n${(interaction.content as Term[])
              .map((t) => t.description)
              .join(" -> ")}`;
            break;
        }

        if (!interaction.understood) {
          content += "\nNão entendi";
        }

        return content;
      })
      .join("\n\n");
    return `Relatório - ${consultationDate}:\n\n${body}`;
  }, [interactions]);
}
