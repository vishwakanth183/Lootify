export const menuData = [
  {
    mainmenu: "dashboard",
    submenu: [],
  },
  {
    mainmenu: "products",
    submenu: ["all products", "restore products", "options"],
  },
  {
    mainmenu: "orders",
    submenu: ["orderlist"],
  },
  {
    mainmenu: "marketing",
    submenu: ["templates", "discount marketing"],
  },
  // {
  //   mainmenu: "logout",
  //   submenu: [],
  // },
  {
    mainmenu: "settings",
    submenu: [],
  },
];

export interface pathnames {
  routeMenuName: String;
  routeSubMenuName: String | undefined;
}

export const getMenuIndexBasedonRoute = ({ routeMenuName, routeSubMenuName }: pathnames) => {
  let mainMenuIndex;
  let subMenuIndex;
  // console.log("mainMenu , subMenu", routeMenuName, routeSubMenuName);
  menuData.map((menuItem, firstIndex) => {
    if (menuItem.mainmenu == routeMenuName) {
      mainMenuIndex = firstIndex;
      if (menuItem.submenu.length) {
        menuItem.submenu.map((submenuItem, secondIndex) => {
          // console.log("submenuItem", submenuItem, routeSubMenuName, secondIndex);
          if (submenuItem.split(" ").join("") == routeSubMenuName) {
            subMenuIndex = secondIndex;
          }
        });
      } else {
        subMenuIndex = undefined;
      }
    }
  });
  // console.log("mainMenuIndex , subMenuIndex", mainMenuIndex, subMenuIndex);
  return { mainMenuIndex, subMenuIndex };
};
