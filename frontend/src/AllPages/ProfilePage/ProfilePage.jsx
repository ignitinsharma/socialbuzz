import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import profile from "../../assets/profile.svg";
import Navbar from "../Navbar/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  setFollowUser,
  setPosts,
  setSingleUser,
  setSingleUserPost,
  setUnFollowUser,
} from "../../Redux/action";
import AllUserSection from "../Home/FriendSection/FriendSection";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { token, posts, user, singleUserPost, singleUser, isFollowUser } =
    useSelector((store) => store);
  // console.log("user:", user._id);
  // console.log("isFollowUser:", isFollowUser);
  const [isFollow, setisFollow] = useState(false);
  // console.log("isFollow:", isFollow);

  const userIdWhoIsFollowing = user._id;
  // console.log("userIdWhoIsFollowing:", userIdWhoIsFollowing);
  const [toggle, setToggle] = useState(false);
  const { userId } = useParams();
  // const [isFollow, setIsFollow] = useState(false);

  /* This for re-rendor the app  */
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const headers = {
    Authorization: token,
  };

  console.log(user._id, user.fullName);
  console.log(singleUser.followers, "followers");

  const handleFollowUser = (userWhoIsGettingFollower) => {
    dispatch(
      setFollowUser(headers, userIdWhoIsFollowing, userWhoIsGettingFollower)
    );
    handleFetchUser();
  };
  const handleUnfollowUser = (userWhoIsGettingFollower) => {
    dispatch(
      setUnFollowUser(headers, userIdWhoIsFollowing, userWhoIsGettingFollower)
    );
    handleFetchUser();
  };

  const handleFetchUser = () => {
    axios
      .get(`http://localhost:8080/user/${userId}`, { headers })
      .then((res) => {
        setSingleUser(res.data);
      });
  };

  const likePost = (postId) => {
    axios
      .put(`http://localhost:8080/posts/like`, { userId, postId }, { headers })
      .then((res) => {
        const newData = posts.map((posts) => {
          if (posts._id == res._id) {
            return res;
          } else {
            return posts;
          }
        });
        dispatch(setPosts(newData));
        // console.log("like res:", res.data);
        handleToggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* disLike Post */
  const disLikePost = (postId) => {
    axios
      .put(
        `http://localhost:8080/posts/dislike`,
        { userId, postId },
        { headers }
      )
      .then((res) => {
        const newData = posts.map((posts) => {
          if (posts._id == res._id) {
            return res;
          } else {
            return posts;
          }
        });
        dispatch(setPosts(newData));
        // console.log("dislike res:", res);
        handleToggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(singleUser._id);

  useEffect(() => {
    dispatch(setSingleUserPost(headers, userId));
    dispatch(setSingleUser(headers, userId));
    handleFetchUser();
  }, [toggle, userId, isFollowUser]);

  // useEffect(() => {
  //   if (singleUser?.followers.includes(user._id)) {
  //     setisFollow(true);
  //     // handleToggle();
  //   }
  // }, [isFollow]);
  // console.log("isFollow:", isFollow);
  // console.log("singlePosts", singleUserPost);

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Flex
        pt={"2rem"}
        display={{ lg: "flex", md: "block", sm: "block" }}
        justifyContent={"space-between"}
        w={"80%"}
        m={"auto"}
      >
        <Box
          py="2rem"
          px={"1rem"}
          // mt={"2rem"}
          borderRadius={"10px"}
          w={{ lg: "65%", md: "100%", sm: "100%" }}
          // h={"40rem"}
          h="fit-content"
          _hover={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
            transition: "0.4s",
          }}
          border={"1.5px solid #E1E4E8"}
          // pb={{ lg: "0px", md: "6rem", sm: "6rem" }}
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
                  {`${singleUser?.fullName}`}
                  {/* {`${singleUser?.firstName} ${singleUser?.lastName}`} */}
                </Text>
                {isFollowUser ? (
                  <Button
                    ml={"2rem"}
                    variant="outline"
                    letterSpacing="wide"
                    fontSize="xs"
                    height="6"
                    px="3"
                    bg="white.500"
                    color="black"
                    borderColor="white.900"
                    onClick={() => handleUnfollowUser(singleUser?._id)}
                  >
                    Unfollow
                  </Button>
                ) : (
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
                    onClick={() => handleFollowUser(singleUser?._id)}
                  >
                    Follow
                  </Button>
                )}
              </Flex>
              <Flex display="block" mt="1rem" alignItems={"center"}>
                <Stack direction="row">
                  <PeopleAltIcon />
                  <Text ml={"5px"}>
                    {" "}
                    {singleUser?.followers.length} Followers
                  </Text>
                </Stack>
                <Stack mt="10px" direction="row">
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
        {/* Right section */}
        <AllUserSection />
      </Flex>
      <Box pt="2rem" m="auto" w="80%" h="40rem">
        <Grid
          templateColumns={{
            lg: "repeat(2, 1fr)",
            md: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
          gap={6}
        >
          {singleUserPost?.map((ele) => (
            <Box
              key={ele._id}
              borderRadius={"8px"}
              _hover={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
              }}
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
                  >
                    {ele.fullName}
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
                  h={{ lg: "250px", md: "250px", sm: "150px" }}
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
              <Box cursor={"pointer"} mt={"1rem"} h={"auto"}>
                <span>
                  {ele.likes.includes(userId) ? (
                    <FavoriteIcon
                      onClick={() => disLikePost(ele._id)}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderIcon onClick={() => likePost(ele._id)} />
                  )}
                </span>
                <span>
                  <CommentIcon />
                </span>
                <Box>
                  <span>{ele.likes.length} Likes</span>
                  <Link to={`/post/${ele._id}`}>
                    <Text fontSize={"15px"}>
                      {ele.comments.length} Comments
                    </Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
