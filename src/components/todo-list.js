import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useMutation, useQueryClient } from "react-query";
import TextInput from "components/lib/text-input";
import Button from "components/lib/button";
import { H1, H2 } from "components/lib/typography";
import { client } from "api/client";
import { useLogin } from "context/login-provider";
import ListItem from "components/list-item";

function TodoList({ list }) {
  const { items, title, id } = list;
  const { getMasterToken } = useLogin();
  const queryClient = useQueryClient();
  const [hasTitle, setHasTitle] = useState(false);
  const [listName, setListName] = useState(title);
  const [pendingItems, setPendingItems] = useState(undefined);
  const [doneItems, setDoneItems] = useState(undefined);

  const { mutate } = useMutation(
    () => {
      const token = getMasterToken();
      return client("/list", {
        method: "PUT",
        token,
        data: { id, title: listName },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TodoLists");
      },
    }
  );
  const { mutate: createItem } = useMutation(
    () => {
      const token = getMasterToken();
      return client("/item", {
        method: "POST",
        token,
        data: { listId: id },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TodoLists");
      },
    }
  );

  useEffect(() => {
    if (items) {
      const pendingItems = items.filter(({ status }) => status === "PENDING");
      const doneItems = items.filter(({ status }) => status === "DONE");
      setPendingItems(pendingItems);
      setDoneItems(doneItems);
    }
  }, [items]);

  useEffect(() => {
    if (!!listName && !hasTitle) {
      setHasTitle(true);
    } else if (!listName) {
      setHasTitle(false);
    }
  }, [listName, hasTitle]);

  function handleTextInput(input) {
    setListName(input);
  }
  function handleSave() {
    mutate();
  }

  return (
    <Grid>
      <FlexColumn>
        <NameContainer>
          <TextInput
            label="List Name"
            value={listName}
            onChange={handleTextInput}
            style={{ width: "200px" }}
            inputFontSize="24px"
          />
          <SaveButton onClick={handleSave} disabled={!hasTitle}>
            Save
          </SaveButton>
        </NameContainer>
      </FlexColumn>
      <ListContent>
        <ItemColumn>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <H2>Pending</H2>
            <AddButton onClick={createItem}>Add Item</AddButton>
          </div>
          {pendingItems &&
            !!pendingItems.length &&
            pendingItems
              .sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
              })
              .map((item, index) => (
                <ListItem
                  key={`list-item-${index}`}
                  item={item}
                  listId={id}
                  index={index}
                />
              ))}
          {pendingItems && !pendingItems.length && (
            <span data-testid="no-pending-items">Nothing yet!</span>
          )}
        </ItemColumn>
        <ItemColumn>
          <H2>Done</H2>
          {doneItems &&
            !!doneItems.length &&
            doneItems
              .sort((a, b) => {
                return new Date(b.dueDate) - new Date(a.dueDate);
              })
              .map((item) => (
                <ListItem key={item.id} item={item} listId={id} />
              ))}
          {doneItems && !doneItems.length && (
            <span data-testid="no-done-items">Nothing yet!</span>
          )}
        </ItemColumn>
      </ListContent>
      <MoreSpace>
        <H1>"Activity Space"</H1>
      </MoreSpace>
    </Grid>
  );
}
export default TodoList;

const MoreSpace = styled.div`
  grid-row: 1/3;
  grid-column: 2;
  background: ${(props) => props.theme.colors.sand};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 0 8px 0 24px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: justify;
`;
const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 160px 1fr;
  grid-template-columns: 744px 1fr;
`;
const SaveButton = styled(Button)`
  display: flex;
  align-self: flex-end;
  margin-left: 24px;
  box-sizing: border-box;
`;
const AddButton = styled(Button)`
  display: block;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 1;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 16px;
  margin: 0 0 24px 1px;
  max-width: 744px;
  box-sizing: border-box;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-bottom: 24px;
`;
const ListContent = styled.div`
  display: grid;
  grid-row: 2;
  grid-template-columns: 360px 360px;
  grid-column-gap: 24px;
  width: 100%;
  height: 100%;
`;
const ItemColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-left: 1px;
  grid-column: ${(props) => props.gridColumn};
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow};
  box-sizing: border-box;
`;
