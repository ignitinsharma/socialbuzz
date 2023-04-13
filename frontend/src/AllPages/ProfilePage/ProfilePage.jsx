import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [singlePosts, setsinglePosts] = useState([]);
  const userId = useParams();
  const paramsId = userId.id;
  console.log("paramsId", paramsId);

  const handleFetchSinglePosts = () => {
    axios
      .get(`http://localhost:8080/posts/profile`, { paramsId })
      .then((res) => {
        setsinglePosts(res);
      });
  };

  console.log(singlePosts, "singlePosts");
  useEffect(() => {
    handleFetchSinglePosts();
  }, []);

  return <div>hyyy</div>;
};

export default ProfilePage;
