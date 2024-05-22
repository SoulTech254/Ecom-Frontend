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
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { mutateAsync: login, isLoading: isLogginIn } = useMutation(
    loginRequest,
    {
      onSuccess: () => {
        toast.success("Login Successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

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
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
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

export const useCheckPhoneNumber = () => {
  const verificationRequest = async (credentials) => {
    console.log(credentials);
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const { mutateAsync: checkNumber, isLoading: isChecking } = useMutation(
    verificationRequest,
    {
      onSuccess: () => {
        toast.success("OTP Sent");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  return { checkNumber, isChecking };
};

export const useUpdatePassword = () => {
  const updatePasswordRequest = async (userFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/update-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      }
    );
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const { mutateAsync: updatePassword, isLoading: isUpdatingPassword } =
    useMutation(updatePasswordRequest, {
      onSuccess: () => {
        toast.success("Update successfull");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return { updatePassword, isUpdatingPassword };
};

export const useResendOtp = () => {
  const resendOtpRequest = async (phoneNumber) => {
    console.log(phoneNumber);
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phoneNumber),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const { mutateAsync: resendOtp, isLoading: isResendingOtp } = useMutation(
    resendOtpRequest,
    {
      onSuccess: () => {
        toast.success("OTP resent");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  return { resendOtp };
};
