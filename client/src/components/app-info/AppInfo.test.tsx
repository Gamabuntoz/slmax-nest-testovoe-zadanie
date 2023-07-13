import { render, screen } from "@testing-library/react";

import AppInfo from ".";

it("Should render AppInfo", () => {
  const infoText = "Welcome to chats app, please signIn for continue";

  render(<AppInfo />);

  const element = screen.getByText(infoText);

  expect(element).toBeInTheDocument();
});
