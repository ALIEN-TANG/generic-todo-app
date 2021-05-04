import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactModal from "react-modal";

import App from "./App";
import { renderWithContextProviders } from "utils/testing";

ReactModal.setAppElement(document.createElement("div"));
test(`shows a "login" modal if not logged in`, () => {
  renderWithContextProviders(<App />, { loggedIn: false, username: undefined });
  const modal = screen.getByRole("dialog");
  const loginTextBox = screen.getByRole("textbox", {
    name: /username/i,
  });
  const unauthedApp = screen.getByText(/"unauthed app"/i);
  expect(modal).toBeInTheDocument();
  expect(loginTextBox).toBeInTheDocument();
  expect(unauthedApp).toBeInTheDocument();
});

test(`welcomes user if logged in`, async () => {
  renderWithContextProviders(<App />, { loggedIn: false, username: undefined });
  const loginTextBox = screen.getByRole("textbox", {
    name: /username/i,
  });
  const loginButton = screen.getByRole("button", {
    name: /login/i,
  });
  userEvent.type(loginTextBox, "Alien");
  userEvent.click(loginButton);

  const welcome = await screen.findByRole("heading", {
    name: /welcome, alien!/i,
  });
  expect(welcome).toBeInTheDocument();
});
