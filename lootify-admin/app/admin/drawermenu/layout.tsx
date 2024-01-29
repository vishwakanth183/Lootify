"use client";

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import DrawerMenu from "@/src/components/drawer/drawerMenu";

const Layout = ({ children }: { children: any }) => (
  <React.Fragment>
    <DrawerMenu />
    {children}
  </React.Fragment>
);

export default Layout;
