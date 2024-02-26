import React from "react";

import "./style.css";

interface Props {}

const YinLoader: React.FC<Props> = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mx-auto overflow-hidden">
      <div className="yin-loaders" />
    </div>
  );
};

export default YinLoader;
