import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import axios from "./axios"; // Adjust the import path as necessary
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const useLogin = () => {
  const loginRequest = async (credentials) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/sign-in",
        credentials
      );
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

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
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

  return { login, isLoggingIn };
};

export const useVerifyRegisteredUser = () => {
  const verificationRequest = async (credentials) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/verify-registered",
        credentials
      );
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

  const { mutateAsync: verifyRegisteredEmail, isLoading: isVerifying } =
    useMutation(verificationRequest, {
      onSuccess: () => {
        toast.success("Verification Successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { verifyRegisteredEmail, isVerifying };
};
export const useVerification = () => {
  const verificationRequest = async (credentials) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/verify-user",
        credentials,
        { withCredentials: true }
      );
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

  const { mutateAsync: verifyEmail, isLoading: isVerifying } = useMutation(
    verificationRequest,
    {
      onSuccess: () => {
        toast.success("Verification Successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { verifyEmail, isVerifying };
};

export const useCheckEmail = () => {
  const verificationRequest = async (credentials) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/reset-password",
        credentials
      );
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

  const { mutateAsync: checkEmail, isLoading: isChecking } = useMutation(
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

  return { checkEmail, isChecking };
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
        toast.error(error.message);
      },
    });

  return { updatePassword, isUpdatingPassword };
};

export const useResendOtp = () => {
  const resendOtpRequest = async (phoneNumber) => {
    try {
      const response = await axios.post("/api/v1/auth/resend-otp", phoneNumber);
      return response.data; // Directly return the data
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const { mutateAsync: resendOtp, isLoading: isResendingOtp } = useMutation(
    resendOtpRequest,
    {
      onSuccess: () => {
        toast.success("OTP resent successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { resendOtp, isResendingOtp };
};

export const useLogOut = () => {
  const axiosPrivate = useAxiosPrivate();
  const logoutRequest = async () => {
    console.log("Logging out...");
    const response = await axiosPrivate.post(
      `/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("Logout response:", response.data);
    return response.data;
  };

  const { mutateAsync: logOut, isLoading: isLoggingOut } = useMutation(
    logoutRequest,
    {
      onSuccess: () => {
        console.log("Logout successful");
        toast.success("Logout Successful");
      },
      onError: (error) => {
        console.log("Logout error:", error);
        toast.error(error.message);
      },
    }
  );

  return { logOut, isLoggingOut };
};

// Example of using Axios with useQuery
export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    const response = await axios.get(`/api/v1/branch/`);
    return response.data;
  };

  const { data: branches, isLoading: isLoadingBranches } = useQuery(
    "branches",
    getBranchesRequest
  );

  return { branches, isLoadingBranches };
};

// Add additional hooks as needed...
