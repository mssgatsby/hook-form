import { Typography, Card, Button } from "@material-tailwind/react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import UsersPage from "./pages/users";
import { useUser } from "./pages/utils/zustand";
import AddPost from "./pages/addpost";
import ProtectedPost from "./pages/utils/protectedRoute";
import MyPosts from "./pages/myposts";
import UserPosts from "./pages/userposts";

export default function App() {
  const { user, setUser } = useUser();
  const logout = () => setUser({});
  return (
    <>
      <ul className="flex gap-5 m-5 items-center">
        <li>
          <Link to={"/"}>Register</Link>
        </li>
        <li>
          {user?.name ? (
            // <button onClick={logout}>Logout</button>
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </li>
        <li>
          <Link to={"/users"}>Users</Link>
        </li>
        <li>
          <Link to={"/addpost"}>Add Post</Link>
        </li>
        <li>
          <Link to={`/myposts/${user?._id}`}>My Posts</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/addpost"
          element={
            <ProtectedPost>
              <AddPost />
            </ProtectedPost>
          }
        />
        <Route path="/myposts/:id" element={<MyPosts />} />
        <Route path="/userposts/:id" element={<UserPosts />} />
      </Routes>
    </>
  );
}
