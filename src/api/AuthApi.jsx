import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import axios from "./axios"; // Adjust the import path as necessary
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

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
    const response = await axios.post(`/api/v1/auth/sign-in`, credentials, {
      withCredentials: true,
    });
    return response.data;
  };

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
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

  return { login, isLoggingIn };
};

export const useVerification = () => {
  const verificationRequest = async (credentials) => {
    const response = await axios.post(`/api/v1/auth/verify-user`, credentials, {
      withCredentials: true,
    });
    return response.data;
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
    const response = await axios.post(
      `/api/v1/auth/reset-password`,
      credentials
    );
    return response.data;
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
    const response = await axios.put(
      `/api/v1/auth/update-password`,
      userFormData
    );
    return response.data;
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
    const response = await axios.post(`/api/v1/auth/resend-otp`, phoneNumber);
    return response.data;
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
      `/api/v1/auth/logout`,
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

// Example of using Axios with useQuery
export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/branch/`);
    return response.data;
  };

  const { data: branches, isLoading: isLoadingBranches } = useQuery(
    "branches",
    getBranchesRequest
  );

  return { branches, isLoadingBranches };
};

// Add additional hooks as needed...
