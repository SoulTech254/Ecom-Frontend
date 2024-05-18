import RegisterForm from "@/forms/register-form";
import React, { useState } from "react";
import { useCreateMyUser, useUpdateUser } from "@/api/MyUserApi";
import OTPVerificationForm from "@/forms/otpVerification-form";
import ChangeNumberForm from "@/forms/changeNumber-form";
import { useVerification } from "@/api/AuthApi";
import QuickmartCart from "../assets/images/BG.jpg";
import { toast } from "sonner";

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

  //State
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showUpdateNumberForm, setShowUpdateNumberForm] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const styles = {
    container: {
      // Default styles for all screen sizes
    },
    // Define styles for large screens using a media query
    "@media (min-width: 768px)": {
      container: {
        backgroundImage: `url(${QuickmartCart})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  };

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

  const handleVerifySave = async (otp) => {
    const verifyData = {
      phoneNumber,
      otp,
    };
    try {
      await verifyPhoneNumber(verifyData);
      setShowVerificationForm(false);
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
