import RegisterForm from "@/forms/authForms/RegisterForm";
import React, { useState } from "react";
import { useCreateMyUser, useUpdateUser } from "@/api/MyUserApi";
import OTPVerificationForm from "@/forms/authForms/OtpVerificationForm";
import ChangeNumberForm from "@/forms/authForms/UpdateNumberForm";
import { useResendOtp, useVerification } from "@/api/AuthApi";
import QuickmartCart from "../assets/images/BG.jpg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

/**
 * Handles saving user data by refining its date and calling the createUser function.
 *
 * @param {Object} userData - The user data to be saved
 * @return {Promise<void>} A promise representing the completion of the save operation
 */
const RegistrationPage = () => {
  //API
  const { createUser, isLoading, isSuccess } = useCreateMyUser();
  const { verifyPhoneNumber, isVerifying } = useVerification();
  const { updateUser, isUpdating } = useUpdateUser();
  const { resendOtp } = useResendOtp();

  //State
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showUpdateNumberForm, setShowUpdateNumberForm] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate()

  const handleRegisterSave = async (userData) => {
    const { date, month, year, fName, phoneNumber, ...restUserData } = userData;

    const dobDate = new Date(year, month - 1, date);
    setName(fName);
    setPhoneNumber(phoneNumber);

    const refinedUserData = {
      ...restUserData,
      fName,
      phoneNumber,
      DOB: dobDate,
    };

    console.log("Refined User data:", refinedUserData);
    console.log("isLoading:", isLoading);

    try {
      await createUser(refinedUserData);
      setShowVerificationForm(true);
    } catch (error) {
      console.error("Failed to create User");
    }
  };

  const handleVerifySave = async (data) => {
    const { otp } = data;
    const verifyData = {
      phoneNumber,
      otp,
    };
    try {
      await verifyPhoneNumber(verifyData);
      navigate("/")
    } catch (error) {
      toast.error("Failed to Verify phone Number");
    }
  };

  const handleUpdateSave = async (data) => {
    const updateData = {
      phoneNumber,
      ...data,
    };

    const { formPhoneNumber } = data;
    try {
      await updateUser(updateData);
      setPhoneNumber(formPhoneNumber);
      setShowVerificationForm(true);
    } catch (error) {
      console.log("Error Updating User");
    }
  };

  return (
    <div
      className={`h-full w-full flex items-center justify-center md:bg-white md:p-20 bg-cover bg-center lg:bg-gradient-to-b lg:from-white lg:to-gray-300`}
    >
      {showVerificationForm ? (
        <OTPVerificationForm
          name={name}
          onSave={handleVerifySave}
          isLoading={isVerifying}
          onButtonClick={() => {
            setShowVerificationForm(false);
            setShowUpdateNumberForm(true);
          }}
          onXButtonClick={() => setShowVerificationForm(false)}
          onResendOtpClick={() => resendOtp({ phoneNumber })}
        />
      ) : showUpdateNumberForm ? (
        <ChangeNumberForm
          onSave={handleUpdateSave}
          isLoading={isUpdating}
          onButtonClick={() => {
            setShowVerificationForm(true);
            setShowUpdateNumberForm(false);
          }}
        />
      ) : (
        <RegisterForm onSave={handleRegisterSave} isLoading={isLoading} />
      )}
    </div>
  );
};

export default RegistrationPage;
