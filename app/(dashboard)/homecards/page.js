"use client";
import { NoData, Table } from "@/components";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { API } from "@/utils/service/api";

// async function getData() {
//   try {
//     const res = await fetch("https://api.surecarebenefits.com/home", {
//       cache: "force-cache",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch data (HTTP status ${res.status})`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data, error } = await API.getData("home");
        if (!error) {
          setData(data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    getData();
  }, []);

  const columns = [
    {
      Header: "Icon",
      accessor: "iconUrl",
    },
    {
      Header: "Card Title",
      accessor: "cardTitle",
    },
    {
      Header: "Icon Name",
      accessor: "icon",
    },

    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      {data.length === 0 ? (
        <NoData message={"You dont have any home cards."} />
      ) : (
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table
                columns={columns}
                data={data}
                source={"home"}
                specialCells={["iconUrl"]}
              />
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;
