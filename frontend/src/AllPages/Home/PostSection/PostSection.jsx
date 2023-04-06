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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PostSection = () => {
  const toast = useToast();
  const [postData, setpostData] = useState({
    description: "",
    picturePath: "",
  });
  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store.token);
  // wanna uncomment
  //   const userId = user._id;
  //   console.log("userId:", userId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setpostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let postObjectwithId = {
    // wanna uncommant after some time
    // userId,
    description: postData.description,
    picturePath: postData.picturePath,
  };

  const headers = {
    Authorization: token,
  };
  const HandleDataSubmit = () => {
    axios
      .post(`http://localhost:8080/posts`, postObjectwithId, { headers })
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
    // console.log("postObjectwithId:", postObjectwithId);
  };
  return (
    <Box bg={"#F6F8FA"} h="fit-content">
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
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
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
              value={postData.description}
              name="description"
              onChange={handleValueChange}
              placeholder="Enter post description.."
            />
            <Input
              name="picturePath"
              value={postData.picturePath}
              onChange={handleValueChange}
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
