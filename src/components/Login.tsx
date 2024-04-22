import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../App";
import toast from "react-hot-toast";

const Login = () => {
  const { setIsAuthenticated } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedData = sessionStorage.getItem("userData");
    if (!storedData) {
      // Handle case when no user data is stored
      return;
    }
    const userData = JSON.parse(storedData);
    if (
      formData.email === userData.email &&
      formData.password === userData.password
    ) {
      // Redirect to home page or any other page upon successful login
      setIsAuthenticated(true);
      navigate("/home");
      toast.success("Logged in successfully");
    } else {
      // Handle incorrect login credentials
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems={"stretch"}
          spacing={"8"}
          w={["full", "96"]}
          m={"auto"}
          my={"16"}
        >
          <Heading>Welcome Back</Heading>
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
          <Button variant={"link"} alignSelf={"flex-end"}>
            <Link to={"/forgetpassword"}>Forget Password?</Link>
          </Button>
          <Button colorScheme={"purple"} type={"submit"}>
            Log In
          </Button>
          <Text textAlign={"right"}>
            New User?{" "}
            <Button variant={"link"} colorScheme={"purple"}>
              <Link to={"/"}>Sign Up</Link>
            </Button>
          </Text>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credential = credentialResponse?.credential;
              if (credential) {
                const decoded = jwtDecode(credential);
                sessionStorage.setItem("userData", JSON.stringify(decoded));
                setIsAuthenticated(true);
                navigate("/home");
                toast.success("Logged in successfully");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </VStack>
      </form>
    </Container>
  );
};

export default Login;
