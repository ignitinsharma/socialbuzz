import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PostSection = () => {
  const { user, token } = useSelector((store) => store);

  const toast = useToast();
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setpostImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);

  const userId = user._id;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImagePost = () => {
    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("upload_preset", "socialbuzz");
    axios
      .post(`https://api.cloudinary.com/v1_1/socialbuzz/image/upload`, formData)
      .then((res) => {
        setUpdatedImage(res.data.url);
        console.log(res.data.url, "res.data.url");
      })
      .catch((res) => console.log(res));
  };
  const headers = {
    Authorization: token,
  };

  useEffect(
    () => {
      /* If the value is present inside this updateImage then we can simple do 
        POST request of that Image ULR and that description data...
    */
      if (updatedImage) {
        axios
          .post(
            `http://localhost:8080/posts`,
            /* Posting the data Object into MongoDB  */
            { userId, updatedImage, postDescription },
            { headers }
          )
          .then((response) => {
            toast({
              title: "Post successfully..😁",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "Facing some issue..😶",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      }
    },
    /* When URL change so this useEffect got re-rendor again... */
    [updatedImage]
  );

  const HandleDataSubmit = () => {
    /* After the submit this function simply set 
      the image into useState - updatedImage */
    handleImagePost();
  };
  return (
    <Box
      top={"0"}
      position={"sticky"}
      border={"1.5px solid #E1E4E8"}
      bg={"#F6F8FA"}
      h="fit-content"
    >
      <Flex
        p={"0.5rem"}
        w={"95%"}
        _hover={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          transition: "0.4s ease-in-out",
        }}
        m="auto"
        borderRadius={"10px"}
        _focus={{ border: "none" }}
        onClick={onOpen}
      >
        <Flex>
          <Image
            borderRadius="full"
            boxSize="40px"
            src={user.picturePath}
            alt="Dan Abramov"
            objectFit={"cover"}
          />
          <Input
            fontSize={"13px"}
            style={{ width: "30rem" }}
            ml="10px"
            placeholder="share content.. "
            type="text"
          />
        </Flex>
      </Flex>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={"8rem"} mr="8rem">
          <ModalHeader fontSize={"1rem"}>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              value={postDescription}
              name="description"
              onChange={(e) => setPostDescription(e.target.value)}
              placeholder="Enter post description.."
            />
            <Input
              type="file"
              accept="image"
              name="picturePath"
              onChange={(e) => setpostImage(e.target.files[0])}
              mt="1rem"
              placeholder="Enter image URL"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              _hover={{ bg: "var(--black-color)" }}
              bg={"var(--main-color)"}
              onClick={HandleDataSubmit}
            >
              Post
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostSection;
