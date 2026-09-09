import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

// The emergency specialty modules have no counterpart in the API seed yet, so
// they stay app-side fabricated content: the board definitions below are the
// ones the app already shipped.
export const moduleBoardTermsMock: Record<string, Term[]> = {
  "module-board-quick-emergency-1": [
    TERMS.heart,
    TERMS.lung,
    TERMS["shortness-of-breath"],
    TERMS.fatigue,
    TERMS.dizziness,
  ],
  "module-board-quick-emergency-2": [
    TERMS.head,
    TERMS.eyes,
    TERMS.ear,
    TERMS.dizziness,
    TERMS.confused,
    TERMS.tingling,
  ],
  "module-board-quick-emergency-3": [
    TERMS.arm,
    TERMS.leg,
    TERMS.foot,
    TERMS.back,
    TERMS.head,
  ],
  "module-board-quick-emergency-4": Object.values(TERMS),
};

// CatEmergencyScreen selects these by matching "module" in the uuid, so the
// prefix is load-bearing.
export const emergencyBoardsMock: Board[] = [
  createBoard(
    "module-board-quick-emergency-1",
    "Cardiologia",
    TERMS.heart,
    moduleBoardTermsMock["module-board-quick-emergency-1"],
  ),
  createBoard(
    "module-board-quick-emergency-2",
    "Neurologia",
    TERMS.head,
    moduleBoardTermsMock["module-board-quick-emergency-2"],
  ),
  createBoard(
    "module-board-quick-emergency-3",
    "Ortopedia",
    TERMS.leg,
    moduleBoardTermsMock["module-board-quick-emergency-3"],
  ),
  createBoard(
    "module-board-quick-emergency-4",
    "Geral",
    TERMS.malaise,
    moduleBoardTermsMock["module-board-quick-emergency-4"],
  ),
];
