import { ThemeProvider } from "@emotion/react";

export const theme = {
  colors: {
    paleGreen: "#EAF4EC",
    sand: "#D9D1C1",
  },
  fontSizes: {
    small: "12px",
    body: "16px",
    large: "24px",
  },
  boxShadow: "0 4px 8px black",
};

function Themer({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Themer;
