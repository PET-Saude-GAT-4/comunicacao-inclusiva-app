import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiTriageStep, TriageStep } from "@/types/triage.types";

export const triageAdapter = {
  toTriageStep(apiData: ApiTriageStep): TriageStep {
    return {
      uuid: apiData.uuid,
      level: apiData.level,
      board: boardAdapter.toBoard(apiData.board),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
