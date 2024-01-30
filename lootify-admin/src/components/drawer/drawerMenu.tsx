import React from "react";
import { AppBar, IconButton, Toolbar, Typography, Box, Drawer, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Custom import
import "../../shared/scss/appbar.scss";
import { ChevronLeft } from "@mui/icons-material";
import Image from "next/image";
import AccordionMenuList from "./accordionMenuList/accordionMenuList";

const DrawerMenu = () => {
  const drawerWidth = 310;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* App bar view */}
      <AppBar
        position="fixed"
        sx={{
          height: "10vh",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          backgroundColor: "black",
        }}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ ml: 2, ...(open && { display: "none" }) }}>
          <MenuIcon />
        </IconButton>
        <Toolbar>Lootify Admin</Toolbar>
      </AppBar>

      {/* Drawer view */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: "white",
          }}>
          {/* Logo */}
          <Image alt="app-logo" src={require("../../assets/images/applogo.svg")} style={{ height: 100, width: 100 }} />

          {/* User name and welcome message */}
          <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"} justifyContent={"end"} sx={{ mr: 3, color: "black" }}>
            <h6>
              <strong>Welcome</strong>
            </h6>
            <h2>Vishwakanth S</h2>
          </Box>

          {/* Close drawer option button */}
          <Box
            position={"absolute"}
            sx={{
              width: drawerWidth,
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft htmlColor="black" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ color: "red", mb: 0.1 }} />

        {/* List items view */}
        <AccordionMenuList />
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
