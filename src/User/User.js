import React, { useState, useEffect, useContext } from "react";
import Card from "../shared/components/UIElements/Card";
import Avatar from "../shared/components/UIElements/Avatar";
import { decodeToken } from "react-jwt";

import "./User.css";
import { UserContext } from "../shared/context/user-context";
const User = () => {
  const user = useContext(UserContext);
  const [profile, setProfile] = useState("");
  const [full_name, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const id = decodedToken.user_id;
  // console.log(decodedToken);
  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(
        `https://api-dev.treeved.com/v1/users/user/${id}/min-details/
      `,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = await response.json();
      // console.log(responseData);
      setFullname(responseData.full_name);
      setProfile(responseData.profile_picture);
      setUsername(responseData.username);
      user.full_name = responseData.full_name;
      user.profile = responseData.profile_picture;
      user.username = responseData.username;
    };
    getDetails();
  }, [id, token, user]);

  //   const [user] = props;
  return (
    <Card>
      {/* {console.log(props.user)} */}
      <div className="user-image">
        <Avatar image={profile} alt={full_name} />
      </div>
      <div>
        <h3>{full_name}</h3>
        <p>{username}</p>
      </div>
    </Card>
  );
};

export default User;
