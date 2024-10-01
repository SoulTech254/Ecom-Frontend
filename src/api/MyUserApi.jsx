import { useMutation } from "react-query";
import { toast } from "sonner";
import axios from "./axios"; // Adjust the import path as necessary

export const useCreateMyUser = () => {
  const createMyUserRequest = async (userFormData) => {
    try {
      const response = await axios.post("/api/v1/auth/sign-up", userFormData);
      return response.data; // Directly return the data
    } catch (error) {
      // Rethrow the error with the relevant information
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
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
      toast.error(error.message);
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
      throw new Error(error.message);
    }
  };

  const { mutateAsync: updateUser, isLoading: isUpdatingLoading } = useMutation(
    updateUserRequest,
    {
      onSuccess: () => {
        toast.success("Update Successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { updateUser, isUpdatingLoading };
};
