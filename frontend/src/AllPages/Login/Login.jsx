import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import Loginpng from "../../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/action";

const Login = () => {
  let userObject = JSON.parse(localStorage.getItem("userdataAndtoken")) || {};
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", loginFormData)
      .then((res) => {
        const { token, user } = res.data;
        if (token) {
          dispatch(setLogin(user, token));
          toast({
            title: "Login Successful..😁",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          userObject.token = token;
          userObject.user = user;
          localStorage.setItem("userdataAndtoken", JSON.stringify(userObject));
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error, "failed");
        toast({
          title: "Wrong credential.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    console.log(loginFormData);
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
                name="email"
                placeholder="Enter your email"
                value={loginFormData.email}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginFormData.password}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button
              type="submit"
              color={"white"}
              _hover={{ bg: "var(--black-color)" }}
              bg={"var(--main-color)"}
              mt={4}
            >
              Log In
            </Button>
            <Link to="/register">
              <Text
                color="var(--main-color)"
                _hover={{ color: "var(--black-color)" }}
                fontSize={"0.8rem"}
                py="1rem"
              >
                Don't have Account Register...
              </Text>
            </Link>
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
