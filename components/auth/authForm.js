"use client";
import { showErrorToast, showSuccessToast } from "@/utils/toast/toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/loader";
import { useState } from "react";

export default function Authform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    const { username, password } = data;

    setIsAuthenticating(true);

    try {
      const response = await fetch("https://api.surecarebenefits.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (res.token) {
        showSuccessToast("Login Successful");
        localStorage.setItem("token", res.token);
        router.push("/homecards");
      } else {
        showErrorToast(`Login Failed: ${res.error}`);
      }
    } catch (error) {
      showErrorToast("Invalid User");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <>
      {isAuthenticating ? <Loader /> : ""}

      <div className="flex h-screen flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <Image
              className="mx-auto h-10 w-auto"
              src="/new-logo.png"
              alt="Sure Care Benifits Admin"
              width={150}
              height={60}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative space-y-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email" className="sr-only">
                  Email / Username
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("username", {
                    required: "Please provide a Email.",
                  })}
                  className="relative block w-full rounded-t-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    * {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Please provide a password.",
                  })}
                  className="relative block w-full rounded-b-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    * {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
