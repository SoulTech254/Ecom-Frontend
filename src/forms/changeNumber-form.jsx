import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import walmartLogo from "../assets/images/walmart.jpg";
import { X } from "lucide-react";

const ChangeNumberForm = ({
  onSave,
  isLoading,
  fName,
  lName,
  onButtonClick,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="h-fit w-screen md:max-w-[500px] p-4 md:p-12 md:border rounded-xl">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onButtonClick}>
        <X />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <img src={walmartLogo} alt="" className="w-fit h-fit " />
        <h1 className="text-3xl">Change Phone Number</h1>
        <p>
          Hi {fName} {lName}
        </p>
        <p>Update your phone number</p>{" "}
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
          {/* {errors.phoneNumber && (
            <p className="text-[#E71926]">{errors.phoneNumber.message}</p>
          )} */}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#194A34] text-white p-3 w-full rounded-3xl cursor-pointer transition-colors duration-200 hover:bg-[#1F4F38]"
          >
            {isLoading ? "Updating..." : "Update Number"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeNumberForm;
