import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthedApp from "components/authed-app";
import { renderWithContextProviders } from "utils/testing";

function getMasterToken() {
  return "641";
}
test(`welcomes the user`, () => {
  renderWithContextProviders(<AuthedApp username="Alien" />, {});
  const welcome = screen.getByRole("heading", {
    name: /welcome, Alien!/i,
  });
  expect(welcome).toBeInTheDocument();
});

test(`shows a new list with an empty item`, async () => {
  renderWithContextProviders(<AuthedApp username="Alien" />, {
    getMasterToken,
  });
  const titleInput = await screen.findByRole("textbox", {
    name: /list name/i,
  });
  const itemCard = await screen.findByTestId("list-item-0");
  const itemTitle = await screen.findByRole("heading", {
    name: /untitled/i,
  });
  expect(titleInput).toBeInTheDocument();
  expect(itemCard).toBeInTheDocument();
  expect(itemTitle).toBeInTheDocument();
});

test(`list name can be edited`, async () => {
  renderWithContextProviders(<AuthedApp username="Alien" />, {
    getMasterToken,
  });
  const listNameInput = screen.getByRole("textbox", {
    name: /list name/i,
  });
  const saveButton = screen.getByRole("button", {
    name: /save/i,
  });
  userEvent.type(listNameInput, "Besto Listo");
  userEvent.click(saveButton);
  const newListName = await screen.getByDisplayValue(/besto listo/i);
  expect(newListName).toBeInTheDocument();
});

test(`clicking "Add Item" button adds a new item`, async () => {
  renderWithContextProviders(<AuthedApp username="Alien" />, {
    getMasterToken,
  });
  const addItemButton = screen.getByRole("button", {
    name: /add item/i,
  });
  const firstCard = await screen.findByTestId("list-item-0");
  expect(firstCard).toBeInTheDocument();
  userEvent.click(addItemButton);
  const secondCard = await screen.findByTestId("list-item-1");
  expect(secondCard).toBeInTheDocument();
  // delete added item for next test
  const deleteOnSecondCard = within(secondCard).getByRole("button", {
    name: /delete/i,
  });
  userEvent.click(deleteOnSecondCard);
});

test(`clicking "Delete" button removes the item`, async () => {
  renderWithContextProviders(<AuthedApp username="Alien" />, {
    getMasterToken,
  });
  const view = screen.getByTestId("list-item-0");
  const deleteButton = within(view).getByRole("button", {
    name: /delete/i,
  });
  userEvent.click(deleteButton);
  const emptyMessage = await screen.findByTestId("no-pending-items");
  expect(emptyMessage).toBeInTheDocument();
});
