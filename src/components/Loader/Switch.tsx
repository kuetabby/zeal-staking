import React from "react";
import Image from "next/image";

import AppLogo from "@/assets/logo-app.png";

import "./style.css";

interface Props {}

const SwitchLoader: React.FC<Props> = () => {
  return (
    <div className="switch-loader-container">
      <Image src={AppLogo} alt="mystic-logo" className="switch-image" />
    </div>
  );
};

export default SwitchLoader;
