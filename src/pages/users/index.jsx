import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function UsersPage() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <Card key={index} className="max-w-[24rem] overflow-hidden m-5 p-5">
          <Typography variant="h4" color="blue-gray">
            User number {index + 1}
          </Typography>{" "}
          <br />
          <h1>
            Name: <span className="text-blue-500">{user.name}</span>
          </h1>
          <p>
            Username: <span className="text-blue-500">{user.username}</span>
          </p>
          <p>
            Password: <span className="text-blue-500">{user.password}</span>
          </p>{" "}
          <br />
          <Link to={`/userposts/${user?._id}`}>
            <Button type="button">User Posts</Button>
          </Link>
        </Card>
      ))}
    </>
  );
}
