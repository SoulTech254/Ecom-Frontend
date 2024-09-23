import { useMutation } from "react-query";
import { toast } from "sonner";
import axios from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Please check your input and try again.";
      case 401:
        return "Session has Expired. Please Login Again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useLogin = () => {
  const loginRequest = async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/sign-in`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  };

  const { mutateAsync: login, isLoading: isLogginIn } = useMutation(
    loginRequest,
    {
      onSuccess: () => {
        toast.success("Login Successful");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { login, isLogginIn };
};

export const useVerification = () => {
  const verificationRequest = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const data = await response.json();
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
        toast.error(handleError(error));
      },
    });

  return { verifyPhoneNumber, isVerifying };
};

export const useCheckPhoneNumber = () => {
  const verificationRequest = async (credentials) => {
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
        toast.error(handleError(error));
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { mutateAsync: updatePassword, isLoading: isUpdatingPassword } =
    useMutation(updatePasswordRequest, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { updatePassword, isUpdatingPassword };
};

export const useResendOtp = () => {
  const resendOtpRequest = async (phoneNumber) => {
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
        toast.success("OTP resent successfully!");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { resendOtp, isResendingOtp };
};

export const useLogOut = () => {
  const axiosPrivate = useAxiosPrivate();
  const logoutRequest = async () => {
    const response = await axiosPrivate.post(
      `${API_BASE_URL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const { mutateAsync: logOut, isLoading: isLoggingOut } = useMutation(
    logoutRequest,
    {
      onSuccess: () => {
        toast.success("Logout Successful");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { logOut, isLoggingOut };
};
