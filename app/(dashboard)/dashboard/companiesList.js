import Image from "next/image";
import React from "react";

const dashboardCard = (card) => {
  return (
    <div>
      {/* <Image src={card.iconUrl} width={200} height={200} alt="Icon" /> */}
      <h1>{card.linkName}</h1>
      <span>{card.isExternal}</span>
      <span>{card.isComapny}</span>
    </div>
  );
};

const CompaniesList = ({ data }) => {
  return <div>{data?.map((item) => dashboardCard(item))}</div>;
};

export default CompaniesList;
