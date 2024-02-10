import Image from "next/image";

export const tableCellFormator = {
  isCompany: (value) => {
    return value ? "Yes" : "No";
  },
  isExternal: (value) => {
    return value ? "Yes" : "No";
  },
  iconUrl: (value) => {
    if (!value) {
      value = "/no-icon.png";
    }
    return <Image src={value} height={36} width={36} alt={value} />;
  },
  backgroundColor: (value) => {
    return <div style={{ backgroundColor: value }} className="h-4 w-4"></div>;
  },
  groups: (value) => {
    return value.map((item) => (
      <div
        className=" bg-black text-white px-1 rounded-sm m-1 inline-flex "
        key={item.key}
      >
        {item.groupId}
      </div>
    ));
  },
};
