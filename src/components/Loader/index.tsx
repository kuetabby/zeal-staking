import React from "react";

import "./style.css";

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mx-auto overflow-hidden">
      <div className="flex justify-center items-center relative w-60 h-60">
        <div className="absolute border-[0.75em] border-t-transparent rounded-full border-solid border-yellow-600 h-full w-full animate-spin"></div>
      </div>
      <h1 className="flex text-white text-xl lg:text-2xl 2xl:text-3xl font-semibold mt-4">
        Loading
        <div className="loading-pulse">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </h1>
    </div>
  );
};

export default Loader;
