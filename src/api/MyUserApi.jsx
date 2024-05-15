import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);
export const useCreateMyUser = () => {
  const createMyUserRequest = async (userFormData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });
    if (response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createMyUserRequest);
  return { createUser, isLoading, isSuccess };
};
