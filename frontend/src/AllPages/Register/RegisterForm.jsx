import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picturePath: "",
    location: "",
    occupation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/register", formData)
      .then((response) => {
        console.log(response.data);
        // do something with the response data
      })
      .catch((error) => {
        console.error(error);
        // handle the error
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Flex gap={"2px"}>
          <FormControl isRequired>
            <FormLabel>Enter First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              placeholder="e.x. Elon"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Enter Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              placeholder="e.x. Musk"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
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
            type="text"
            name="picturePath"
            placeholder="Enter url"
            value={formData.picturePath}
            onChange={handleInputChange}
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