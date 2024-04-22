import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logoutHandler} = useContext(UserContext);
  const logOut = () => {
    logoutHandler();
    navigate("/login");
  };

  return (
    <>
      <Button
        pos={"fixed"}
        top={4}
        left={4}
        colorScheme="purple"
        p={"0"}
        w={"10"}
        h={"10"}
        borderRadius={"full"}
        onClick={onOpen}
        zIndex={"overlay"}
      >
        <BiMenuAltLeft size={"20"} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <h3>COUNTER HUB</h3>
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button onClick={onClose} colorScheme="purple" variant={"ghost"}>
                <Link to={"/home"}>Home</Link>
              </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <HStack
              pos={"absolute"}
              bottom={10}
              left={0}
              w={"full"}
              justifyContent={"space-evenly"}
            >
              <Button onClick={onClose} colorScheme="purple">
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button
                onClick={onClose}
                colorScheme="purple"
                variant={"outline"}
              >
                <Link to={"/"}>Sign Up</Link>
              </Button>
              <Button onClick={onClose} colorScheme="purple">
                <Link to={"/"} onClick={logOut}>
                  Log Out
                </Link>
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
