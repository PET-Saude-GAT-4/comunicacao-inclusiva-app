import {
  apiBoard,
  apiPictogram,
  apiSignWriting,
  apiTerm,
} from "@test/fixtures";

import { boardAdapter } from "@/adapters/boardAdapter";

describe("boardAdapter", () => {
  describe("toTerm", () => {
    it("identifies the term by its vocabulary uuid, not the placement uuid", () => {
      const term = boardAdapter.toTerm(
        apiTerm({ uuid: "placement-9", termUuid: "term-9" }),
      );

      expect(term.uuid).toBe("term-9");
    });

    it("adapts the nested pictogram and sign writing", () => {
      const term = boardAdapter.toTerm(apiTerm());

      expect(term.pictogram.imageSource).toBe(
        "http://10.0.0.5:3000/files/pic-1.png",
      );
      expect(term.signWriting.imageSource).toBe(
        "http://10.0.0.5:3000/files/sw-1.png",
      );
    });
  });

  describe("file URLs", () => {
    it("swaps the protocol and host for the configured API base URL and keeps the path", () => {
      const pictogram = boardAdapter.toPictogram(
        apiPictogram({ fileUrl: "https://localhost:8080/files/abc/def.png" }),
      );

      expect(pictogram.imageSource).toBe(
        "http://10.0.0.5:3000/files/abc/def.png",
      );
    });

    it("applies the same rewrite to sign writing", () => {
      const signWriting = boardAdapter.toSignWriting(
        apiSignWriting({ fileUrl: "http://localhost/files/sw.png" }),
      );

      expect(signWriting.imageSource).toBe("http://10.0.0.5:3000/files/sw.png");
    });

    it.each(["", "not a url"])("returns %j unchanged", (fileUrl) => {
      const pictogram = boardAdapter.toPictogram(apiPictogram({ fileUrl }));

      expect(pictogram.imageSource).toBe(fileUrl);
    });
  });

  describe("toBoard", () => {
    it("adapts the representative pictogram and drops wire-only fields", () => {
      const wire = {
        ...apiBoard({ uuid: "board-7", title: "Dor", type: "emergency" }),
        authorUuid: "author-1",
        publishedAt: "2026-02-02T00:00:00.000Z",
      };

      const board = boardAdapter.toBoard(wire);

      expect(board).toEqual({
        uuid: "board-7",
        title: "Dor",
        type: "emergency",
        representativePictogram: {
          uuid: "pic-1",
          description: "cabeça",
          imageSource: "http://10.0.0.5:3000/files/pic-1.png",
          createdAt: wire.createdAt,
          updatedAt: wire.updatedAt,
        },
        termCount: 3,
        createdAt: wire.createdAt,
        updatedAt: wire.updatedAt,
      });
    });
  });
});
