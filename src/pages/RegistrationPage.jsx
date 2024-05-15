import RegisterForm from "@/forms/register-form";
import React from "react";
import { useCreateMyUser } from "@/api/MyUserApi";

/**
 * Handles saving user data by refining its date and calling the createUser function.
 *
 * @param {Object} userData - The user data to be saved
 * @return {Promise<void>} A promise representing the completion of the save operation
 */
const RegistrationPage = () => {
  const { createUser, isLoading } = useCreateMyUser();
  const handleSave = async (userData) => {
    const { date, month, year, ...restUserData } = userData;

    const dobDate = new Date(year, month - 1, date);

    const refinedUserData = {
      ...restUserData,
      DOB: dobDate,
    };

    console.log("Refined User data:", refinedUserData);
    console.log("isLoading:", isLoading);

    await createUser(refinedUserData);
  };
  return (
    <div className="h-full w-full flex align-center justify-center p-1 md:p-20">
      <RegisterForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default RegistrationPage;
