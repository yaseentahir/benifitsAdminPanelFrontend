"use client";

import { useBenefitsAdminPanelCtx } from "@/app/context";
import { API } from "@/utils/service/api";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

const createOption = (option) => ({
  label: option.groupId,
  value: option.id,
});

export default function Form() {
  const {
    register,
    setValue,
    getValues,
    unregister,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const [options, setOptions] = useState({ homecards: [], groups: [] });

  const [feildDisable, setFeildDisable] = useState(true);

  watch("isExternal");

  const { defaultValues } = useBenefitsAdminPanelCtx();

  useEffect(() => {
    if (Object.keys(defaultValues).length == 0) {
    } else {
      for (let key in defaultValues) {
        if (
          defaultValues[key] !== undefined &&
          defaultValues[key] !== null &&
          defaultValues[key] !== ""
        ) {
          if (key === "isExternal" && defaultValues[key] === true) {
            setFeildDisable(false);
          }

          setValue(key, defaultValues[key]);
        } else {
          setValue(key, defaultValues[key]);
        }
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
    if (options.groups.length > 0) {
      if (defaultValues["groupId"].length > 0) {
        if (defaultValues["groupId"]) {
          setValue(
            "groupId",
            options.groups.filter((item) =>
              defaultValues["groupId"].includes(item.value)
            )
          );
        }
      } else {
        setValue("groupId", options.groups[0]);
      }
    }
  }, [options.groups.length]);

  useEffect(() => {
    async function getOptions() {
      try {
        const [homecards, groups] = await Promise.all([
          API.getData("home"),
          API.getData("groups"),
        ]);

        if (groups.data.length > 0) {
          groups.data = groups.data.map((g) => createOption(g));
        }
        setOptions({ homecards: homecards.data, groups: groups.data });
      } catch (error) {
        console.error(error);
      }
    }
    getOptions();
  }, []);

  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label
          htmlFor="homeCardId"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Home Card
        </label>
        <div className="mt-1">
          <select
            {...register("homeCardId", {
              required: "Please select a Home Card.",
            })}
            id="homeCardId"
            name="homeCardId"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {options?.homecards.length === 0 ? (
              <option disabled>No Home Card Found</option>
            ) : (
              options?.homecards.map((homecard, index) => (
                <option key={index} value={homecard.id}>
                  <div>
                    {homecard.iconUrl && (
                      <Image
                        src={homecard.iconUrl}
                        width={230}
                        height={230}
                        alt="option"
                      />
                    )}

                    <span>{homecard.cardTitle}</span>
                  </div>
                </option>
              ))
            )}
          </select>
        </div>
        {errors.homeCardId && (
          <p className="text-red-500 text-xs">* {errors.homeCardId.message}</p>
        )}
      </div>
      <div className="sm:col-span-6">
        <label
          htmlFor="groupId"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Group
        </label>
        <div className="mt-1">
          <Controller
            control={control}
            name="groupId"
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                name="groupId"
                id="groupId"
                options={options?.groups}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
          {/* <select
            {...register("groupId", {
              required: "Please select a Group.",
            })}
            id="groupId"
            name="groupId"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {options?.groups.length === 0 ? (
              <option disabled>No Group Found</option>
            ) : (
              options?.groups.map((group, index) => (
                <option key={index} value={group.id}>
                  {group.groupId}
                </option>
              ))
            )}
          </select> */}
        </div>
        {errors.groupId && (
          <p className="text-red-500 text-xs">* {errors.groupId.message}</p>
        )}
      </div>
      <label
        htmlFor="isExternal"
        className="flex justify-start gap-2 items-center text-sm font-medium leading-6 text-gray-900"
      >
        <input
          type="checkbox"
          name="isExternal"
          id="isExternal"
          {...register("isExternal")}
          onChange={(event) => {
            if (event.currentTarget.checked) {
              setFeildDisable(false);
              {
                register("linkUrl", {
                  required: "Please enter your URL.",
                });
              }
            } else {
              setFeildDisable(true);
              unregister("linkUrl");
            }
          }}
        />
        <p>External</p>
      </label>
      <div className="sm:col-span-6">
        <label
          htmlFor="linkUrl"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Company URL
        </label>
        <div className="mt-1">
          <input
            {...register("linkUrl")}
            disabled={feildDisable}
            type="text"
            name="linkUrl"
            id="linkUrl"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.linkUrl && (
          <p className="text-red-500 text-xs">* {errors.linkUrl.message}</p>
        )}
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="companySlug"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Company Slug
        </label>
        <div className="mt-1">
          <input
            {...register("companySlug")}
            disabled={!feildDisable}
            type="text"
            name="companySlug"
            id="companySlug"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.companySlug && (
          <p className="text-red-500 text-xs">* {errors.companySlug.message}</p>
        )}
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="linkName"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Company Name
        </label>
        <div className="mt-1">
          <input
            {...register("linkName", {
              required: "Please enter your Company Title.",
            })}
            type="text"
            name="linkName"
            id="linkName"
            className=" block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.linkName && (
          <p className="text-red-500 text-xs">* {errors.linkName.message}</p>
        )}
      </div>

      <div className="col-span-full">
        <label
          htmlFor="icon"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Company Icon
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <input
            {...register("icon")}
            type="file"
            id="icon"
            name="icon"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <div className="flex justify-between items-center">
          <label
            htmlFor="backgroundColor"
            className="flex justify-start gap-2 items-center text-sm font-medium leading-6 text-gray-900"
          >
            <input
              type="color"
              name="backgroundColor"
              id="backgroundColor"
              {...register("backgroundColor")}
            />
            <p>Background Color</p>
          </label>
        </div>
      </div>
    </div>
  );
}
