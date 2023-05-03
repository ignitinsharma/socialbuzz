import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFetchAllUsers } from "../../../Redux/action";
import { Link } from "react-router-dom";

const AllUserSection = () => {
  const dispatch = useDispatch();
  const { allusers, token, user } = useSelector((store) => store);
  const userId = user._id;
  // console.log("user:", userId);
  // console.log("alluser:", allusers);

  const headers = {
    Authorization: token,
  };

  useEffect(() => {
    dispatch(setFetchAllUsers(headers));
  }, []);

  return (
    <Box w={{ lg: "40%", md: "100%", sm: "100%" }}>
      {allusers?.map((el) => {
        if (userId !== el._id) {
          return (
            <Box
              key={el._id}
              mb={"1rem"}
              ml={{ lg: "1rem", md: "0", sm: "0" }}
              w={"100%"}
              //   py="1rem"
              p="0.5rem"
              // mt={"10px"}
              border={"1.5px solid #E1E4E8"}
            >
              <Flex alignItems={"center"}>
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={el.picturePath}
                  alt="Dan Abramov"
                  objectFit={"cover"}
                />
                <Box ml={"10px"}>
                  <Link to={`/profile/${el._id}`}>
                    <Text
                      cursor={"pointer"}
                      _hover={{
                        textDecoration: "underline",
                        textDecorationThickness: "0.8px",
                        textUnderlineOffset: "3px",
                      }}
                      fontSize={"16px"}
                      _firstLetter={{ textTransform: "capitalize;" }}
                      fontWeight={"bold"}
                    >
                      {el.fullName}

                      {/* {`${el.firstName} ${el.lastName}`} */}
                    </Text>
                  </Link>
                  {/* <Text fontSize={"13px"}>{el.userComment}</Text> */}
                </Box>
                <Button
                  ml={"2rem"}
                  variant="outline"
                  letterSpacing="wide"
                  fontSize="xs"
                  height="6"
                  px="3"
                  bg="gray.900"
                  color="white"
                  borderColor="gray.900"
                  _hover={{
                    bg: "gray.700",
                  }}
                >
                  Follow
                </Button>
              </Flex>
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default AllUserSection;
