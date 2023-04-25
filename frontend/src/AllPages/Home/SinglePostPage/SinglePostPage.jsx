import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

const SinglePostPage = () => {
  const { postId } = useParams();
  console.log("params:", postId);
  const dispatch = useDispatch();
  const { token, user, posts } = useSelector((store) => store);
  console.log("posts:", posts);
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      {posts &&
        posts.map((ele) =>
          ele._id == postId ? <Box>{console.log(ele, "elel post")}</Box> : null
        )}
    </Box>
  );
};

export default SinglePostPage;
