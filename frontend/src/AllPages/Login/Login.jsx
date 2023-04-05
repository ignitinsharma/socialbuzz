import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import Loginpng from "../../assets/login.svg";

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
      <Box textAlign={"center"} py="1rem">
        <Text
          color="var(--main-color)"
          cursor={"pointer"}
          fontSize={{ lg: "2rem", md: "1.3rem", sm: "1rem" }}
          fontWeight={"bold"}
        >
          {" "}
          &lt;SocialBuzz/&gt;
        </Text>
      </Box>
      <Flex
        mt={{ lg: "2rem", md: "1rem", sm: "1rem" }}
        justifyContent={"center"}
        display={{ lg: "flex", md: "block", sm: "block" }}
        w="90%"
        gap="1rem"
        mx="auto"
      >
        <Box
          borderRadius={"8px"}
          height={"fit-content"}
          w={{
            lg: "30%",
            md: "90%",
            sm: "90%",
          }}
          py={"3rem"}
          px="2rem"
          shadow={
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
          }
        >
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
        <Box mt="2rem">
          <img src={Loginpng} alt="" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
