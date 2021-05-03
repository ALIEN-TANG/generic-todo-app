import { ThemeProvider } from "@emotion/react";

export const theme = {
  colors: {
    paleGreen: "#EAF4EC",
  },
  fontSizes: {
    small: "12px",
    body: "16px",
    large: "24px",
  },
};

function Themer({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Themer;
