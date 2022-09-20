// /* global chrome */
import React, { useContext, useState } from "react";
import MyPage from "../Page/MyPage";
import User from "./User";
import { AuthContext } from "../shared/context/auth-context";
import AddDATA from "./AddDATA";
import Backdrop from "../shared/components/UIElements/Backdrop";
import NavLinks from "../shared/components/Navigation/NavLinks";
import SideDrawer from "../shared/components/Navigation/SideDrawer";
const Home = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // const openDrawer = () => {
  //   setDrawerIsOpen(true);
  // };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const auth = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.clear();
    auth.logout();
  };
  return (
    <React.Fragment>
      <User />
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <NavLinks />
      </SideDrawer>
      <button onClick={handleLogOut}>Sign Out</button>
      {/* <MyPage /> */}
      <AddDATA />
    </React.Fragment>
    // <>LOVE</>
  );
};

export default Home;
