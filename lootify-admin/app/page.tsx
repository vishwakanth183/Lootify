"use client";

import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

import "../src/shared/scss/commonStyles.scss";
import { useRouter } from "next/navigation";

const LootifyRootPage = () => {
  // Variable to check the screensize
  const isDesktop = useMediaQuery("(min-width:600px)");

  // Variable to handle router navigation
  const router = useRouter();

  useEffect(() => {
    const changeRouteTimeout = setTimeout(() => {
      router.replace("/admin/drawermenu/dashboard");
    });
    console.log("dev branch");
    return () => clearTimeout(changeRouteTimeout);
  }, []);

  return (
    <div className={"main primaryBackground"}>
      <Image
        alt="Logo"
        src={require("../src/assets/images/applogo.svg")}
        className={"mobileSplash"}
        // className={isDesktop ? "desktopSplash" : "mobileSplash"}
      />
      <h1 className="whitetext">Lootify</h1>
    </div>
  );
};

export default LootifyRootPage;
