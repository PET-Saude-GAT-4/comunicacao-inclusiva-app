import { ApiBoard } from "@/types/board.types";
import { ApiPhrase, Phrase } from "@/types/phrase.types";
import { ApiPictogram } from "@/types/pictogram.types";
import { ApiSignWriting } from "@/types/signWriting.types";
import { ApiTerm, Term } from "@/types/term.types";

const STAMP = "2026-01-01T00:00:00.000Z";

export function apiPictogram(
  overrides: Partial<ApiPictogram> = {},
): ApiPictogram {
  return {
    uuid: "pic-1",
    description: "cabeça",
    fileUrl: "http://localhost:3000/files/pic-1.png",
    createdAt: STAMP,
    updatedAt: STAMP,
    ...overrides,
  };
}

export function apiSignWriting(
  overrides: Partial<ApiSignWriting> = {},
): ApiSignWriting {
  return {
    uuid: "sw-1",
    description: "cabeça",
    fileUrl: "http://localhost:3000/files/sw-1.png",
    createdAt: STAMP,
    updatedAt: STAMP,
    ...overrides,
  };
}

export function apiTerm(overrides: Partial<ApiTerm> = {}): ApiTerm {
  return {
    uuid: "placement-1",
    termUuid: "term-1",
    description: "cabeça",
    pictogram: apiPictogram(),
    signWriting: apiSignWriting(),
    order: 0,
    ...overrides,
  };
}

export function apiBoard(overrides: Partial<ApiBoard> = {}): ApiBoard {
  return {
    uuid: "board-1",
    title: "Sintomas",
    type: "common",
    representativePictogram: apiPictogram(),
    termCount: 3,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...overrides,
  };
}

export function apiPhrase(overrides: Partial<ApiPhrase> = {}): ApiPhrase {
  return {
    uuid: "phrase-1",
    description: "Estou com dor de cabeça",
    terms: [apiTerm()],
    listedInLibrary: true,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...overrides,
  };
}

/** An app-side Term, identified only by its vocabulary uuid. */
export function term(uuid: string, description = uuid): Term {
  const image = {
    uuid: `${uuid}-img`,
    description,
    createdAt: STAMP,
    updatedAt: STAMP,
  };
  return {
    uuid,
    description,
    pictogram: { ...image, imageSource: `pic/${uuid}.png` },
    signWriting: { ...image, imageSource: `sw/${uuid}.png` },
  };
}

export function phrase(
  uuid: string,
  termUuids: string[],
  overrides: Partial<Phrase> = {},
): Phrase {
  return {
    uuid,
    description: uuid,
    terms: termUuids.map((id) => term(id)),
    listedInLibrary: true,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...overrides,
  };
}
