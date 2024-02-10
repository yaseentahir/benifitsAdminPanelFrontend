import React from "react";

const Button = ({ title, handler, type }) => {
  return (
    <button
      type={type}
      onClick={(e) => handler(e)}
      className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {title}
    </button>
  );
};

export default Button;
