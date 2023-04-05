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
import register from "../../assets/register.svg";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
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
            lg: "40%",
            md: "90%",
            sm: "90%",
          }}
          py={"3rem"}
          px="2rem"
          shadow={
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
          }
        >
          {/* register form */}
          <RegisterForm />
        </Box>
        <Box mt="2rem">
          <img src={register} alt="" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Register;
