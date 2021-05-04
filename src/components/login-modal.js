import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useLogin } from "context/login-provider";
import Modal from "components/lib/modal";
import { H3 } from "components/lib/typography";
import TextInput from "components/lib/text-input";
import Button from "components/lib/button";

function LoginModal(props) {
  const { setLoggedIn, setUsername } = useLogin();
  const [nameInput, setNameInput] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (nameInput) {
      setButtonDisabled(false);
    }
    if (!nameInput) {
      setButtonDisabled(true);
    }
  }, [nameInput]);
  function handleInputChange(input) {
    setNameInput(input);
  }
  function login(e) {
    e.preventDefault();
    setUsername(nameInput);
    setLoggedIn(true);
  }

  return (
    <Modal {...props}>
      <Container>
        <H3>"Login"</H3>
        <TextInput
          label="Username"
          value={nameInput}
          onChange={handleInputChange}
          style={{ width: "200px", textAlign: "center" }}
        />
        <Button
          onClick={login}
          disabled={buttonDisabled}
          style={{ marginTop: "24px" }}
        >
          Login
        </Button>
      </Container>
    </Modal>
  );
}
export default LoginModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
