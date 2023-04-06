import { Box } from "@chakra-ui/react";
import React from "react";
import PostSection from "./PostSection";
import PostFeed from "./PostFeed";

const PostContainer = () => {
  return (
    <Box w={"50%"} border={"1px solid green"}>
      <PostSection />
      <PostFeed />
    </Box>
  );
};

export default PostContainer;
