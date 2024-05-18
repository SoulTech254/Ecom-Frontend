import { useLogin } from "@/api/AuthApi";
import LoginForm from "@/forms/login-form";

/**
 * Functional component for the Login Page.
 *
 * @return {JSX.Element} The JSX for the Login Page.
 */
const LoginPage = () => {
  const { login, isLogginIn } = useLogin();
  return (
    <div
      className={`h-screen w-full flex items-center justify-center md:bg-white md:p-20 bg-cover bg-center lg:bg-gradient-to-b lg:from-white lg:to-gray-300`}
    >
      <LoginForm onSave={login} isLoading={isLogginIn} />
    </div>
  );
};

export default LoginPage;
