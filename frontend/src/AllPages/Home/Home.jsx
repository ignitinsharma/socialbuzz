import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import UserSection from "./UserSection";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Flex
        pt={"5.5rem"}
        w={"90%"}
        m="auto"
        border={"1px solid green"}
        h="100vh"
      >
        <UserSection />
      </Flex>
    </Box>
  );
};

export default Home;
