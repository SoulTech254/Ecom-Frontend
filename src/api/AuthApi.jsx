import { useMutation } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Custom hook for handling user login functionality.
 *
 * @return {Object} An object containing login function, loading status, and potential error
 */
export const useLogin = () => {
  const loginRequest = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  const {
    mutateAsync: login,
    isLoading: isLogginIn,
  } = useMutation(loginRequest, {
    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLogginIn };
};

/**
 * Make a request to the server to verify the phone number
 *
 * @param {phoneNumber, password} credentials - The credentials to be used for verification
 * @return {Object} An object containing the verification result, loading status, and any verification error
 */
export const useVerification = () => {
  const verificationRequest = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };
  const { mutateAsync: verifyPhoneNumber, isLoading: isVerifying } =
    useMutation(verificationRequest, {
      onSuccess: () => {
        toast.success("Verification Successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return { verifyPhoneNumber, isVerifying };
};
