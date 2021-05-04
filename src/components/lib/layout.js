import styled from "@emotion/styled";
import { H1 } from "components/lib/typography";

function Layout({ children }) {
  return (
    <Grid>
      <Logo>
        <BigLabel>"Logo"</BigLabel>
      </Logo>
      <Nav>
        <BigLabel>"Navigation"</BigLabel>
      </Nav>
      <Aside>
        <BigLabel>"Aside"</BigLabel>
      </Aside>
      <Main>{children}</Main>
    </Grid>
  );
}

const BigLabel = styled(H1)`
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  grid-template-columns: 180px 1fr;
  height: 100vh;
  width: 100vw;
  grid-gap: 2rem;
  overflow: hidden;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1;
  grid-row: 1;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 16px;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 2/3;
  grid-row: 1/2;
  background: ${(props) => props.theme.colors.paleGreen};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 16px;
`;
const Main = styled.main`
  grid-row: 2/3;
  grid-column: 2/3;
  margin: 16px;
  overflow-y: scroll;
`;
const Aside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/2;
  grid-row: 2/3;
  background: ${(props) => props.theme.colors.paleGreen};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 16px;
`;

export default Layout;
