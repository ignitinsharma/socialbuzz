import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { setFetchAllPosts, setPosts } from "../../../Redux/action";
const PostFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, posts } = useSelector((store) => store);
  const userId = user._id;
  const [toggle, setToggle] = useState(false);

  /* This for re-rendor the app  */
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const headers = {
    Authorization: token,
  };

  /* Like Post */
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
        console.log("like res:", res.data);
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
        console.log("dislike res:", res);
        handleToggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    dispatch(setFetchAllPosts(headers));
  }, [toggle]);

  console.log("posts:", posts);

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
            {/* Like Dislike button  */}
            <Box
              cursor={"pointer"}
              mt={"1rem"}
              // border={"1px solid black"}
              h={"auto"}
            >
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
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default PostFeed;
