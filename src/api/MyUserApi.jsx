import { useMutation } from "react-query";
import { toast } from "sonner";
import axios from "./axios"; // Adjust the import path as necessary

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Invalid input. Please check your data.";
      case 404:
        return "User not found.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useCreateMyUser = () => {
  const createMyUserRequest = async (userFormData) => {
    try {
      const response = await axios.post("/api/v1/auth/sign-up", userFormData);
      return response.data; // Directly return the data
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createMyUserRequest, {
    onSuccess: () => {
      toast.success("User Created Successfully");
    },
    onError: (error) => {
      toast.error(handleError(error));
    },
  });

  return { createUser, isLoading, isSuccess };
};

export const useUpdateUser = () => {
  const updateUserRequest = async (userFormData) => {
    try {
      const response = await axios.put("/api/v1/user/update", userFormData);
      return response.data; // Directly return the data
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { mutateAsync: updateUser, isLoading: isUpdatingLoading } = useMutation(
    updateUserRequest,
    {
      onSuccess: () => {
        toast.success("Update Successful");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { updateUser, isUpdatingLoading };
};
