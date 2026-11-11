import {
  formatDateBR,
  formatTimeBR,
  formatTimestampBR,
} from "@/utils/dateFormatter";

// Built in local time and serialized to ISO, so the expected output holds in
// any timezone the suite runs in.
const earlyMorning = new Date(2026, 0, 5, 7, 3).toISOString();
const evening = new Date(2026, 10, 25, 21, 45).toISOString();

describe("dateFormatter", () => {
  it("formats date and time with zero-padded fields", () => {
    expect(formatTimestampBR(earlyMorning)).toBe("05/01/2026 07:03");
    expect(formatTimestampBR(evening)).toBe("25/11/2026 21:45");
  });

  it("formats the date only", () => {
    expect(formatDateBR(earlyMorning)).toBe("05/01/2026");
  });

  it("formats the time only", () => {
    expect(formatTimeBR(earlyMorning)).toBe("07:03");
  });
});
