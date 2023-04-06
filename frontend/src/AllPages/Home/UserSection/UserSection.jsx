import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";

const UserSection = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  //   console.log("user:", user);
  const [userData, setUserData] = useState(null);

  return (
    <Box
      //   position={"sticky"}
      top={"23px"}
      border={"1px solid red"}
      w={{ lg: "23%", md: "90%", sm: "90%" }}
    >
      <Flex pr={"10px"} justifyContent={"space-between"}>
        <Flex columnGap={"5px"}>
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Box>
            <Text
              cursor={"pointer"}
              onClick={() => navigate(`/profile/${user._id}`)}
              fontWeight={"bold"}
            >
              Name
            </Text>
            <Text fontSize={"12px"}>10 friends</Text>
          </Box>
        </Flex>
        <Box cursor={"pointer"}>
          <PersonAddIcon />
        </Box>
      </Flex>
      <Divider mt={"0.5rem"} />
      <Box p="2px">
        <Flex>
          <WorkIcon style={{ fontSize: "1rem" }} />
          <Text ml={"5px"} fontSize={"12px"}>
            Software engineer
          </Text>
        </Flex>
        <Flex>
          <LocationOnIcon style={{ fontSize: "1rem" }} />
          <Text ml={"5px"} fontSize={"12px"}>
            USA
          </Text>
        </Flex>
      </Box>
      <Divider mt={"0.5rem"} />
    </Box>
  );
};

export default UserSection;
