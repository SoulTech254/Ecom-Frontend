import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);
export const useCreateMyUser = () => {
  const createMyUserRequest = async (userFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createMyUserRequest, {
    onSuccess: () => {
      toast.success("User Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createUser, isLoading, isSuccess };
};

export const useUpdateUser = () => {
  const updateUserRequest = async (userFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };
  const { mutateAsync: updateUser, isLoading: isUpdatingLoading } = useMutation(
    updateUserRequest,
    {
      onSuccess: () => {
        toast.success("Update successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  return { updateUser, isUpdatingLoading };
};
