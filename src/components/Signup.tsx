import {
  Avatar,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../App";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const { setIsAuthenticated } = useContext(UserContext);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Store user data in session storage
    sessionStorage.setItem("userData", JSON.stringify(formData));
    setIsAuthenticated(true);
    toast.success("User registered Succesfully");
    // Redirect to home page
    navigate("/home");
  };

  return (
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems={"stretch"}
          spacing={"5"}
          w={["full", "96"]}
          m={"auto"}
        >
          <Heading alignSelf={"center"}>COUNTER HUB</Heading>
          <Avatar alignSelf={"center"} boxSize={"20"} />

          <Input
            placeholder={"Name"}
            type={"text"}
            name={"name"}
            value={formData.name}
            onChange={handleChange}
            required
            focusBorderColor={"purple.500"}
          />
          <Input
            placeholder={"Email"}
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            required
            focusBorderColor={"purple.500"}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            required
            focusBorderColor={"purple.500"}
          />

          <Button colorScheme={"purple"} type={"submit"}>
            Sign Up
          </Button>

          <Text textAlign={"right"}>
            Already Signed Up?{" "}
            <Button variant={"link"} colorScheme={"purple"}>
              <Link to={"/login"}>Login</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
