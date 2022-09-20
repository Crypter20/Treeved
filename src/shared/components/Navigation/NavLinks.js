import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const handleLogOut = () => {
    localStorage.clear();
    auth.logout();
  };
  return (
    <ul className="nav-links">
      <li>
        <Link to="/privacy" exact>
          privacy
        </Link>
      </li>
      <li>
        <Link to="/auth" onClick={handleLogOut}>
          Sign out
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
