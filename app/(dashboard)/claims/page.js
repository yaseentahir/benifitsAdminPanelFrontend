import { NoData, Table } from "@/components";
import React, { Suspense } from "react";
import Loading from "./loading";

async function getData() {
  try {
    const res = await fetch("https://api.surecarebenefits.com/claims", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data (HTTP status ${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
const Page = async () => {
  const { data } = await getData();

  const columns = [
    {
      Header: "Company Icon",
      accessor: "claimCompany.iconUrl",
    },
    {
      Header: "Company Name",
      accessor: "claimCompany.linkName",
    },
    {
      Header: "EDI",
      accessor: "edi",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      {data.length === 0 ? (
        <NoData message={"You dont have any claims."} />
      ) : (
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table
                columns={columns}
                data={data}
                source={"claims"}
                specialCells={["claimCompany.iconUrl"]}
              />
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;
