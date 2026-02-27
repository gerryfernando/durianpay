import { MenuBook } from "@mui/icons-material";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import TypographyCom from "../TypographyCom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box mr={2} sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuBook sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <TypographyCom
              noWrap
              color="#fff"
              bold
              fontSize="18px"
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              DASHBOARD
            </TypographyCom>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
