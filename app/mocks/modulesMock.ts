import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

// The emergency specialty modules have no counterpart in the API seed yet, so
// they stay app-side fabricated content: the board definitions below are the
// ones the app already shipped.
export const moduleBoardTermsMock: Record<string, Term[]> = {
  "module-board-quick-emergency-level-3": [
    TERMS["shortness-of-breath"],
    TERMS["bleeding-cut"],
    TERMS["vehicle-crash"],
    TERMS["animal-bite"],
    TERMS.allergy,
    TERMS["sharp-pain"],
  ],
  "module-board-quick-emergency-level-2": [
    TERMS.fever,
    TERMS.dizziness,
    TERMS.tingling,
    TERMS.nausea,
    TERMS.confused,
    TERMS.malaise,
  ],
  "module-board-quick-emergency-level-1": [
    TERMS.fatigue,
    TERMS.cold,
    TERMS.irritated,
    TERMS.anxious,
    TERMS.afraid,
    TERMS.sad,
  ],
};

// CatEmergencyScreen selects these by matching "module" in the uuid, so the
// prefix is load-bearing.
export const emergencyBoardsMock: Board[] = [
  createBoard(
    5,
    "module-board-quick-emergency-level-3",
    "Cardiologia",
    TERMS.heart,
    moduleBoardTermsMock["module-board-quick-emergency-level-3"],
  ),
  createBoard(
    6,
    "module-board-quick-emergency-level-2",
    "Neurologia",
    TERMS.head,
    moduleBoardTermsMock["module-board-quick-emergency-level-2"],
  ),
  createBoard(
    7,
    "module-board-quick-emergency-level-1",
    "Ortopedia",
    TERMS.leg,
    moduleBoardTermsMock["module-board-quick-emergency-level-1"],
  ),
];
