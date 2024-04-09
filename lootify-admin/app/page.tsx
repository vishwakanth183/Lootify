"use client";

import React, { useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";

import "../src/shared/scss/commonStyles.scss";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

dotenv.config();

const LootifyRootPage = () => {
  // Variable to check the screensize
  const isDesktop = useMediaQuery("(min-width:600px)");

  // Variable to handle router navigation
  const router = useRouter();

  useEffect(() => {
    const changeRouteTimeout = setTimeout(() => {
      router.replace("/admin/drawermenu/dashboard");
    }, 2000);
    return () => clearTimeout(changeRouteTimeout);
  }, []);

  return (
    <div className={"main primaryBackground"}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
        <Image
          alt="Logo"
          src={require("../src/assets/images/applogo.svg")}
          className={"mobileSplash"}
          // className={isDesktop ? "desktopSplash" : "mobileSplash"}
        />
        <h1 className="whitetext">Lootify</h1>
      </Box>
    </div>
  );
};

export default LootifyRootPage;
