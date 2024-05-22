import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import walmartLogo from "../../assets/images/quickmart.png";
import { X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/Loader";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{9}$/, "Please enter a valid phone number."),
});
const ConfirmNumberForm = ({ onSave, isLoading, onButtonClick }) => {
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
        <img src={walmartLogo} alt="" className="w-fit h-fit" />
        <h1 className="text-3xl">Forgot Password</h1>
        <p>Enter your phone number to reset your password</p>

        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSave)}
        >
          <div className="flex">
            <span
              className={`w-[80px] mr-2 border-b outline-none focus:outline-none "border-[#194A3491]"
              }`}
            >
              +254
            </span>
            <input
              {...register("phoneNumber")}
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              className={`w-full border-b pb-5 outline-none focus:outline-none  "border-[#194A3491]"
              }`}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`bg-[#194A34] flex justify-center items-center text-white p-3 w-full rounded-3xl transition-colors duration-200 hover:bg-[#1F4F38] ${
              isLoading ? "opacity-60 cursor-default" : "cursor-pointer "
            }`}
          >
            {isLoading ? <Loader /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmNumberForm;
