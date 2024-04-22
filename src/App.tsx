import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { ProtectedRoute } from "protected-route-react";
import toast, { Toaster } from "react-hot-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  given_name?: string; // Make it optional if needed
}

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  logoutHandler: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
  logoutHandler: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const logoutHandler = () => {
    sessionStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <UserContext.Provider
        value={{
          user,
          setUser,
          logoutHandler,
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/home"
              >
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/home"
              >
                <Login />
              </ProtectedRoute>
            }
          />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
        <Footer />
        <Toaster />
      </UserContext.Provider>
    </Router>
  );
}

export default App;