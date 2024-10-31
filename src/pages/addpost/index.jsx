import { Navigate } from "react-router-dom";
import { useUser } from "../utils/zustand";
import { useForm } from "react-hook-form";
import { api } from "../utils/axios";
import { Button, Input } from "@material-tailwind/react";

export default function AddPost() {
  const { user, setUser } = useUser();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const postData = { ...data, userId: user._id };
    api.post("/posts", postData);
    console.log(postData);
  };

  if (!user?.name) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <h1 className="m-5">Create post page</h1>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 m-5"
      >
        <Input label="Title" {...register("title")} />
        <Input label="Body" {...register("body")} />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
