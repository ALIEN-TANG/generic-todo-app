import React, { useState } from "react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import { H3 } from "components/lib/typography";
import { client } from "api/client";
import { useLogin } from "context/login-provider";

function ListItem({ item, listId }) {
  const queryClient = useQueryClient();
  const { getMasterToken } = useLogin();
  const [isDone] = useState(() => item.status === "DONE");
  const { mutate: toggleStatus } = useMutation(
    () => {
      const token = getMasterToken();
      return client("/item", {
        method: "PUT",
        token,
        data: {
          id: item.id,
          listId,
          status: isDone ? "PENDING" : "DONE",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TodoLists");
      },
    }
  );
  function handleToggle(e) {
    e.stopPropagation();
    toggleStatus();
  }
  return (
    <Card height="80px">
      <H3>{item.title}</H3>
      <ItemBody>
        <div>due: {item.dueDate || "unspecified"}</div>
        <CheckboxContainer>
          <label htmlFor="done">done:</label>
          <input
            type="checkbox"
            id="done"
            name="done"
            checked={isDone}
            onChange={handleToggle}
          />
        </CheckboxContainer>
      </ItemBody>
    </Card>
  );
}

export default ListItem;

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const CheckboxContainer = styled.div`
  display: flex;
  grid-column: 2;
  align-items: flex-end;
  justify-content: flex-end;
`;
const Card = styled.div`
  border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height || "100%"};
  padding: 8px;
  display: flex;
  flex-direction: column;
  :hover {
    cursor: pointer;
    box-shadow: 0 4px 8px black;
  }
`;
