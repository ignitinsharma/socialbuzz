import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const RegisterForm = () => {
  const [postImage, setPostImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    fullName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* For converting image into link using cloudinary */
  const handleImagePost = () => {
    /* 
    By creating a new instance of FormData, you can then append key-value pairs 
    to it using the append() method, which allows you to add form data to the object.

    examples:- 
    formData.append('username', 'John');
    formData.append('password', 'password123');
    */
    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("upload_preset", "socialbuzz");
    axios
      .post(`https://api.cloudinary.com/v1_1/socialbuzz/image/upload`, formData)
      .then((res) => {
        setUpdatedImage(res.data.url);
        // console.log(res.data.url, "res.data.url");
      })
      .catch((res) => console.log(res));
  };

  const handleRegister = () => {
    formData.updatedImage = updatedImage;
    axios
      .post("http://localhost:8080/auth/register", formData)
      .then((response) => {
        toast({
          title: "Account created successfully..😁",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Fill details correctly..😶",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    if (updatedImage) {
      handleRegister();
    }
  }, [updatedImage]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleImagePost();
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Flex gap={"2px"}>
          {/* <FormControl isRequired>
            <FormLabel>Enter First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              placeholder="e.x. Elon"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </FormControl> */}
          <FormControl isRequired>
            <FormLabel>Enter Full Name</FormLabel>
            <Input
              type="text"
              name="fullName"
              placeholder="e.x. Elon Musk"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <FormControl isRequired>
            <FormLabel>Enter Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              placeholder="e.x. Musk"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </FormControl> */}
        </Flex>

        <FormControl isRequired mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="e.x. Elonmusk@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Profile Picture Url</FormLabel>
          <Input
            type="file"
            accept="image"
            name="picturePath"
            onChange={(e) => setPostImage(e.target.files[0])}
          />
        </FormControl>

        <Flex>
          <FormControl isRequired mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              placeholder="e.x. Delhi"
              value={formData.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Occupation</FormLabel>
            <Input
              type="text"
              name="occupation"
              placeholder="e.x Father of Tesla"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </FormControl>
        </Flex>

        <Button
          type="submit"
          color={"white"}
          _hover={{ bg: "var(--black-color)" }}
          bg={"var(--main-color)"}
          mt={4}
        >
          Register
        </Button>
        <Link to="/">
          <Text
            color="var(--main-color)"
            _hover={{ color: "var(--black-color)" }}
            fontSize={"0.8rem"}
            py="1rem"
          >
            Already have Account Login...
          </Text>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
