import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserSection from "../UserSection/UserSection";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const { user, posts } = useSelector((store) => store);
  const userId = user._id;

  return (
    <Box w={"100%"} m="auto">
      <Box>
        <Navbar />
      </Box>
      <Flex
        display={{ lg: "flex", md: "block", sm: "block" }}
        pt="1rem"
        m="auto"
        w="90%"
      >
        <UserSection />
        {posts &&
          posts.map((ele) =>
            ele._id === postId ? (
              <Box
                w={{ ld: "60%", md: "100%" }}
                mt={{ md: "1rem", sm: "1.5rem" }}
                ml={{ lg: "3rem", sm: "0", md: "0" }}
                key={ele._id}
                mb="10px"
                p="1rem"
                border={"1.5px solid #E1E4E8"}
              >
                {console.log(ele, "inside ele check")}
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
                      //   onClick={() => navigate(`/profile/${ele.userId}`)}
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
                  <Link to={`/post/${ele._id}`}>
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
                  </Link>
                </Box>
                {/* Like Dislike button  */}
                <Box cursor={"pointer"} mt={"1rem"} h={"auto"}>
                  <span>
                    {ele.likes.includes(userId) ? (
                      <FavoriteIcon
                        // onClick={() => disLikePost(ele._id)}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </span>

                  <span style={{ marginLeft: "0.3rem" }}>
                    {/* This onclick is toggling the Comment box which is show or hide kind of after click */}
                    {/* <CommentIcon
                      onClick={() => setToggleComment(!toggleComment)}
                    /> */}
                  </span>
                  <Box>
                    <Text fontSize={"15px"}>{ele.likes.length} Likes</Text>
                    <Box>
                      {ele.comments?.map((el) => (
                        <Box
                          //   py="1rem"
                          p="0.5rem"
                          mt={"10px"}
                          border={"1.5px solid #E1E4E8"}
                        >
                          <Flex alignItems={"center"}>
                            <Image
                              borderRadius="full"
                              boxSize="30px"
                              src={el.user.picturePath}
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
                                fontSize={"13px"}
                                _firstLetter={{ textTransform: "capitalize;" }}
                                fontWeight={"bold"}
                              >
                                {el.user.fullName}
                              </Text>
                              <Text fontSize={"13px"}>{el.userComment}</Text>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </Box>
                    {/* <Link to={`/post/${ele._id}`}>
                      <Text fontSize={"15px"}>
                        {ele.comments.length} Comments
                      </Text>
                    </Link> */}
                  </Box>
                </Box>
              </Box>
            ) : null
          )}
      </Flex>
    </Box>
  );
};

export default SinglePostPage;
