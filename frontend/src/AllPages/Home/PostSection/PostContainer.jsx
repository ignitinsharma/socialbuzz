import { Box } from "@chakra-ui/react";
import React from "react";
import PostSection from "./PostSection";
import PostFeed from "./PostFeed";

const PostContainer = () => {
  return (
    <Box w={{ lg: "50%", md: "100%", sm: "100%" }}>
      <PostSection />
      <PostFeed />
    </Box>
  );
};

export default PostContainer;
