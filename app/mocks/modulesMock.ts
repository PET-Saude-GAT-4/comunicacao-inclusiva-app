import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

// The emergency specialty modules have no counterpart in the API seed yet, so
// they stay app-side fabricated content: the board definitions below are the
// ones the app already shipped.
export const moduleBoardTermsMock: Record<string, Term[]> = {
  "module-board-5": [
    TERMS.heart,
    TERMS.lung,
    TERMS["shortness-of-breath"],
    TERMS.fatigue,
    TERMS.dizziness,
  ],
  "module-board-6": [
    TERMS.head,
    TERMS.eyes,
    TERMS.ear,
    TERMS.dizziness,
    TERMS.confused,
    TERMS.tingling,
  ],
  "module-board-7": [TERMS.arm, TERMS.leg, TERMS.foot, TERMS.back, TERMS.head],
  "module-board-8": Object.values(TERMS),
};

// CatEmergencyScreen selects these by matching "module" in the uuid, so the
// prefix is load-bearing.
export const emergencyBoardsMock: Board[] = [
  createBoard(
    5,
    "module-board-5",
    "Cardiologia",
    TERMS.heart,
    moduleBoardTermsMock["module-board-5"],
  ),
  createBoard(
    6,
    "module-board-6",
    "Neurologia",
    TERMS.head,
    moduleBoardTermsMock["module-board-6"],
  ),
  createBoard(
    7,
    "module-board-7",
    "Ortopedia",
    TERMS.leg,
    moduleBoardTermsMock["module-board-7"],
  ),
  createBoard(
    8,
    "module-board-8",
    "Geral",
    TERMS.malaise,
    moduleBoardTermsMock["module-board-8"],
  ),
];
