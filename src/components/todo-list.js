import React, { useState, useEffect } from "react";
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
  function handleClickSave() {
    mutate();
  }
  const pendingItems = items.filter(({ status }) => status === "PENDING");
  const doneItems = items.filter(({ status }) => status === "DONE");
  return (
    <Grid>
      <FlexContainer>
        <TextInput
          label="List Name"
          value={listName}
          onChange={handleTextInput}
          style={{ width: "200px" }}
          inputFontSize="24px"
        />
        <SaveButton onClick={handleClickSave} disabled={!hasTitle}>
          Save
        </SaveButton>
      </FlexContainer>
      <ListContent>
        <ItemColumn>
          <H2>Pending</H2>
          {pendingItems &&
            !!pendingItems.length &&
            pendingItems.map((item) => <ListItem key={item.id} item={item} />)}
        </ItemColumn>
        <ItemColumn>
          <H2>Done</H2>
          {doneItems &&
            !!doneItems.length &&
            doneItems.map((item) => <ListItem key={item.id} item={item} />)}
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
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  width: 100%;
`;
const ListContent = styled.div`
  display: grid;
  grid-template-columns: 240px 240px;
  grid-column-gap: 2rem;
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
