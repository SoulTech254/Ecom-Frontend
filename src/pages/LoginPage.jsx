import { useLogin } from "@/api/AuthApi";
import LoginForm from "@/forms/login-form";

const LoginPage = () => {
  const { login, isLoading } = useLogin();
  return (
    <div className="h-screen w-screen flex align-center justify-center px-2 py-auto md:p-20">
      <LoginForm onSave={login} isLoading={isLoading}/>
    </div>
  );
};

export default LoginPage;
