import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import UserSection from "./UserSection/UserSection";
import { Flex } from "@chakra-ui/react";
import FriendSection from "./FriendSection/FriendSection";
import PostContainer from "./PostSection/PostContainer";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Flex
        display={{ lg: "flex", md: "block", sm: "block" }}
        pt={"1rem"}
        w={"92%"}
        m="auto"
        px={"20px"}
        borderX={"1.5px solid #E1E4E8"}
        borderBottom={"1.5px solid #E1E4E8"}
        h="auto"
      >
        <UserSection />
        <PostContainer />
        <FriendSection />
      </Flex>
    </Box>
  );
};

export default Home;
