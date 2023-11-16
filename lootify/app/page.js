"use client";

import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

import { appColors } from "@/src/shared/appColor";
import { poppins } from "@/src/shared/appFonts";
import { Center } from "@/src/shared/components/Customized-mui";

const LootifyRootPage = () => {
  // Variable to check the screensize
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Center>
      <Image
        src={require("../src/assets/images/applogo.svg")}
        style={
          isDesktop ? { height: 200, width: 200 } : { height: 100, width: 100 }
        }
      />
      <Typography
        style={{ color: appColors.light }}
        sx={{ fontFamily: poppins.style.fontFamily }}
        variant="h1"
      >
        Lootify
      </Typography>
    </Center>
  );
};

export default LootifyRootPage;
