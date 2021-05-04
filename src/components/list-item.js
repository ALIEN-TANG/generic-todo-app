import React, { useState, useReducer, useMemo } from "react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { H3 } from "components/lib/typography";
import Modal from "components/lib/modal";
import TextInput from "components/lib/text-input";
import Button from "components/lib/button";
import { client } from "api/client";
import { useLogin } from "context/login-provider";

function ListItem({ item, listId }) {
  const queryClient = useQueryClient();
  const { getMasterToken } = useLogin();
  const isDone = useMemo(() => item.status === "DONE", [item]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    e.preventDefault();
    toggleStatus();
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  }
  const formattedDate = item.dueDate
    ? moment(item.dueDate).format("MM-DD-YY")
    : "unspecified";
  return (
    <>
      <Card height="80px">
        <Header>
          <H3>{item.title}</H3>
          <EditButton onClick={openModal}>Edit</EditButton>
        </Header>
        <ItemBody>
          <DateContainer>due: {formattedDate}</DateContainer>
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
      <EditModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        item={item}
        listId={listId}
      />
    </>
  );
}
export default React.memo(ListItem);

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px;
  width: 100%;
`;
const EditButton = styled(Button)``;

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
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
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const types = {
  TITLE: "TITLE",
  DESCRIPTION: "DESCRIPTION",
  DUEDATE: "DUEDATE",
  EDITED: "EDITED",
};
const itemReducer = (state, action) => {
  switch (action.type) {
    case types.TITLE:
      return { ...state, title: action.value, edited: true };
    case types.DESCRIPTION:
      return { ...state, description: action.value, edited: true };
    case types.DUEDATE:
      return { ...state, dueDate: action.value, edited: true };
    case types.EDITED:
      return { ...state, edited: action.value };
  }
};

function EditModal({ item, listId, ...props }) {
  const { description, title, dueDate } = item;
  const queryClient = useQueryClient();
  const { getMasterToken } = useLogin();
  const [state, dispatch] = useReducer(itemReducer, {
    title,
    description,
    dueDate,
  });
  const { mutate } = useMutation(
    () => {
      const token = getMasterToken();
      return client("/item", {
        method: "PUT",
        token,
        data: {
          id: item.id,
          listId,
          ...state,
        },
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
    dispatch({ type: types.EDITED, value: false });
    props.onRequestClose();
  }
  function handleSelectDate(date) {
    console.log("date: ", date, "typeof: ", typeof date);
    dispatch({
      type: types.DUEDATE,
      value: new Date(date),
    });
  }

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      onChange={onClick}
      ref={ref}
      style={{ fontSize: "24px", marginBottom: "24px" }}
      value={value}
    />
  ));
  return (
    <Modal {...props}>
      <H3>Item Edit</H3>
      <TextInput
        label="title"
        value={state.title}
        onChange={(value) => dispatch({ type: types.TITLE, value })}
        style={{ width: "200px", marginBottom: "24px" }}
        inputFontSize="24px"
      />
      <TextInput
        label="description"
        value={state.description}
        style={{ marginBottom: "24px" }}
        onChange={(value) => dispatch({ type: types.DESCRIPTION, value })}
        inputFontSize="24px"
      />
      <DatePicker
        selected={state.dueDate ? new Date(state.dueDate) : new Date()}
        style={{ fontSize: "24px" }}
        onChange={handleSelectDate}
        customInput={<CustomDateInput />}
      />
      <Actions>
        <SaveButton onClick={handleSave} disabled={!state.edited}>
          Save
        </SaveButton>
      </Actions>
    </Modal>
  );
}
const SaveButton = styled(Button)``;
const Actions = styled.div`
  display: flex;
`;
