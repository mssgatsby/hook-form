import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../utils/zustand";
import { Card, Typography, Button } from "@material-tailwind/react";

export default function UserPosts() {
  let [posts, setPosts] = useState([]);
  const { user, setUser } = useUser();
  const { id } = useParams();

  const likedPost = (post) => {
    const newLikedUser = user?.liked ? [...user.liked, post] : [post];
    const newUser = { ...user, liked: newLikedUser };

    api
      .put(`/users/${user._id}`, newUser)
      .then((res) => {
        setUser(newUser);
        console.log(newUser);
      })
      .catch((error) => {
        console.error("Error updating liked posts:", error);
      });
  };

  useEffect(() => {
    if (id) {
      api.get(`/posts`).then((res) => {
        const userPosts = res.data.filter((post) => post.userId == id);
        setPosts(userPosts);
      });
    }
  }, [id]);

  return (
    <>
      <h1 className="m-5">User Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="m-5 p-5">
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{post.body}</Typography>
            <Button type="button" onClick={() => likedPost(post)}>
              Like
            </Button>
          </Card>
        ))
      ) : (
        <Typography className="m-5">No posts found.</Typography>
      )}
    </>
  );
}
