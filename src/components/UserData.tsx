import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Center,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { UserContext } from "../App";

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const UserDataForm: React.FC = () => {
  const { setFormData } = useContext(UserContext);
  const bg = useColorModeValue("teal.100", "teal.800");
  const borderColor = useColorModeValue("teal.300", "teal.600");
  const [userData, setUserData] = useState<UserData>({
    id: nanoid(),
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();
        setIsOpen(true);
        // Remove the event listener once the notification is triggered
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setUnsavedChanges(true);
  };

  const handleSubmit = () => {
    // Save data to local storage
    setFormData(userData);
    const savedData = JSON.parse(localStorage.getItem("userData") || "[]");
    localStorage.setItem("userData", JSON.stringify([...savedData, userData]));

    // Reset form data
    setUserData({
      id: nanoid(),
      name: "",
      address: "",
      email: "",
      phone: "",
    });

    // Reset unsaved changes flag
    setUnsavedChanges(false);
    setIsOpen(false);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  return (
    <Center>
      <Box
        p={4}
        mb={6}
        w={"80%"}
        h={"80vh"}
        bg={bg}
        borderRadius="xl"
        boxShadow="lg"
        zIndex={10}
      >
        <VStack spacing={6} align="stretch">
          <Center>
            <Heading fontSize="2xl" color="teal.500" zIndex={10}>
              User Data
            </Heading>
          </Center>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              variant="filled"
              bg="white"
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "gray.100", border: `2px solid ${borderColor}` }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              variant="filled"
              bg="white"
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "gray.100", border: `2px solid ${borderColor}` }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              variant="filled"
              bg="white"
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "gray.100", border: `2px solid ${borderColor}` }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              variant="filled"
              bg="white"
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "gray.100", border: `2px solid ${borderColor}` }}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleFormClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg="white" borderRadius="xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="teal.500">
              Unsaved Changes
            </AlertDialogHeader>

            <AlertDialogBody>
              You have unsaved changes. Are you sure you want to leave?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleFormClose} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </Center>
  );
};

export default UserDataForm;
