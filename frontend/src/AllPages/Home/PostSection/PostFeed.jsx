import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostFeed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { token, user } = useSelector((store) => store);

  const headers = {
    Authorization: token,
  };
  const fetchPost = () => {
    axios.get(`http://localhost:8080/posts`, { headers }).then((res) => {
      console.log(res);
      setAllPosts(res.data);
    });
  };

  useEffect(() => {
    // fetchPost();
  }, []);
  // console.log(allPosts.data, " allposts");

  /* 
  createdAt
: 
"2023-04-06T12:25:13.721Z"
description
: 
"hello kya hal hai"
firstName
: 
"elone"
lastName
: 
"musk"
likes
: 
{}
location
: 
"usa"
picturePath
: 
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
updatedAt
: 
"2023-04-06T12:25:13.721Z"
userId
: 
"642d78b7fdddf9efb06a841f"
userPicturePath
: 
"https://ichef.bbci.co.uk/news/976/cpsprodpb/AE34/production/_129169544_gettyimages-1459166551.jpg"
 */
  return (
    <Box mt="2rem">
      {/* {allPosts.map((ele) => ( */}
      <Box mb="10px" p="1rem" border={"1.5px solid #E1E4E8"}>
        <Flex>
          <Image
            borderRadius="full"
            boxSize="40px"
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/AE34/production/_129169544_gettyimages-1459166551.jpg"
            alt="Dan Abramov"
          />
          <Text ml={"10px"} fontWeight={"bold"}>
            Nitin sharma
          </Text>
        </Flex>
        <Box w="80%" m="auto">
          <Text fontSize={"15px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            doloremque consectetur pariatur! Dicta deleniti laborum possimus
            cupiditate error asperiores ipsa pariatur, beatae facere commodi
            aliquid numquam. Earum adipisci a voluptatem? Iure pariatur
            voluptate
          </Text>
          <Image
            mt="1rem"
            w={"auto"}
            h="250px"
            borderRadius="7px"
            _hover={{
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
            }}
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/AE34/production/_129169544_gettyimages-1459166551.jpg"
            alt="Dan Abramov"
          />
        </Box>
      </Box>
      <Box p="1rem" border={"1.5px solid #E1E4E8"}>
        <Flex>
          <Image
            borderRadius="full"
            boxSize="40px"
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/AE34/production/_129169544_gettyimages-1459166551.jpg"
            alt="Dan Abramov"
          />
          <Text ml={"10px"} fontWeight={"bold"}>
            Nitin sharma
          </Text>
        </Flex>
        <Box w="80%" m="auto">
          <Text fontSize={"15px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            doloremque consectetur pariatur! Dicta deleniti laborum possimus
            cupiditate error asperiores ipsa pariatur, beatae facere commodi
            aliquid numquam. Earum adipisci a voluptatem? Iure pariatur
            voluptate
          </Text>
          <Image
            mt="1rem"
            w={"auto"}
            h="250px"
            borderRadius="7px"
            _hover={{
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
            }}
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/AE34/production/_129169544_gettyimages-1459166551.jpg"
            alt="Dan Abramov"
          />
        </Box>
      </Box>
      {/* ))} */}
    </Box>
  );
};

export default PostFeed;
