"use client";

import React from "react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

import "../src/shared/commonStyles.scss";
import ReduxLayout from "./ReduxLayout";

const LootifyRootPage = () => {
  // Variable to check the screensize
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={"main primaryBackground"}>
      <Image
        alt="Logo"
        src={require("../src/assets/images/applogo.svg")}
        className={isDesktop ? "desktopSplash" : "mobileSplash"}
      />
      <h1 className="whitetext">Lootify</h1>
    </div>
  );
};

export default LootifyRootPage;
