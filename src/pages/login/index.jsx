import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { useUser } from "../utils/zustand";
import { Button, Input } from "@material-tailwind/react";
export default function LoginPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [users, setUsers] = useState([]);

  let { setUser } = useUser();

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    api.get("/users").then((res) => {
      let user = users.find(
        (data) => data.username == username && data.password == password
      );
      if (user) {
        console.log("login");
        setUser(user);
      } else {
        console.log("wrong credentials");
      }
    });
  };

  return (
    <>
      <h1 className="m-5">Login page</h1>
      <form action="" onSubmit={handleLogin} className="flex gap-5 m-5">
        <Input label="Username" onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" onChange={(e) => setPassword(e.target.value)} />

        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
