import { useMutation } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useLogin = () => {
  const loginRequest = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return response.json();
  };

  const {
    mutateAsync: login,
    isLoading,
    error,
  } = useMutation(loginRequest, {
    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
};
