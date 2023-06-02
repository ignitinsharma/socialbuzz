import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  MenuButton,
  MenuItem,
  Button,
  Menu,
  MenuList,
  Input,
  List,
  ListItem,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Redux/action";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Links = [];

export default function Navbar() {
  const { user, allusers } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toggleInputBox, setToggleInputBox] = useState(false);
  const [searchUsers, setsearchUsers] = useState([]);
  const [handleInputValue, setHandleInputValue] = useState(null);
  const dropdownRef = useRef(null);
  const [togglePage, settogglePage] = useState(false);

  const handleLogoutClick = () => {
    dispatch(setLogout());
    navigate("/");
    window.location.reload();
    handleToggle();
  };

  const handleToggle = () => {
    settogglePage(!togglePage);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setsearchUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [togglePage]);

  const handleInputKeyPress = async (event) => {
    /* It means if user press enter then it will excute  */
    if (event.key === "Enter") {
      /* But if user entered and in input no value present so
          are making our state empty and also input box value
      */
      if (handleInputValue.trim() === "") {
        setHandleInputValue("");
        setsearchUsers([]);
        return;
      } else {
        /* Otherwise we are fetching that api */
        try {
          const response = await axios.post(
            "http://localhost:8080/user/search",
            {
              query: handleInputValue,
            }
          );
          setsearchUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  console.log(searchUsers);

  return (
    <>
      <Box
        zIndex={9999}
        w={"100%"}
        bg={useColorModeValue("white")}
        px={4}
        h={"5rem"}
        borderBottom={"1.5px solid #E1E4E8"}
      >
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Text
              color="var(--main-color)"
              cursor={"pointer"}
              onClick={() => navigate("/home")}
              fontSize={{ lg: "1.4rem", md: "1.3rem", sm: "1rem" }}
              fontWeight={"bold"}
            >
              {" "}
              &lt;SocialBuzz/&gt;
            </Text>
          </HStack>
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              {/* {toggleInputBox ? ( */}
              <Box mr={4}>
                <InputGroup mt={""}>
                  <Input
                    onKeyPress={handleInputKeyPress}
                    onChange={(e) => setHandleInputValue(e.target.value)}
                    placeholder="find users.."
                    border={"none"}
                    backgroundColor={"rgba(255, 255, 255, 0.08)"}
                    w={{ lg: "250px", base: "150px" }}
                    py={2}
                    px={4}
                    borderRadius={"8px"}
                    ref={dropdownRef}
                  />
                  <InputRightElement
                    w={"4.5rem"}
                    children={
                      <SearchIcon boxSize={5} mt={2} opacity={"0.6"} mb={2} />
                    }
                  />
                </InputGroup>
              </Box>

              {searchUsers?.length > 0 && (
                <Box
                  position="absolute"
                  width="100%"
                  maxWidth="300px"
                  bg="white"
                  boxShadow="sm"
                  zIndex={1}
                  height={"auto"}
                  top={"4rem"}
                >
                  <List
                    spacing={0}
                    border="1px solid gray"
                    borderRadius="md"
                    overflow="hidden"
                  >
                    {searchUsers?.map((user) => (
                      <Flex
                        onClick={() => navigate(`/profile/${user._id}`)}
                        key={user._id}
                        px={4}
                        py={2}
                        _hover={{ bg: "gray.100" }}
                      >
                        <Image
                          borderRadius="full"
                          boxSize="25px"
                          src={user.picturePath}
                          alt="Dan Abramov"
                          objectFit={"cover"}
                        />
                        <Text fontWeight={"bold"} ml={"1rem"}>
                          {" "}
                          {user.fullName}
                        </Text>
                      </Flex>
                    ))}
                  </List>
                </Box>
              )}
              {/* <Box mr={1}>
                <Link href="signup">
                  <PersonIcon />
                </Link>
              </Box> */}
            </Flex>
            <Box mr={1}>
              <Menu>
                <MenuButton
                  bg="white"
                  _hover={{ bg: "white" }}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  <Text
                    fontSize={"14px"}
                    _firstLetter={{ textTransform: "capitalize;" }}
                  >
                    {`${user.fullName}`}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogoutClick}>Logout 😶</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link
                  style={{ fontWeight: "600" }}
                  href={link.path}
                  key={link.id}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}
