import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../utils/zustand";
import { Card, Typography } from "@material-tailwind/react";

export default function MyPosts() {
  let [posts, setPosts] = useState([]);
  const { user, setUser } = useUser();
  const { id } = useParams();

  // id = user?._id;

  useEffect(() => {
    if (user?._id) {
      api.get(`/posts`).then((res) => {
        const userPosts = res.data.filter((post) => post.userId == user._id);
        setPosts(userPosts);
      });
    }
  }, [user]);

  if (!user?.name) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <h1 className="m-5">My Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="m-5 p-5">
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{post.body}</Typography>
          </Card>
        ))
      ) : (
        <Typography className="m-5">No posts found.</Typography>
      )}
    </>
  );
}
