import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FilePenLine } from "lucide-react";
import walmartLogo from "../assets/images/walmart.jpg";
import { X } from "lucide-react";

const OTPVerificationForm = ({
  onSave,
  isLoading,
  name,
  onButtonClick,
  onXButtonClick,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="h-fit w-screen md:max-w-[500px] p-4 md:p-12 md:border rounded-xl">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onXButtonClick}>
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <img src={walmartLogo} alt="" className="w-fit h-fit " />
        <h1 className="text-3xl">Verify Your Account</h1>
        <p>Hi {name}</p>
        <div className="flex gap-2">
          <p>Check your phone we have sent your OTP</p>{" "}
          <button className="cursor-pointer" onClick={onButtonClick}>
            <FilePenLine color="#194A34" />
          </button>
        </div>
        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSave)}
        >
          <input
            // {...register("otp")}
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className={`w-full border-b pb-5 focus:outline-none "border-[#194A3491] }`}
          />
          {/* {errors.otp && <p className="text-[#E71926]">{errors.otp.message}</p>} */}

          {/* TODO: Add a Timer to  prevent the user from resubmitting before 30 seconds are over */}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#194A34] text-white p-3 w-full rounded-3xl cursor-pointer transition-colors duration-200 hover:bg-[#1F4F38]"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
          <div className="flex items-center">
            <div className="flex-1 mr-5 border-t border-[#1E4E38]"></div>
            <div className="text-[#1E4E38]">Didn't receive OTP?</div>
            <div className="flex-1 ml-5 border-t border-[#1E4E38]"></div>
          </div>
          <div className="flex justify-center">
            <div className="cursor-pointer border-[1px] text-center p-2 text-[#194A34] border-[#194A34] transition duration-300 ease-in-out transform hover:scale-105 hover:border-[#194A45]">
              Resend OTP
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
