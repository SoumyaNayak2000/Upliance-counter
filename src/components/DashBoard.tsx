import React, { useState } from "react";
import { Select, Box, Text } from "@chakra-ui/react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { name, email, phone, address } = user;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      _hover={{ boxShadow: "lg" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text fontSize="xl" fontWeight="semibold">
        {name}
      </Text>
      {isHovered && (
        <Box mt="2">
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Text>Address: {address}</Text>
        </Box>
      )}
    </Box>
  );
};

const DashBoard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  // Retrieve users from local storage
  const storedUsers = localStorage.getItem("userData");
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box>
        <Select
          onChange={handleUserChange}
          value={selectedUser || ""}
          maxW="sm"
          mb="4"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        {selectedUser && (
          <ProfileCard user={users.find((user) => user.id === selectedUser)!} />
        )}
      </Box>
    </Box>
  );
};

export default DashBoard;
