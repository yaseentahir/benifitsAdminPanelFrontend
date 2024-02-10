import { Cards, NoData } from "@/components";
import React from "react";
import CompaniesList from "./companiesList";

async function getData() {
  try {
    const res = await fetch(process.env.URL + "api/companylinks", {
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

const Dashboard = async () => {
  const { data } = await getData();
  console.log(data);
  return (
    <div>
      <Cards />
      <CompaniesList data={data} />
    </div>
  );
};

export default Dashboard;
