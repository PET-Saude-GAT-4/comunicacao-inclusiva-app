import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

// Emergency boards come from the API (boards typed "emergency"), but its seed
// defines none yet, so the board definitions below, the ones the app already
// shipped, keep the emergency tab usable before anything has been synced.
export const moduleBoardTermsMock: Record<string, Term[]> = {
  // Quick Emergency triage levels
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

// Quick Emergency triage levels. The API's board type can't tell a triage level
// from a specialty module, so these stay bundled with the app.
export const quickEmergencyBoardsMock: Board[] = [
  createBoard(
    "module-board-quick-emergency-level-3",
    "Emergência Nível 3",
    TERMS["shortness-of-breath"],
    moduleBoardTermsMock["module-board-quick-emergency-level-3"],
    "emergency",
  ),
  createBoard(
    "module-board-quick-emergency-level-2",
    "Emergência Nível 2",
    TERMS.fever,
    moduleBoardTermsMock["module-board-quick-emergency-level-2"],
    "emergency",
  ),
  createBoard(
    "module-board-quick-emergency-level-1",
    "Emergência Nível 1",
    TERMS.fatigue,
    moduleBoardTermsMock["module-board-quick-emergency-level-1"],
    "emergency",
  ),
];

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
