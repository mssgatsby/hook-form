import { useForm } from "react-hook-form";
import { api } from "../utils/axios";
import { Button, Input } from "@material-tailwind/react";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    api.post("/users", data);
    console.log(data);
  };

  return (
    <>
      <h1 className="m-5">Registration page</h1>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 m-5"
      >
        <Input label="Name" {...register("name")} />
        <Input label="Username" {...register("username")} />
        <Input label="Password" {...register("password")} />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
