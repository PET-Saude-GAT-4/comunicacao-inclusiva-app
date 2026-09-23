import { createBoard, TERMS } from "@/mocks/termsMock";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

// Membership and order mirror BOARD_DEFS in the api repo
// api repo, read in array order (the seed writes that order
// into the board's linked list).
const BASIC_NEEDS = "board-basic-needs";
const EMOTIONS_AND_STATE = "board-emotions-and-state";
const BODY_PARTS = "board-body-parts";
const GENERAL_SYMPTOMS = "board-general-symptoms";

export const boardTermsMock: Record<string, Term[]> = {
  [BASIC_NEEDS]: [
    TERMS.water,
    TERMS.food,
    TERMS.bathroom,
    TERMS.sleep,
    TERMS.rest,
  ],
  [EMOTIONS_AND_STATE]: [
    TERMS.happy,
    TERMS.sad,
    TERMS.afraid,
    TERMS.irritated,
    TERMS.anxious,
    TERMS.calm,
    TERMS.confused,
  ],
  [BODY_PARTS]: [
    TERMS.head,
    TERMS.eyes,
    TERMS.ear,
    TERMS.nose,
    TERMS.mouth,
    TERMS.tooth,
    TERMS.throat,
    TERMS.lung,
    TERMS.heart,
    TERMS.belly,
    TERMS.arm,
    TERMS.leg,
    TERMS.foot,
    TERMS.back,
  ],
  [GENERAL_SYMPTOMS]: [
    TERMS.nausea,
    TERMS.dizziness,
    TERMS["shortness-of-breath"],
    TERMS.fatigue,
    TERMS.fever,
    TERMS.tingling,
    TERMS.cold,
    TERMS.allergy,
    TERMS["bleeding-cut"],
    TERMS["sharp-pain"],
    TERMS["animal-bite"],
    TERMS["vehicle-crash"],
  ],
};

export const boardsMock: Board[] = [
  createBoard(
    BASIC_NEEDS,
    "Necessidades Básicas",
    TERMS.water,
    boardTermsMock[BASIC_NEEDS],
  ),
  createBoard(
    EMOTIONS_AND_STATE,
    "Emoções e Estado",
    TERMS.happy,
    boardTermsMock[EMOTIONS_AND_STATE],
  ),
  // `body` and `malaise` represent their boards without being members of them.
  createBoard(
    BODY_PARTS,
    "Partes do Corpo",
    TERMS.body,
    boardTermsMock[BODY_PARTS],
  ),
  createBoard(
    GENERAL_SYMPTOMS,
    "Sintomas Gerais",
    TERMS.malaise,
    boardTermsMock[GENERAL_SYMPTOMS],
  ),
];

// Mirrors BOARD_CHAIN_DEFS in the api repo's 05-interaction-chains seed: name
// the body part, then the symptom, and back.
export const nextBoardsMock: Record<string, Board[]> = {
  [BODY_PARTS]: [boardsMock[3]],
  [GENERAL_SYMPTOMS]: [boardsMock[2]],
};

// Keyed by phrase uuid, shaped after PHRASE_CHAIN_DEFS in the api repo's
// 05-interaction-chains seed. The uuids are this file's own, so the two never
// hold the same rows; what they share is that a phrase suggests the body-part
// and symptom boards.
export const phraseNextBoardsMock: Record<string, Board[]> = {
  "phrase-1": [boardsMock[2], boardsMock[3]],
  "phrase-3": [boardsMock[3], boardsMock[2]],
  "phrase-4": [boardsMock[3]],
  "phrase-7": [boardsMock[3]],
};
