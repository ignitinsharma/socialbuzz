import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";

const UserSection = () => {
  const user = useSelector((store) => store.user);
  // console.log("user:", user._id);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  return (
    <Box w={{ lg: "23%", md: "90%", sm: "90%" }}>
      <Flex pr={"10px"} justifyContent={"space-between"}>
        <Flex columnGap={"5px"}>
          <Image
            borderRadius="full"
            boxSize="50px"
            src={user.picturePath}
            alt="Dan Abramov"
            objectFit={"cover"}
          />
          <Box>
            <Text
              _firstLetter={{ textTransform: "capitalize;" }}
              cursor={"pointer"}
              onClick={() => navigate(`/profile/${user._id}`)}
              fontWeight={"bold"}
              _hover={{
                textDecoration: "underline",
                textDecorationThickness: "0.8px",
                textUnderlineOffset: "3px",
              }}
            >
              {/* {`${user.firstName} ${user.lastName}`} */}
              {`${user.fullName}`}
            </Text>
            <Text fontSize={"12px"}>0 friends</Text>
          </Box>
        </Flex>
      </Flex>
      <Divider mt={"0.5rem"} />
      <Box p="2px">
        <Flex>
          <WorkIcon style={{ fontSize: "1rem" }} />
          <Text
            _firstLetter={{ textTransform: "capitalize;" }}
            ml={"5px"}
            fontSize={"12px"}
          >
            {user.occupation}
          </Text>
        </Flex>
        <Flex>
          <LocationOnIcon style={{ fontSize: "1rem" }} />
          <Text
            _firstLetter={{ textTransform: "capitalize;" }}
            ml={"5px"}
            fontSize={"12px"}
          >
            {user.location}
          </Text>
        </Flex>
      </Box>
      <Divider mt={"0.5rem"} />
    </Box>
  );
};

export default UserSection;
