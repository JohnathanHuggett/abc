import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders home page", () => {
  render(<App />);
  const H1 = screen.getByText("Home Page", { selector: "h1" });

  expect(H1).toBeInTheDocument();
});
