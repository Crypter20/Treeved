import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./shared/context/auth-context";
import { UserContext } from "./shared/context/user-context";
import Auth from "./User/Auth";
import Home from "./User/Home";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      <UserContext.Provider
        value={{ username: "", full_name: "", profile: "" }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="home" element={<Home />} />
            <Route path="privacy" element="privacy" />
          </Routes>
        </Router>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
