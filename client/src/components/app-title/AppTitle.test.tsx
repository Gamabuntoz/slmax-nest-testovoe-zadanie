import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AppTitle from ".";

it("Should render AppTitle", () => {
  const titleText = "slmax-nest-testovoe-zadanie";

  render(
    <MemoryRouter>
      <AppTitle />
    </MemoryRouter>
  );

  const element = screen.getByText(titleText);

  expect(element).toBeInTheDocument();
});
