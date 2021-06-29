import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import Button from "../components/Button/Button";

describe("", () => {
  const variant = "primary";
  const size = "small";
  it("", () => {
    const { container } = render(<Button variant={variant} size={size} />);
    expect(container.firstChild.classList.contains("btn-primary")).toBe(true);
  });

  it("", () => {
    const { container } = render(<Button variant={variant} size={size} />);
    expect(container.firstChild.classList.contains("btn-small")).toBe(true);
    expect(container.firstChild.classList.contains("btn-primary")).toBe(true);
  });

  it("", () => {
    const { container } = render(<Button variant={variant} />);
    expect(container.firstChild.classList.contains("btn-small")).toBe(false);
  });
});
