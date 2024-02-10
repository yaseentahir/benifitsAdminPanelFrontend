"use client";
import React from "react";
import Image from "next/image";

const NoData = ({ message }) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="mt-16">
        <Image
          src="/box-empty-state.jpg"
          width={96}
          height={96}
          alt="No Data Available"
        />
      </div>
      <div className="text-lg mt-6 text-gray-500 font-bold">Data Not Found</div>
      <p className="text-sm mt-3 text-gray-700">{message}</p>
    </div>
  );
};

export default NoData;
