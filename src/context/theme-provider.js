import { ThemeProvider } from "@emotion/react";

export const theme = {
  colors: {
    brightGreen: "#06FF00",
    paleGreen: "#EAF4EC",
    rust: "#BE561C",
    sand: "#D9D1C1",
    white: "#FFFFFF",
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
