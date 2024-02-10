"use client";

import { useBenefitsAdminPanelCtx } from "@/app/context";
import { API } from "@/utils/service/api";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Form() {
  const [options, setOptions] = useState([]);

  const {
    register,
    unregister,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const { defaultValues } = useBenefitsAdminPanelCtx();

  useEffect(() => {
    if (Object.keys(defaultValues).length == 0) {
    } else {
      for (let key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    }

    return () => {
      const values = getValues();

      for (let key in values) {
        unregister(key);
      }
    };
  }, []);

  useEffect(() => {
    async function getOptions() {
      const res = await API.getData("links");
      setOptions(res.data);
    }
    getOptions();
  }, []);

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label
          htmlFor="groupId"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Group ID
        </label>
        <div className="mt-1">
          <input
            {...register("groupId", {
              required: "Please enter your Group ID.",
            })}
            type="text"
            name="groupId"
            id="groupId"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.groupId && (
          <p className="text-red-500 text-xs">* {errors.groupId.message}</p>
        )}
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="price1"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Price One
        </label>
        <div className="mt-1">
          <input
            {...register("price1", {
              required: "Please enter your Price.",
            })}
            type="text"
            name="price1"
            id="price1"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.price1 && (
          <p className="text-red-500 text-xs">* {errors.price1.message}</p>
        )}
      </div>

      <div className="col-span-full">
        <label
          htmlFor="price2"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price Two
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            {...register("price2", {
              required: "Please enter your Price.",
            })}
            type="text"
            id="price2"
            name="price2"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.price2 && (
          <p className="text-red-500 text-xs">* {errors.price2.message}</p>
        )}
      </div>
      <div className="col-span-full">
        <label
          htmlFor="price3"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price Three
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            {...register("price3", {
              required: "Please enter your Price.",
            })}
            type="text"
            id="price3"
            name="price3"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.price3 && (
          <p className="text-red-500 text-xs">* {errors.price3.message}</p>
        )}
      </div>
    </div>
  );
}
