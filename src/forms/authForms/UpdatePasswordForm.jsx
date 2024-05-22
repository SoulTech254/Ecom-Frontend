import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Loader from "@/components/Loader";
import { z } from "zod";
import walmartLogo from "../../assets/images/quickmart.png";

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .refine((val) => {
      const hasUpper = /[A-Z]/.test(val);
      const hasLower = /[a-z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      return hasUpper && hasLower && hasNumber;
    }, "Password must have at least one uppercase letter, one lowercase letter, and one number."),
});
const UpdatePasswordForm = ({ onSave, isLoading, onButtonClick }) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="h-fit w-screen md:max-w-[500px] p-4 md:p-12 md:border rounded-xl bg-white">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onButtonClick}>
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <img src={walmartLogo} alt="" className="w-fit h-fit " />
        <h1 className="text-3xl">Update Password</h1>
        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSave)}
        >
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full border-b pb-5 outline-none focus:outline-none border-[#194A3491]"
          />
          <button
            disabled={isLoading}
            type="submit"
            className={`bg-[#194A34] flex justify-center items-center text-white p-3 w-full rounded-3xl transition-colors duration-200 hover:bg-[#1F4F38] ${
              isLoading ? "opacity-60 cursor-default" : "cursor-pointer "
            }`}
          >
            {isLoading ? <Loader /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
