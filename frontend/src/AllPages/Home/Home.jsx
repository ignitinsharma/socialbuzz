import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import UserSection from "./UserSection/UserSection";
import { Flex, VStack } from "@chakra-ui/react";
import PostSection from "./PostSection/PostSection";
import PostFeed from "./PostSection/PostFeed";
import FriendSection from "./FriendSection/FriendSection";
import PostContainer from "./PostSection/PostContainer";

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
        // justifyContent={'space-between'}
      >
        <UserSection />
        <PostContainer />
        <FriendSection />
      </Flex>
    </Box>
  );
};

export default Home;
