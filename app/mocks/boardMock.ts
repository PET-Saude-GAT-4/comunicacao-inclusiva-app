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

// The API has no board chain to mirror yet, so this models the flow the boards
// imply: name the body part, then the symptom, and back.
export const nextBoardsMock: Record<string, Board[]> = {
  [BODY_PARTS]: [boardsMock[3]],
  [GENERAL_SYMPTOMS]: [boardsMock[2]],
};
