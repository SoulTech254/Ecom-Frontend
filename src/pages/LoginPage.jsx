import {
  useCheckPhoneNumber,
  useLogin,
  useResendOtp,
  useUpdatePassword,
  useVerification,
} from "@/api/AuthApi";
import { useUpdateUser } from "@/api/MyUserApi";
import ConfirmNumberForm from "@/forms/authForms/ConfirmNumber";
import LoginForm from "@/forms/authForms/LoginForm";
import OTPVerificationForm from "@/forms/authForms/OtpVerificationForm";
import UpdatePasswordForm from "@/forms/authForms/UpdatePasswordForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "@/redux/user/userSlice";
import { mergeLocalCart } from "@/redux/cart/cartSlice";
import StoreBranchModal from "@/components/StoreSelection";
import { useGetBranches } from "@/api/HomeApi";
import { setBranch } from "@/redux/branch/branchSlice";
import { SelectBranchModal } from "@/components/SelectBranchModal";

const LoginPage = () => {
  const { login, isLogginIn } = useLogin();
  const dispatch = useDispatch();

  // API Hooks
  const { verifyPhoneNumber, isVerifying } = useVerification();
  const { checkNumber, isChecking } = useCheckPhoneNumber();
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();
  const { resendOtp } = useResendOtp();
  const { branches: apiBranches, isLoadingBranches } = useGetBranches();

  // States
  const [resetPassword, setResetPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showStoreBranchModal, setShowStoreBranchModal] = useState(false); // State to control StoreBranchModal visibility
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]); // Local state to store branches

  useEffect(() => {
    // Update local state with API branches once they are loaded
    if (!isLoadingBranches && apiBranches.length > 0) {
      setBranches(apiBranches);
    }
  }, [apiBranches, isLoadingBranches]);

  // OnSave Functions
  const handleResetPasswordSave = async (data) => {
    const { phoneNumber } = data;
    try {
      await checkNumber(data);
      setPhoneNumber(phoneNumber);
      setResetPassword(false);
      setShowVerificationForm(true);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleVerificationSave = async (data) => {
    const { otp } = data;
    const verifyData = {
      phoneNumber,
      otp,
    };
    try {
      await verifyPhoneNumber(verifyData);
      setShowVerificationForm(false);
      setShowUpdateForm(true);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleLoginSave = async (data) => {
    try {
      const response = await login(data);
      console.log(response);
      dispatch(saveUser(response));
      dispatch(mergeLocalCart());
      setShowStoreBranchModal(true); // Show StoreBranchModal after successful login
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  const handleUpdateSave = async (data) => {
    const password = data.password;
    const updateData = {
      phoneNumber,
      password,
    };
    console.log(updateData);
    try {
      await updatePassword(updateData);
      navigate("/");
    } catch (error) {
      console.log("Error");
    }
  };

  const handleBranchSave = (branch) => {
    dispatch(setBranch(branch));
    setShowStoreBranchModal(false);
    navigate("/");
  };

  //modal function
  const handleClose = () => {
    setShowStoreBranchModal(false);
  };
  return (
    <div
      className={`h-screen w-full flex items-center justify-center md:bg-white md:p-20 bg-cover bg-center lg:bg-gradient-to-b lg:from-white lg:to-gray-300`}
    >
      {resetPassword ? (
        <ConfirmNumberForm
          onButtonClick={() => setResetPassword(false)}
          isLoading={isChecking}
          onSave={handleResetPasswordSave}
        />
      ) : showVerificationForm ? (
        <OTPVerificationForm
          onSave={handleVerificationSave}
          isLoading={isVerifying}
          onXButtonClick={() => setShowVerificationForm(false)}
          onButtonClick={null}
          onResendOtpClick={() => resendOtp({ phoneNumber })}
        />
      ) : showUpdateForm ? (
        <UpdatePasswordForm
          onSave={handleUpdateSave}
          isLoading={isUpdatingPassword}
          onButtonClick={() => setShowUpdateForm(false)}
        />
      ) : (
        <LoginForm
          onSave={handleLoginSave}
          isLoading={isLogginIn}
          onButtonClick={() => setResetPassword(true)}
        />
      )}
      {showStoreBranchModal && <SelectBranchModal onSave={handleBranchSave} />}
    </div>
  );
};

export default LoginPage;
