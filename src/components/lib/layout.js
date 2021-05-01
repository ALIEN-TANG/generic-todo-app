import styled from "@emotion/styled";

function Layout({ children }) {
  return (
    <Grid>
      <Logo>"Logo"</Logo>
      <Nav>"Nav"</Nav>
      <Aside>"Aside"</Aside>
      <Main>{children}</Main>
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-rows: 72px 1fr;
  grid-template-columns: 160px 1fr;
  height: 100vh;
  width: 100vw;
`;
const Logo = styled.div`
  grid-column: 1;
  grid-row: 1;
`;
const Nav = styled.nav`
  grid-column: 2/3;
  grid-row: 1/2;
`;
const Main = styled.main`
  grid-row: 2/3;
  grid-column: 2/3;
`;
const Aside = styled.aside`
  grid-column: 1/2;
  grid-row: 2/3;
`;

export default Layout;
