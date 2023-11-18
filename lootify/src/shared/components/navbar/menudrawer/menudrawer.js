import React, { useState } from "react";
import { Button, Drawer, IconButton, Stack } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useRouter } from "next/navigation";
import { Menu } from "@mui/icons-material";

// Custom imports
import "./menudrawer.scss";
import Image from "next/image";

function MenuDrawer(props) {
  const [open, setOpen] = useState(false);

  // for navigation purpose
  const router = useRouter();

  // For menu options
  const navBarPages = [
    {
      name: "Home",
      route: "/home",
      startIcon: () => {
        return <HomeRoundedIcon fontSize="large" />;
      },
    },
    {
      name: "Products",
      route: "/product",
      startIcon: () => {
        return <MenuBookRoundedIcon fontSize="large" />;
      },
    },
    {
      name: "About us",
      route: "/about",
      startIcon: () => {
        return <BubbleChartRoundedIcon fontSize="large" />;
      },
    },
    {
      name: "Signin",
      route: "/signin",
      startIcon: () => {
        return <PersonRoundedIcon fontSize="large" />;
      },
      variant: "contained",
    },
  ];

  // Function to handle route
  const handleRoute = (destination) => {
    router.push(destination);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Menu fontSize="medium" htmlColor="black" />
      </IconButton>
      {/* Mobile drawer section */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="menudrawer">
          <div className="menutopview">
            <Image
              src={require("../../../../../src/assets/images/applogo.svg")}
              className={"mobilenavlogo"}
            />
            <h2 className="whitetext">Lootify</h2>
          </div>

          {/* List of menus */}
          <div className="mobilemenulist">
            {navBarPages.map((pages, index) => {
              return (
                <Button
                  fullWidth
                  key={index}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  {pages.name}
                </Button>
              );
            })}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default MenuDrawer;
