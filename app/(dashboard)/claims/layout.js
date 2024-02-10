"use client";

import { Button, Modal } from "@/components";
import { useEffect, useRef } from "react";
import Form from "./form";
import { useRouter } from "next/navigation";
import { API } from "@/utils/service/api";
import { useBenefitsAdminPanelCtx } from "@/app/context";
import { payloadHelper } from "@/utils/helpers/payloadHelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _defaultValues = {
  companyCardId: "",
  edi: "",
  email: "",
  address: "",
};

export default function Layout({ children }) {
  const modalRef = useRef(null);
  const router = useRouter();

  const { setModalRef, setDefaultValues, updateId, setUpdateId } =
    useBenefitsAdminPanelCtx();

  const setFormDefaultState = () => {
    setDefaultValues(_defaultValues);
  };

  useEffect(() => {
    async function isActiveSession() {
      const res = await API.getSession();

      if (res.error) {
        router.push("/");
      }
    }
    isActiveSession();
  });

  useEffect(() => {
    setModalRef(modalRef);
    setFormDefaultState();
    return () => {
      setUpdateId("");
      setModalRef(null);
      setDefaultValues({});
    };
  }, []);

  const handleAddClaim = () => {
    if (modalRef.current) {
      setFormDefaultState();
      modalRef.current.setOpenModal(true);
    }
  };

  const handleSubmittedForm = async (data) => {
    data = payloadHelper(_defaultValues, data);

    if (updateId !== "") {
      const res = await API.putData("claims", updateId, data);
    } else {
      const { id, ...paylaod } = data;
      const res = await API.postData("claims", paylaod);
    }
    setFormDefaultState();
    setUpdateId("");
    router.refresh();
  };

  const props = {
    title: "Add Cliam's Information",
    children: <Form />,
    handler: handleSubmittedForm,
  };

  return (
    <>
      <Modal ref={modalRef} {...props} />

      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Claims
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            type={"button"}
            title={"Add Claim"}
            handler={handleAddClaim}
          />
        </div>
      </div>
      {children}
      <ToastContainer />
    </>
  );
}
