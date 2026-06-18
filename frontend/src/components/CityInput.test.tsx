import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CityInput from "./CityInput";

describe("CityInput", () => {
  it("updates input value when user types", () => {
    render(<CityInput onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(
      "Enter city (e.g. london)"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "london" } });

    expect(input.value).toBe("london");
  });

  it("calls onSearch with city when button is clicked", () => {
    const onSearch = vi.fn();

    render(<CityInput onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(
      "Enter city (e.g. london)"
    );

    fireEvent.change(input, { target: { value: "paris" } });

    fireEvent.click(screen.getByText("Get Weather"));

    expect(onSearch).toHaveBeenCalledWith("paris");
  });
});