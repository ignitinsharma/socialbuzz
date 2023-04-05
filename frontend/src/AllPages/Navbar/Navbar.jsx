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

const Links = [
  {
    title: "Home",
    id: 1,
    path: "/",
  },
  {
    title: "Mens",
    id: 2,
    path: "/mens",
  },
  {
    title: "Women",
    id: 3,
    path: "/women",
  },
];

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const fullName = `${user.firstName} ${user.lastName}`;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        zIndex={9999}
        w={"100%"}
        position={"fixed"}
        bg={useColorModeValue("white")}
        px={4}
        border={"1px solid black"}
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
              _hover={{ color: "var(--main-color)", transition: "0.3s" }}
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
            <Box mr={1}>
              <Menu>
                <MenuButton
                  bg="white"
                  _hover={{ bg: "white" }}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  person name
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Logout
                  </MenuItem>
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
