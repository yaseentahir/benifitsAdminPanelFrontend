"use client";

import { useBenefitsAdminPanelCtx } from "@/app/context";
import { API } from "@/utils/service/api";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Form() {
  const {
    register,
    setValue,
    unregister,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { defaultValues } = useBenefitsAdminPanelCtx();

  useEffect(() => {
    async function getOptions() {
      const res = await API.getData("links/internal");
      setOptions(res.data);
    }

    getOptions();

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

  const [options, setOptions] = useState([]);

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label
          htmlFor="companyCardId"
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
          htmlFor="question"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Question
        </label>
        <div className="mt-1">
          <textarea
            {...register("question", {
              required: "Please enter your Question.",
            })}
            type="text"
            name="question"
            id="question"
            rows={3}
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.question && (
          <p className="text-red-500 text-xs">* {errors.question.message}</p>
        )}
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="answer"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Answer
        </label>
        <div className="mt-1">
          <textarea
            {...register("answer", {
              required: "Please enter your Answer.",
            })}
            type="text"
            name="answer"
            id="answer"
            rows={5}
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.answer && (
          <p className="text-red-500 text-xs">* {errors.answer.message}</p>
        )}
      </div>
    </div>
  );
}
