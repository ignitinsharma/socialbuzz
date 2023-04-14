import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import profile from "../../assets/profile.svg";
import Navbar from "../Navbar/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store);
  // console.log("user:", user);

  const headers = {
    Authorization: token,
  };

  const [singlePosts, setsinglePosts] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const { userId } = useParams();
  console.log("userId:", userId);
  // const paramsId = userId.id;
  // console.log("paramsId", paramsId);

  const handleFetchSinglePosts = () => {
    axios
      .get(`http://localhost:8080/posts/profile/${userId}`, { headers })
      .then((res) => {
        setsinglePosts(res.data);
        // console.log(res.data, "inside api");
      });
  };

  const handleFetchUser = () => {
    axios
      .get(`http://localhost:8080/user/${userId}`, { headers })
      .then((res) => {
        setSingleUser(res.data);
        // console.log(res.data.picturePath, "user info");
      });
  };

  useEffect(() => {
    handleFetchSinglePosts();
    handleFetchUser();
  }, []);
  console.log(singlePosts, "singlePosts");
  console.log(singleUser, "singleUser");

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Flex justifyContent={"space-between"} w={"80%"} m={"auto"}>
        <Box
          pt="1rem"
          mt={"2rem"}
          borderRadius={"10px"}
          w={"65%"}
          h={"40rem"}
          _hover={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
            transition: "0.4s",
          }}
          border={"1.5px solid #E1E4E8"}
        >
          <Box px="0.5rem">
            <Image h={"200px"} w="100%" src={profile} />
            <Box padding={"0 1rem"} top={"260px"} position={"absolute"}>
              <Image
                borderRadius={"full"}
                boxSize={"150px"}
                objectFit={"cover"}
                src={singleUser?.picturePath}
              />
            </Box>
            <Box px={"2rem"} mt={"8rem"}>
              <Flex alignItems={"center"}>
                <Text
                  _firstLetter={{ textTransform: "capitalize;" }}
                  fontSize={"24px"}
                  fontWeight={"bold"}
                >
                  {`${singleUser?.firstName} ${singleUser?.lastName}`}
                </Text>
                <Button
                  ml={"2rem"}
                  variant="outline"
                  fontWeight="medium"
                  letterSpacing="wide"
                  transition="all ease-in 75ms"
                  borderRadius="md"
                  fontSize="xs"
                  height="6"
                  px="3"
                  bg="gray.900"
                  color="white"
                  border="1px solid"
                  borderColor="gray.900"
                  _hover={{
                    bg: "gray.700",
                  }}
                >
                  Follow
                </Button>
              </Flex>
              <Flex display="block" mt="1rem" alignItems={"center"}>
                <Stack direction="row">
                  <WorkIcon />
                  <Text ml={"5px"}> {singleUser?.occupation}</Text>
                </Stack>
                <Stack mt="10px" direction="row">
                  <LocationOnIcon />
                  <Text ml={"5px"}> {singleUser?.location}</Text>
                </Stack>
              </Flex>
            </Box>
          </Box>
        </Box>
        {/*  Right Container */}
        <Box
          mt={"2rem"}
          borderRadius={"10px"}
          w={"30%"}
          h={"40rem"}
          _hover={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
            transition: "0.4s",
          }}
          border={"1.5px solid #E1E4E8"}
        >
          {/* hello2 */}
        </Box>
      </Flex>
      <Box m="auto" w="80%" border={"1px solid black"} h="40rem">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {singlePosts?.map((ele) => (
            <Box
              key={ele._id}
              mb="10px"
              p="1rem"
              border={"1.5px solid #E1E4E8"}
            >
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
                    cursor={"pointer"}
                    _hover={{
                      textDecoration: "underline",
                      textDecorationThickness: "0.8px",
                      textUnderlineOffset: "3px",
                    }}
                    _firstLetter={{ textTransform: "capitalize;" }}
                    fontWeight={"bold"}
                    onClick={() => navigate(`/profile/${ele.userId}`)}
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
                  src={ele.postPicturePath}
                  alt={ele.firstName}
                  objectFit={"cover"}
                />
              </Box>
              <Box
                cursor={"pointer"}
                mt={"1rem"}
                border={"1px solid black"}
                h={"2rem"}
              >
                <span>
                  <FavoriteIcon style={{ color: "red" }} />
                  <FavoriteBorderIcon />
                </span>
                <span>
                  <CommentIcon />
                </span>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
