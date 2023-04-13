import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Redux/action";

const Links = [];

export default function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogoutClick = () => {
    dispatch(setLogout());
    navigate("/");
  };
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
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
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
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link
                  style={{ fontWeight: "550", marginRight: "0.6rem" }}
                  fontSize="md"
                  _hover={{ textDecoration: "none" }}
                  href={link.path}
                  key={link.id}
                >
                  {link.title}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Flex>
              <Box mr={4}>
                <Link href="">
                  <SearchIcon />
                </Link>
              </Box>
              {/* <Box mr={4}>
              <Link href="cart">
              <LocalMall />
              </Link>
            </Box> */}
              <Box mr={1}>
                <Link href="signup">
                  <PersonIcon />
                </Link>
              </Box>
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
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogoutClick}>Logout 😶</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        {isOpen ? (
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
        ) : null}
      </Box>
    </>
  );
}
