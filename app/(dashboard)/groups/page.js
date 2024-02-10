import { NoData, Table } from "@/components";
import React, { Suspense } from "react";
import Loading from "./loading";

const getData = async () => {
  const res = await fetch("https://api.surecarebenefits.com/groups", {
    cache: "no-store",
  });
  return res.json();
};

const Page = async () => {
  const { data } = await getData();

  const columns = [
    {
      Header: "Group ID",
      accessor: "groupId",
    },
    {
      Header: "Price One",
      accessor: "price1",
    },
    {
      Header: "Price Two",
      accessor: "price2",
    },
    {
      Header: "Price Three",
      accessor: "price3",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      {data.length === 0 ? (
        <NoData message={"You dont have any Groups To Show."} />
      ) : (
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table columns={columns} data={data} source={"groups"} />
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;
