"use client";
// import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
// import {  useDisclosure, useMediaQuery } from "@chakra-ui/react";
import clsx from "clsx";
// import { MenuOutlined } from "@ant-design/icons";

// import PageTabs from "../PageTabs";
// import { NavbarDrawer } from "./Drawer";

import { montserrat } from "@/utils/font";

import AppLogo from "@/assets/logo-app.png";

import "./style.css";

interface Props {}

// const contractAddress = "0x016c4225ae87FEC52A5230158fb9dF7f93B87921";
// const pairAddress = "0x1e053b6d2f0a578505bfd8bfe344295a9a08bbd2";

const Navbar: React.FC<Props> = () => {
  // const {
  //   isOpen: isScroll,
  //   onOpen: onOpenScroll,
  //   onClose: onCloseScroll,
  // } = useDisclosure();
  // const {
  //   isOpen: isOpenDrawer,
  //   onOpen: onOpenDrawer,
  //   onClose: onCloseDrawer,
  // } = useDisclosure();

  // const router = useRouter()
  // const [isEqual640] = useMediaQuery("(min-width: 640px)");

  // useEffect(() => {
  //   if (isEqual640) {
  //     onCloseDrawer();
  //   }
  // }, [isEqual640]);

  // useEffect(() => {
  //   window?.addEventListener("scroll", handleScroll);
  //   return () => window?.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = (e: Event) => {
  //   const { scrollY } = e.currentTarget as Window;
  //   if (scrollY > 160) {
  //     onOpenScroll();
  //   }
  //   if (scrollY === 0) {
  //     onCloseScroll();
  //   }
  // };

  return (
    <div className={clsx("navbar-container", montserrat.className)}>
      {/* <div className={clsx(isScroll ? "navbar-scroll" : "navbar")}> */}
      <div className={clsx("navbar")}>
        <div className="w-2/5 sm:w-1/2 lg:w-1/4 flex items-center relative">
          <Link
            href="https://www.zeal-ai.net"
            className={`logo-container text-white`}
          >
            <Image
              src={AppLogo}
              alt="app-logo"
              className="w-full md:w-full h-16 rounded-full object-contain"
            />
          </Link>
        </div>

        <div className={clsx("flex justify-end w-1/2")}>
          <ConnectWallet
            hideTestnetFaucet
            // auth={{
            //   loginOptional: false,
            //   onLogin(token) {
            //     console.log("user logged in", token);
            //   },
            //   onLogout() {
            //     console.log("user logged out");
            //   },
            // }}
          />
        </div>

        {/* <PageTabs containterClass="hidden sm:flex ml-2" /> */}
        {/* <div
          // className={clsx("!hidden lg:!flex justify-end w-1/5 font-semibold")}
          className={clsx("!hidden sm:!flex justify-end w-1/5 font-semibold")}
        >
          <Link
            href={`https://app.uniswap.org/tokens/ethereum/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-auto mr-4"
          >
            <Button className="w-full !bg-transparent border border-white hover:border-secondary hover:text-white text-secondary">
              Buy Twister
            </Button>
          </Link>
        </div> */}

        {/* small devices */}
        {/* <div className="small-title">
          Ventura <span className="hidden sm:block ml-3">Chain</span>
        </div> */}
        {/* <div className="sm:hidden w-1/4 text-right animate-fadeInBasic">
          <Button
            className="bg-mystic-horizon hover:bg-mystic-horizon active:bg-mystic-horizon focus:bg-mystic-horizon text-white"
            onClick={onOpenDrawer}
          >
            <MenuOutlined
              className="font-extrabold text-white"
              style={{ fontSize: "1.5em" }}
            />
          </Button>
        </div> */}
      </div>
      {/* <NavbarDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} /> */}
    </div>
  );
};

export default Navbar;
