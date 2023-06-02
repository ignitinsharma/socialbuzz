import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import {
  setFetchAllPosts,
  setFollowUser,
  setPosts,
} from "../../../Redux/action";
const PostFeed = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, allusers, posts } = useSelector((store) => store);
  // console.log('alluser:', allusers)
  // console.log("posts: in feed page:", posts);
  // console.log("user in feed page:", user);
  const userId = user._id;
  const [toggleUseEffect, setToggleUseEffect] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  /* This for re-rendor the app  */
  const handleToggle = () => {
    setToggleUseEffect(!toggleUseEffect);
  };

  const headers = {
    Authorization: token,
  };

  // const method = isFollowing ? "DELETE" : "POST";
  const baseUrl = "http://localhost:8080";
  /* Like Post */
  const likePost = (postId) => {
    axios
      .put(`${baseUrl}/posts/like`, { userId, postId }, { headers })
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
      .put(`${baseUrl}/posts/dislike`, { userId, postId }, { headers })
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

  const handleSubmitComment = (postId) => {
    axios
      .put(
        `${baseUrl}/posts/comment`,
        {
          userId,
          user,
          postId,
          userComment: commentInput,
        },
        { headers }
      )
      .then((res) => {
        toast({
          title: "Comment Added.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleToggle();
        setToggleComment(false);
      })
      .catch((error) => {
        console.error(error);
        handleToggle();
      });
  };

  useEffect(() => {
    dispatch(setFetchAllPosts(headers));
  }, [toggleUseEffect]);

  const handleFollowandUnfollowUser = (
    headers,
    userId,
    userWhoIsGettingFollower,
    method
  ) => {
    // setIsFollowing((prevState) => !prevState);
    dispatch(setFollowUser(headers, userId, userWhoIsGettingFollower, method));
  };
  return (
    <Box mt="2rem">
      {posts &&
        posts.map((ele) => (
          <Box key={ele._id} mb="10px" p="1rem" border={"1.5px solid #E1E4E8"}>
            <Flex>
              <Image
                borderRadius="full"
                boxSize="40px"
                src={ele.userPicturePath}
                alt="Dan Abramov"
                objectFit={"cover"}
              />
              <Box w="100%" ml={"10px"}>
                <Flex justifyContent={"space-between"}>
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
                    {`${ele.fullName}`}
                  </Text>
                </Flex>
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
              <Link to={`/post/${ele._id}`}>
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
              </Link>
            </Box>
            {/* Like Dislike button  */}
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

              <span style={{ marginLeft: "0.3rem" }}>
                {/* This onclick is toggling the Comment box which is show or hide kind of after click */}
                <CommentIcon onClick={() => setToggleComment(!toggleComment)} />
              </span>
              <Box>
                <Text fontSize={"15px"}>{ele.likes.length} Likes</Text>
                <Link to={`/post/${ele._id}`}>
                  <Text fontSize={"15px"}>{ele.comments.length} Comments</Text>
                </Link>
              </Box>
              <Box mt={"1rem"}>
                {toggleComment ? (
                  <span>
                    <Input
                      _placeholder={{ fontsize: "13px" }}
                      width={"75%"}
                      placeholder="Enter your thoughts..."
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <Button
                      color={"white"}
                      _hover={{ bg: "var(--black-color)" }}
                      bg={"var(--main-color)"}
                      fontSize={"13px"}
                      ml={"10px"}
                      /* Passing the postID */
                      onClick={() => handleSubmitComment(ele._id)}
                    >
                      Submit
                    </Button>
                  </span>
                ) : null}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default PostFeed;
