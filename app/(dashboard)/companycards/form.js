"use client";

import { useBenefitsAdminPanelCtx } from "@/app/context";
import { API } from "@/utils/service/api";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Form() {
  const [options, setOptions] = useState([]);

  const {
    register,
    setValue,
    getValues,
    watch,
    unregister,
    formState: { errors },
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
      const res = await API.getData("links/internal");
      setOptions(res.data);
    }
    getOptions();
  }, []);

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label
          htmlFor="company"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Company
        </label>
        <div className="mt-1">
          <select
            {...register("companyCardId", {
              required: "Please select a company.",
            })}
            id="companyCardId"
            name="companyCardId"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {options.length === 0 ? (
              <option disabled>No Company Found</option>
            ) : (
              options.map((op, index) => (
                <option key={index} value={op.id}>
                  {op.linkName}
                </option>
              ))
            )}
          </select>
        </div>
        {errors.companyCardId && (
          <p className="text-red-500 text-xs">
            * {errors.companyCardId.message}
          </p>
        )}
      </div>
      <div className="sm:col-span-6">
        <label
          htmlFor="company"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Type
        </label>
        <div className="mt-1">
          <select
            {...register("type", {
              required: "Please select a type of card.",
            })}
            id="type"
            name="type"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>External</option>
            <option>Claim</option>
            <option>Summary</option>
            <option>FAQ</option>
          </select>
        </div>
        {errors.type && (
          <p className="text-red-500 text-xs">* {errors.type.message}</p>
        )}
      </div>
      {watch("type") === "External" && (
        <div className="sm:col-span-6">
          <label
            htmlFor="cardUrl"
            className="block text-sm font-medium leading-6 text-gray-900 text-left"
          >
            Card URL
          </label>
          <div className="mt-1">
            <input
              {...register("cardUrl")}
              type="text"
              name="cardUrl"
              id="cardUrl"
              className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.cardUrl && (
            <p className="text-red-500 text-xs">* {errors.cardUrl.message}</p>
          )}
        </div>
      )}
      <div className="sm:col-span-6">
        <label
          htmlFor="cardTitle"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Card Title
        </label>
        <div className="mt-1">
          <input
            {...register("cardTitle", {
              required: "Please enter your Card Title.",
            })}
            type="text"
            name="cardTitle"
            id="cardTitle"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.cardTitle && (
          <p className="text-red-500 text-xs">* {errors.cardTitle.message}</p>
        )}
      </div>
      <div className="col-span-full">
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
              //   required: "Please enter your Card Icon.",
              // }
            )}
            type="file"
            id="icon"
            name="icon"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}
