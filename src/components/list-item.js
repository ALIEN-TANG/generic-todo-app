import React, { useState } from "react";
import styled from "@emotion/styled";
import { H3 } from "components/lib/typography";

function ListItem({ item }) {
  console.log("item: ", item);
  const [isDone] = useState(() => item.status === "DONE");

  return (
    <Card height="80px">
      <H3>{item.title}</H3>
      <ItemBody>
        <div>due: {item.dueDate || "unspecified"}</div>
        <CheckboxContainer>
          <label for="done">done:</label>
          <input type="checkbox" id="done" name="done" checked={isDone} />
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
