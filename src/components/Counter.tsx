import React from "react";
import { Box, Button, Center, Code, useColorModeValue } from "@chakra-ui/react";

interface CounterProps {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  increment,
  decrement,
  reset,
}) => {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <div className="counter-content">
      <Center>
        <Code
          p={4}
          borderRadius="8px"
          backgroundColor={bg}
          mb={4}
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
          color={useColorModeValue("black", "white")}
          zIndex={10}
        >
          console.log(Counter: {count})
        </Code>
      </Center>

      <Center>
        <Box mt={10}>
          <Button colorScheme="teal" onClick={increment}>
            Increment
          </Button>
          <Button
            colorScheme="red"
            ml={2}
            onClick={decrement}
            isDisabled={count === 0}
          >
            Decrement
          </Button>
          <Button
            colorScheme="blue"
            ml={2}
            onClick={reset}
            isDisabled={count === 0}
          >
            Reset
          </Button>
        </Box>
      </Center>
    </div>
  );
};

export default Counter;
