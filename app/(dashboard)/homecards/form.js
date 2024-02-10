"use client";

import { useBenefitsAdminPanelCtx } from "@/app/context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function Form() {
  const {
    unregister,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { defaultValues } = useBenefitsAdminPanelCtx();

  useEffect(() => {
    if (Object.keys(defaultValues).length == 0) {
      return;
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

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="col-span-full">
        <label
          htmlFor="cardTitle"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Card Title
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            {...register("cardTitle", {
              required: "Please enter your Card Title.",
            })}
            type="text"
            id="cardTitle"
            name="cardTitle"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.cardTitle && (
            <p className="text-red-500 text-xs">* {errors.cardTitle.message}</p>
          )}
        </div>
        <label
          htmlFor="icon"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Icon
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            {...register(
              "icon"
              // , {
              //   required: "Please upload your Card Icon.",
              // }
            )}
            type="file"
            multiple
            id="icon"
            name="icon"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.icon && (
            <p className="text-red-500 text-xs">* {errors.icon.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
