import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import walmartLogo from "../assets/images/quickmart.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

const LoginForm = ({ onSave, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="bg-white h-fit w-screen md:max-w-[500px] p-4 md:p-12 md:border rounded-xl">
      <div className=" flex flex-col gap-3 ">
        <AspectRatio ratio={16 / 3}>
          <img src={walmartLogo} alt="" className="w-fit h-fit " />
        </AspectRatio>
        <h1 className=" text-3xl">Login to your account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSave)}>
          <input
            {...register("email")}
            type="text"
            name="email"
            placeholder="Enter Email Address"
            className={`w-full border-b pb-5 outline-none focus:outline-none ${
              errors.email ? "border-[#E71926]" : "border-[#194A3491]"
            }`}
          />
          {errors.email && (
            <p className="text-[#E71926]">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full border-b pb-5 outline-none focus:outline-none ${
              errors.password ? "border-[#E71926]" : "border-[#194A3491]"
            }`}
          />
          {errors.password && (
            <p className="text-[#E71926]">{errors.password.message}</p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#194A34] text-white p-3 w-full rounded-3xl cursor-pointer transition-colors duration-200 hover:bg-[#1F4F38]"
          >
            {isLoading ? "Logging in..." : "Continue"}
          </button>
          <div className="flex items-center">
            <div className="flex-1 mr-5 border-t border-[#1E4E38]"></div>
            <div className="text-[#1E4E38]">Don't have an Account?</div>
            <div className="flex-1 ml-5 border-t border-[#1E4E38]"></div>
          </div>
          <Link to={"/sign-up"}>
            <div className="cursor-pointer border-[1px] text-center p-3 text-[#194A34] border-[#194A34] transition duration-300 ease-in-out transform hover:scale-105 hover:border-[#194A45]">
              Register
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
