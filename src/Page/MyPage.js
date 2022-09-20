import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import PageList from "./PageList";

const MyPage = () => {
  const auth = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [myPage, setMyPage] = useState("");
  useEffect(() => {
    const getMyPage = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api-dev.treeved.com/v1/page/mypages/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setCount(responseData.count);
      setMyPage(responseData);
      // console.log(responseData);
    };
    getMyPage();
  }, []);

  if (count === 0) {
    return null;
  }
  return <PageList data={myPage} />;
};

export default MyPage;
