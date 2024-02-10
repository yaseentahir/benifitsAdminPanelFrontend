"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/utils/service/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    async function isActiveSession() {
      const res = await API.getSession();

      if (res.error) {
        router.push("/");
      }
    }
    isActiveSession();
  });

  return (
    <>
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Protection Form
          </h1>
        </div>
      </div>
      {children}
      <ToastContainer />
    </>
  );
}
