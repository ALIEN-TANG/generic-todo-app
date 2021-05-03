import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import TextInput from "components/lib/text-input";
import Button from "components/lib/button";
import { client } from "api/client";
import { useLogin } from "context/login-provider";

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
  console.log("items: ", items);
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
