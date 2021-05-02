import { ThemeProvider } from "@emotion/react";

export const theme = {
  colors: {
    paleGreen: "#EAF4EC",
  },
};

function Themer({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Themer;
