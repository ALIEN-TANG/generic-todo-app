import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import TextInput from "components/lib/text-input";
import Button from "components/lib/button";
import { H2 } from "components/lib/typography";
import { client } from "api/client";
import { useLogin } from "context/login-provider";
import ListItem from "components/list-item";

function TodoList({ list }) {
  const { items, title, id } = list;
  const { getMasterToken } = useLogin();
  const queryClient = useQueryClient();
  const [hasTitle, setHasTitle] = useState(false);
  const [listName, setListName] = useState(title);
  const pendingItems = useMemo(
    () => items.filter(({ status }) => status === "PENDING"),
    [items]
  );
  const doneItems = useMemo(
    () => items.filter(({ status }) => status === "DONE"),
    [items]
  );
  function handleTextInput(input) {
    setListName(input);
  }

  useEffect(() => {
    if (!!listName && !hasTitle) {
      setHasTitle(true);
    } else if (!listName) {
      setHasTitle(false);
    }
  }, [listName, hasTitle]);
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
        <AddButton onClick={createItem}>Add Item</AddButton>
      </FlexColumn>
      <ListContent>
        <ItemColumn>
          <H2>Pending</H2>
          {pendingItems &&
            !!pendingItems.length &&
            pendingItems
              .sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
              })
              .map((item) => (
                <ListItem key={item.id} item={item} listId={id} />
              ))}
          {pendingItems && !pendingItems.length && "Nothing yet!"}
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
          {doneItems && !doneItems.length && "Nothing yet!"}
        </ItemColumn>
      </ListContent>
    </Grid>
  );
}
export default TodoList;

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 160px 1fr;
`;
const SaveButton = styled(Button)`
  display: flex;
  align-self: flex-end;
  margin-left: 24px;
`;
const AddButton = styled(Button)`
  display: block;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 1;
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
  grid-column-gap: 48px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
const ItemColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-column: ${(props) => props.gridColumn};
`;
