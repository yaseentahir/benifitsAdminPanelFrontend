"use client";

import { Button, Modal } from "@/components";
import Form from "./form";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { API } from "@/utils/service/api";
import { useBenefitsAdminPanelCtx } from "@/app/context";
import { payloadHelper } from "@/utils/helpers/payloadHelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _defaultValues = {
  groupId: "",
  price1: "",
  price2: "",
  price3: "",
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

  useEffect(() => {
    setModalRef(modalRef);

    return () => {
      setModalRef(null);
      setDefaultValues({});
    };
  }, []);

  const handleAddPricing = () => {
    if (modalRef.current) {
      setFormDefaultState();
      modalRef.current.setOpenModal(true);
    }
  };

  const handleSubmittedForm = async (data) => {
    data = payloadHelper(_defaultValues, data);

    if (updateId !== "") {
      const res = await API.putData("groups", updateId, data);
    } else {
      const res = await API.postData("groups", data);
    }

    setFormDefaultState();
    setUpdateId("");

    router.refresh();
  };

  const props = {
    title: "Add Group's Information",
    children: <Form />,
    handler: handleSubmittedForm,
  };

  return (
    <>
      <Modal ref={modalRef} {...props} />

      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Groups
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            type={"button"}
            title={"Add Group"}
            handler={handleAddPricing}
          />
        </div>
      </div>
      {children}
      <ToastContainer />
    </>
  );
}
