import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginProvider from "context/login-provider";
import Themer from "context/theme-provider";

const queryClient = new QueryClient();
export function renderWithContextProviders(Component, { loggedIn, username }) {
  return render(
    <QueryClientProvider client={queryClient}>
      <LoginProvider value={{ loggedIn, username }}>
        <Themer>{Component}</Themer>
      </LoginProvider>
    </QueryClientProvider>
  );
}
