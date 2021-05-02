import { useState, useEffect } from "react";
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
      <H3>"Login"</H3>
      <TextInput
        label="Username"
        value={nameInput}
        onChange={handleInputChange}
        style={{ width: "200px" }}
      />
      <Button onClick={login} disabled={buttonDisabled}>
        Save
      </Button>
    </Modal>
  );
}

export default LoginModal;
