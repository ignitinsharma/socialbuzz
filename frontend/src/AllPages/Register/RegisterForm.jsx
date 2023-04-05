import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login logic goes here
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Enter Name</FormLabel>
          <Input
            type="email"
            placeholder="Enter your name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          color={"white"}
          _hover={{ bg: "var(--black-color)" }}
          bg={"var(--main-color)"}
          mt={4}
          isFullWidth
          onClick={handleSubmit}
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
