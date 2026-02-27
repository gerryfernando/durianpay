import { render, screen } from "@testing-library/react";
import Menu from "./page/Menu";
import Cart from "./page/Cart";

test("renders menu page", () => {
  render(<Menu />);
  const element = screen.getByText(/Menu Page/i);
  expect(element).toBeInTheDocument();
});

test("renders cart page", () => {
  render(<Cart />);
  const element = screen.getByText(/Cart Page/i);
  expect(element).toBeInTheDocument();
});
