import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let maincolor = "var(--maincolor)";

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login logic goes here
  };

  return (
    <Box>
      <Box>Navbar</Box>
      <Box w="30%" mx="auto">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
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
          >
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
