import { triageAdapter } from "@/adapters/triageAdapter";

import { apiBoard } from "../../test/fixtures";

describe("triageAdapter.toTriageStep", () => {
  it("keeps the level and adapts the nested board", () => {
    const step = triageAdapter.toTriageStep({
      uuid: "step-1",
      level: 1,
      board: apiBoard({ uuid: "board-urgent", type: "emergency" }),
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-02T00:00:00.000Z",
    });

    expect(step.uuid).toBe("step-1");
    expect(step.level).toBe(1);
    expect(step.board.uuid).toBe("board-urgent");
    expect(step.board.representativePictogram.imageSource).toBe(
      "http://10.0.0.5:3000/files/pic-1.png",
    );
  });
});
