"use client";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
import clsx from "clsx";
import { CopyrightOutlined } from "@ant-design/icons";

import { useIsMounted } from "@/hooks/useIsMounted";

// import TwitterLogo from "@/assets/logo-twitter.png";
// import TelegramLogo from "@/assets/logo-telegram.png";
// import MediumLogo from "@/assets/logo-medium.png";
// import WebLogo from "@/assets/logo-web.png";
// import GitbookLogo from "@/assets/logo-gitbook.png";
// import EmailLogo from "@/assets/logo-email.png";

import { montserrat } from "@/utils/font";

import "./style.css";

interface Props {}

const AppFooter: React.FC<Props> = () => {
  if (!useIsMounted) {
    return null;
  }

  return (
    <footer
      className={clsx("app-footer bg-app-variation-2", montserrat.className)}
    >
      <div className="app-footer-wrapper">
        <div className="all-reserved">
          <div className="w-full sm:w-1/2 flex flex-wrap justify-center sm:justify-start items-center my-2 sm:my-0 order-2 sm:order-1">
            <div className="text-xs font-semibold">
              Ace
              <CopyrightOutlined
                className="mx-1"
                style={{ fontSize: "1em" }}
              />{" "}
              2024 | All Rights Reserved
            </div>
          </div>
          {/* <div className="w-full sm:w-1/2 flex justify-center sm:justify-end order-1 sm:order-2">
            <Link
              href="/"
              className="w-auto text-sm hover:text-yellow-600 font-bold mx-2 mb-2 sm:mb-0"
            >
              Telegram
            </Link>
            <Link
              href="/"
              className="w-auto text-sm hover:text-yellow-600 font-bold mx-2 mb-2 sm:mb-0"
            >
              Twitter
            </Link>
            <Link
              href="/"
              className="w-auto text-sm hover:text-yellow-600 font-bold mx-2 mb-2 sm:mb-0"
            >
              Medium
            </Link>
            <Link
              href="/"
              className="w-auto text-sm hover:text-yellow-600 font-bold mx-2 mb-2 sm:mb-0"
            >
              Whitepaper
            </Link>
          </div> */}
          {/* <Link
              href="https://azurecoin.io"
              className="w-auto hover:text-violet-500 mx-1 mb-2 sm:mb-0"
            >
              <Image
                src={WebLogo}
                alt="web-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link> */}
          {/* <Link
              href="https://twitter.com/Azure_L2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-violet-500 mx-1"
            >
              <Image
                src={TwitterLogo}
                alt="tw-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link>
            <Link
              href="https://t.me/Azure_L2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-violet-500 mx-1"
            >
              <Image
                src={TelegramLogo}
                alt="tele-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link>
            <Link
              href="https://azurecoin.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-violet-500 mx-1"
            >
              <Image
                src={MediumLogo}
                alt="dc-logo"
                className="w-10 lg:w-8 h-10 lg:h-8 !rounded-full"
              />
            </Link> */}
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
