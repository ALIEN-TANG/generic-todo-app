import React, { useState, useEffect } from "react";
import Layout from "components/lib/layout";
import { useLogin } from "context/login-provider";
import LoginModal from "components/login-modal";

function App() {
  const { loggedIn, username } = useLogin();
  const [isModalOpen, setIsModalOpen] = useState();

  useEffect(() => {
    if (!loggedIn && !username) {
      setIsModalOpen(true);
    }
    if (loggedIn && username) {
      setIsModalOpen(false);
    }
  }, [loggedIn]);

  function closeModal() {
    return loggedIn ? setIsModalOpen(false) : () => {};
  }
  return (
    <div className="App">
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} small />
      <Layout>"Main"</Layout>
    </div>
  );
}

export default App;
