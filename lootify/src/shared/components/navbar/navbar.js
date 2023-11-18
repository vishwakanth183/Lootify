"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";

import "../../commonStyles.scss";
import "./navbar.scss";
import { IconButton, useMediaQuery } from "@mui/material";
import MenuDrawer from "./menudrawer/menudrawer";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <nav>
      {isDesktop ? (
        /** This section will be displayed for tab and desktop devices **/

        <div className="navbar">
          {/* Left nav */}
          <div className="leftnav">
            <Image
              src={require("../../../../src/assets/images/applogo.svg")}
              className={"navlogo"}
            />
            <h1>Lootify</h1>
          </div>

          {/* Right nav */}
          <div className="rightnav">
            <Link className="navlinkbutton" href={"/lootify/home"}>
              Home
            </Link>
            <Link className="navlinkbutton" href={"/lootify/products"}>
              Products
            </Link>
            <Link className="navlinkbutton" href={"/lootify/signin"}>
              Login
            </Link>
            <Link className="navlinkbutton" href={"/lootify/cart"}>
              <IconButton>
                <ShoppingBasketIcon htmlColor="black" />
              </IconButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <MenuDrawer />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
