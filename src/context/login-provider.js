import { useContext, createContext, useState, useEffect } from "react";
import { useLocalStorage } from "utils/hooks";

const LoginContext = createContext();
export function useLogin() {
  return useContext(LoginContext);
}
function LoginProvider({ children }) {
  const [username, setUsername] = useLocalStorage("username", null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (username) {
      setLoggedIn(true);
    }
  }, [username]);

  return (
    <LoginContext.Provider
      value={{ loggedIn, username, setLoggedIn, setUsername }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
