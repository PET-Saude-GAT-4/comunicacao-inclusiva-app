import { fireEvent, render, screen } from "@testing-library/react-native";

import { RadioOption } from "@/components/setup-consultation/RadioOption";

describe("RadioOption", () => {
  it("renders its label and calls onSelect when pressed", async () => {
    const onSelect = jest.fn();

    await render(
      <RadioOption label="Enfermagem" selected={false} onSelect={onSelect} />,
    );
    await fireEvent.press(screen.getByText("Enfermagem"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
