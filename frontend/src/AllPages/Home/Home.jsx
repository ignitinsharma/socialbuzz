import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import UserSection from "./UserSection";
import { Flex } from "@chakra-ui/react";
import PostSection from "./PostSection";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Flex
        display={{ lg: "flex", md: "block", sm: "block" }}
        pt={"5.5rem"}
        w={"90%"}
        m="auto"
        border={"1px solid green"}
        h="100rem"
      >
        <UserSection />
        <PostSection />
      </Flex>
    </Box>
  );
};

export default Home;
