import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostFeed = () => {
  let userObject = JSON.parse(localStorage.getItem("userdataAndtoken"));
  const [allPosts, setAllPosts] = useState([]);
  const { token } = useSelector((store) => store);
  let user = userObject.user;
  // console.log('user:', user)

  const headers = {
    Authorization: userObject.token || token,
  };
  const fetchPost = () => {
    axios.get(`http://localhost:8080/posts`, { headers }).then((res) => {
      console.log(res);
      setAllPosts(res.data);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Box mt="2rem">
      {allPosts?.map((ele) => (
        <Box mb="10px" p="1rem" border={"1.5px solid #E1E4E8"}>
          <Flex>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={ele.userPicturePath}
              alt="Dan Abramov"
              objectFit={"cover"}
            />
            <Box ml={"10px"}>
              <Text
                _firstLetter={{ textTransform: "capitalize;" }}
                fontWeight={"bold"}
              >
                {`${ele.firstName} ${ele.lastName}`}
              </Text>
              <Text
                color={"var(--main-color)"}
                fontSize={"12px"}
                _hover={{ fontSize: "bold" }}
              >
                #socialbuzz
              </Text>
            </Box>
          </Flex>
          <Box w="80%" m="auto">
            <Text
              _firstLetter={{ textTransform: "capitalize;" }}
              fontSize={"15px"}
            >
              {ele.description}
            </Text>
            <Image
              mt="1rem"
              w={"100%"}
              h="250px"
              borderRadius="7px"
              _hover={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
              }}
              src={ele.picturePath}
              alt="Dan Abramov"
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PostFeed;
