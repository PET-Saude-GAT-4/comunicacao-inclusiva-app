import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";
import { TriageStep } from "@/types/triage.types";

// Emergency boards and triage levels come from the API; the definitions below,
// which its seed mirrors, keep the emergency tab usable offline and before
// anything has been synced.
export const moduleBoardTermsMock: Record<string, Term[]> = {
  // Quick Emergency triage levels
  "triage-board-level-1": [
    TERMS["shortness-of-breath"],
    TERMS["bleeding-cut"],
    TERMS["vehicle-crash"],
    TERMS["animal-bite"],
    TERMS.allergy,
    TERMS["sharp-pain"],
  ],
  "triage-board-level-2": [
    TERMS.fever,
    TERMS.dizziness,
    TERMS.tingling,
    TERMS.nausea,
    TERMS.confused,
    TERMS.malaise,
  ],
  "triage-board-level-3": [
    TERMS.fatigue,
    TERMS.cold,
    TERMS.irritated,
    TERMS.anxious,
    TERMS.afraid,
    TERMS.sad,
  ],

  // Categorized Emergency specialties
  "module-board-cat-emergency-cardiologia": [
    TERMS.heart,
    TERMS.lung,
    TERMS["shortness-of-breath"],
    TERMS.fatigue,
    TERMS.dizziness,
    TERMS["sharp-pain"],
  ],
  "module-board-cat-emergency-neurologia": [
    TERMS.head,
    TERMS.eyes,
    TERMS.ear,
    TERMS.dizziness,
    TERMS.confused,
    TERMS.tingling,
  ],
  "module-board-cat-emergency-ortopedia": [
    TERMS.arm,
    TERMS.leg,
    TERMS.foot,
    TERMS.back,
    TERMS["sharp-pain"],
    TERMS["bleeding-cut"],
  ],
  "module-board-cat-emergency-geral": [
    TERMS.malaise,
    TERMS.fever,
    TERMS.nausea,
    TERMS.allergy,
    TERMS.cold,
    TERMS.fatigue,
  ],
};

// Quick Emergency triage boards, mirroring the API seed's levels (level 1 is the
// most urgent). Only shown until the API's triage steps have been synced.
const triageBoardsMock: Board[] = [
  createBoard(
    "triage-board-level-1",
    "Triagem Nível 1",
    TERMS["shortness-of-breath"],
    moduleBoardTermsMock["triage-board-level-1"],
    "emergency",
  ),
  createBoard(
    "triage-board-level-2",
    "Triagem Nível 2",
    TERMS.fever,
    moduleBoardTermsMock["triage-board-level-2"],
    "emergency",
  ),
  createBoard(
    "triage-board-level-3",
    "Triagem Nível 3",
    TERMS.fatigue,
    moduleBoardTermsMock["triage-board-level-3"],
    "emergency",
  ),
];

// In the cache's shape, so the app reads bundled and synced levels the same
// way. Levels 4 and 5 have no content yet.
export const triageStepsMock: TriageStep[] = triageBoardsMock.map(
  (board, index) => ({
    uuid: `triage-step-level-${index + 1}`,
    level: index + 1,
    board,
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  }),
);

// Categorized Emergency specialties. Only shown until the API's emergency
// boards have been synced.
export const emergencyBoardsMock: Board[] = [
  createBoard(
    "module-board-cat-emergency-cardiologia",
    "Cardiologia",
    TERMS.heart,
    moduleBoardTermsMock["module-board-cat-emergency-cardiologia"],
    "emergency",
  ),
  createBoard(
    "module-board-cat-emergency-neurologia",
    "Neurologia",
    TERMS.head,
    moduleBoardTermsMock["module-board-cat-emergency-neurologia"],
    "emergency",
  ),
  createBoard(
    "module-board-cat-emergency-ortopedia",
    "Ortopedia",
    TERMS.leg,
    moduleBoardTermsMock["module-board-cat-emergency-ortopedia"],
    "emergency",
  ),
  createBoard(
    "module-board-cat-emergency-geral",
    "Geral",
    TERMS.malaise,
    moduleBoardTermsMock["module-board-cat-emergency-geral"],
    "emergency",
  ),
];
