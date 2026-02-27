import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box padding="50px 25px" sx={{ maxHeight: "75vh", overflow: "auto" }}>
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
