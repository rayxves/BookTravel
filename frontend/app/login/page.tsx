"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { loginRequest } from "../../api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/authContext";

interface FormData {
  name: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
});

export default function Login() {
  const { authLogin } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginRequest(data);

      authLogin(response.UserName, response.token);
      setLoginResponse("Login successful");

      await new Promise<void>(() => {
        setTimeout(() => {
          router.push("/");
        }, 4000);
      });
    } catch (err: any) {
      setLoginResponse(err.message);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" flex flex-col items-center justify-center h-full w-full bg-[linear-gradient(217deg,_rgba(246,246,246,1)_2%,_rgba(178,178,178,1)_13%,_rgba(209,207,207,1)_22%,_rgba(154,150,150,1)_56%,_rgba(213,214,222,1)_74%,_rgba(244,244,244,1)_100%)]">
      {" "}
      <h1 className="bg-[var(--hunter-green)] w-9/12  sm:w-6/12  md:w-3/6 lg:w-2/6 xl:w-3/12 text-center py-3 border-b-4 border-b-[var(--olivine)] font-poppins text-xl text-white font-semibold leading-relaxed flex items-center justify-center gap-2 ">
        Login
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </h1>
      <form
        className="flex items-center justify-center h-fit w-9/12 sm:w-6/12  md:w-3/6 lg:w-2/6 xl:w-3/12 bg-gray-300 p-12 sm:p-10 shadow-[0px_10px_10px_0px_rgba(0,0,0,0.05)] shadow-[rgba(0,0,0,0.25)]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full h-fit flex flex-col gap-2 items-start justify-center">
          {" "}
          <label className="text-black font-inter" htmlFor="name">
            Name:
          </label>
          <input
            className="bg-[var(--lavender-blush)] text-sm p-2 px-2 font-inter rounded placeholder:text-gray-500 placeholder:outline-0 placeholder:text-xs w-full focus:outline-0"
            placeholder="Enter your name"
            {...register("name")}
          />
          <p className="font-poppins text-red-800 text-xs pb-1 font-semibold">
            {errors.name?.message}
          </p>
          <label className="text-black font-inter" htmlFor="password">
            Password:
          </label>
          <div className="relative w-full">
            <input
              className="bg-[var(--lavender-blush)] text-sm p-2 pr-10 rounded font-inter placeholder:text-gray-500 placeholder:text-xs w-full focus:outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded cursor-pointer"
              onClick={toggleShowPassword}
            >
              <svg
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </div>
          <p className="font-poppins text-red-800 text-xs pb-1 font-semibold">
            {errors.password?.message}
          </p>
          <div className="w-full flex flex-col items-center justify-center pt-3 gap-3">
            <button
              className="bg-[var(--sapphire)] w-2/6 h-fit py-1.5 text-white rounded ring-2 ring-blue-500/40 cursor-pointer hover:bg-blue-800 transition-all"
              type="submit"
            >
              Enviar
            </button>
            <p className="font-inter text-xs px-1 text-center">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="text-[var(--hunter-green)] font-semibold"
              >
                Register
              </Link>
            </p>
            <p
              className={
                loginResponse !== ""
                  ? loginResponse === "Login successful"
                    ? "font-inter text-sm text-[var(--hunter-green)] font-semibold"
                    : "font-inter text-sm text-red-600 font-semibold"
                  : "hidden"
              }
            >
              {loginResponse}
            </p>
          </div>
        </div>
      </form>{" "}
    </div>
  );
}
