import React, { useState } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSpring, animated, SpringValue, to } from "react-spring";
import Counter from "./Counter";
import UserDataForm from "./UserData";
import RichTextEditor from "./RichTextEditor";
import DashBoard from "./DashBoard";
import { UserContext } from "../App";
import { useContext } from "react";

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const { user } = useContext(UserContext);

  const userName = user?.given_name?.split(" ")[0] || user?.name?.split(" ")[0];

  const { height } = useSpring({
    from: { height: "0%" },
    to: { height: `${count * 1}%` },
  });

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px",
    background: useColorModeValue("#FFFFFF", "#171923"), // Decent background color
  };

  return (
    <Center>
      <Box p={4} w={"100%"} style={containerStyle}>
        <Heading mb={10} textAlign="center" style={{ zIndex: 1 }}>
          Welcome {userName}
        </Heading>
        <AnimatedBar height={height} />
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <Box boxShadow="md" rounded="md" zIndex={10}>
            <Heading size="md" textAlign="center" mb={4} style={{ zIndex: 1 }}>
              Counter
            </Heading>
            <Counter
              count={count}
              increment={increment}
              decrement={decrement}
              reset={reset}
            />
          </Box>
          <Box boxShadow="md" rounded="md" zIndex={10}>
            <Heading size="md" textAlign="center" mb={4} style={{ zIndex: 1 }}>
              User Data Form
            </Heading>
            <UserDataForm />
          </Box>
          <Box boxShadow="md" rounded="md" zIndex={10}>
            <Heading size="md" textAlign="center" mb={4}>
              Rich Text Editor
            </Heading>
            <RichTextEditor />
          </Box>
          <Box boxShadow="md" rounded="md" zIndex={10}>
            <Heading size="md" textAlign="center" mb={4}>
              DashBoard
            </Heading>
            <DashBoard />
          </Box>
        </Grid>
      </Box>
    </Center>
  );
};

const AnimatedBar: React.FC<{ height: SpringValue<number> }> = ({ height }) => {
  const animatedBarStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height,
    background: useColorModeValue(
      "linear-gradient(45deg, #7f7fd5 0%, #86a8e7 100%)",
      "linear-gradient(45deg, #171923 0%, #1a202c 100%)"
    ),
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    zIndex: 0,
  };

  return <animated.div style={animatedBarStyle}></animated.div>;
};

export default Home;
