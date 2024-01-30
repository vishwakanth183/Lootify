import { useState, memo, useEffect } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

// Custom imports
import { customMuiTheme } from "@/src/shared/muistyles/customProvider";
import "./accordionMenuList.scss";
import GenerateMenuIcon from "./generateMenuIcon";
import { AppDispatch, RootState } from "@/app/redux/store";
import { changeSelectedMenu } from "@/app/redux/slices/common/common";

const AccordionMenuList = ({}) => {
  // Menu values
  const menuData = [
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

  // Variable to hold redux appdispatch
  const dispatch = useDispatch<AppDispatch>();

  // Variable to hold common state of the redux
  const common = useSelector((state: RootState) => state.commonSlice);

  // State to handle the menu opening and closing state
  const [opened, setOpened] = useState<{
    mainMenuIndex: number | undefined | null;
    subMenuIndex: number | undefined | null;
  }>({ mainMenuIndex: common.mainMenuIndex, subMenuIndex: common.subMenuIndex });

  // State to handle closing state of submenu
  const [closeSubmenu, setCloseSubmenu] = useState<boolean>(false);

  // Function to handle menu selections
  const handleClick = (mainMenuIndex: number, submenuIndex?: number | undefined) => {
    // console.log("clicked", mainMenuIndex, submenuIndex);
    // console.log("selected", opened.mainMenuIndex, opened.subMenuIndex);
    if (opened.mainMenuIndex == undefined || opened.mainMenuIndex != mainMenuIndex) {
      // initial if statement
      if (!menuData[mainMenuIndex].submenu.length) {
        let newSelected = { mainMenuIndex: mainMenuIndex, subMenuIndex: undefined };
        // navigate to mainMenu url
        // console.log("navigate to mainMenu url");
        setOpened(newSelected);
        dispatch(changeSelectedMenu(newSelected));
      } else {
        let newSelected = { mainMenuIndex: mainMenuIndex, subMenuIndex: 0 };
        setOpened(newSelected);
        dispatch(changeSelectedMenu(newSelected));
        setCloseSubmenu(false);
      }
    } else if (opened.mainMenuIndex == mainMenuIndex && opened.subMenuIndex != undefined) {
      if (submenuIndex == undefined) {
        // console.log("Main menu with subemnu selected is clicked");
        setCloseSubmenu(!closeSubmenu);
      } else if (opened.subMenuIndex == submenuIndex) {
        // console.log("Same submenu selected");
      } else {
        // console.log("Switch to new submenu");
        let newSelected = { mainMenuIndex: mainMenuIndex, subMenuIndex: submenuIndex };
        setOpened(newSelected);
        dispatch(changeSelectedMenu(newSelected));
        setCloseSubmenu(false);
      }
      //onselecting a new submenu
    } else if (opened.mainMenuIndex == mainMenuIndex && submenuIndex == undefined) {
      // console.log("Same mainmenu selected with no previous submenu", opened.subMenuIndex);
      if (opened.subMenuIndex != undefined) {
        let newSelected = { mainMenuIndex: undefined, subMenuIndex: undefined };
        setOpened(newSelected);
        dispatch(changeSelectedMenu(newSelected));
      }
    }
  };

  // Variable to handle router navigation
  const router = useRouter();
  const pathname = usePathname();

  // Check and navigate routes
  const checkandnavigate = () => {
    let pathnameArray = pathname.split("/");
    const pathArrayLength = pathnameArray.length;
    let currentMainMenu;
    let currentSubMenu;

    if (pathnameArray.length == 4) {
      currentMainMenu = pathnameArray[pathArrayLength - 1];
    } else {
      currentMainMenu = pathnameArray[pathArrayLength - 2];
      currentSubMenu = pathnameArray[pathArrayLength - 1];
    }

    if (common.subMenuIndex == undefined) {
      if (currentMainMenu != menuData[common.mainMenuIndex as number].mainmenu) {
        pathnameArray = pathnameArray.slice(0, 3);
        pathnameArray.push(menuData[common.mainMenuIndex as number].mainmenu);
        const newPath = pathnameArray.join("/");
        router.push(newPath);
        // console.log("navigate to", menuData[common.mainMenuIndex as number].mainmenu);
      }
    } else {
      if (currentMainMenu != menuData[common.mainMenuIndex as number].mainmenu || currentSubMenu != menuData[common.mainMenuIndex as number].submenu[common.subMenuIndex]) {
        pathnameArray = pathnameArray.slice(0, 3);
        pathnameArray.push(menuData[common.mainMenuIndex as number].mainmenu);
        pathnameArray.push(String(menuData[common.mainMenuIndex as number].submenu[common.subMenuIndex]).replace(/\s/g, ""));
        const newPath = pathnameArray.join("/");
        router.push(newPath);
        // console.log("navigate to submenu", menuData[common.mainMenuIndex as number].mainmenu, menuData[common.mainMenuIndex as number].submenu[common.subMenuIndex]);
      }
    }

    // console.log("currentMainMenu , selectedMainMenu", currentMainMenu, menuData[common.mainMenuIndex as number].mainmenu);
    // console.log("currentSubMenu , selectedSubMenu", currentSubMenu);
  };

  // useEffect to be called while changing the menu
  useEffect(() => {
    checkandnavigate();
  }, [common.mainMenuIndex, common.subMenuIndex]);

  return (
    <ThemeProvider theme={customMuiTheme}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", p: 0 }} component="nav" aria-labelledby="nested-list-subheader">
        {menuData.map((menuItem, mainMenuIndex) => {
          return (
            <div key={mainMenuIndex}>
              <ListItemButton onClick={() => handleClick(mainMenuIndex)} className={mainMenuIndex == opened.mainMenuIndex ? "highlightedList" : ""}>
                <ListItemIcon>
                  <GenerateMenuIcon name={menuItem.mainmenu} selected={mainMenuIndex == opened.mainMenuIndex} />
                </ListItemIcon>
                <ListItemText primary={menuItem.mainmenu} sx={{ textTransform: "capitalize" }} />
                {menuItem?.submenu?.length ? opened.mainMenuIndex == mainMenuIndex && !closeSubmenu ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItemButton>

              {menuItem?.submenu?.length && !closeSubmenu ? (
                <Collapse in={opened.mainMenuIndex == mainMenuIndex} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.submenu.map((submenuItem, submenuIndex) => {
                      return (
                        <ListItemButton sx={{ pl: 4 }} key={submenuIndex} onClick={() => handleClick(mainMenuIndex, submenuIndex)}>
                          <ListItemIcon>
                            <GenerateMenuIcon name={submenuItem} selected={submenuIndex == opened.subMenuIndex} submenu />
                          </ListItemIcon>
                          <ListItemText
                            primary={submenuItem}
                            sx={{ textTransform: "capitalize" }}
                            style={{ fontWeight: "600" }}
                            className={submenuIndex == opened.subMenuIndex ? "highlightedSubmenu" : ""}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              ) : null}
            </div>
          );
        })}
      </List>
    </ThemeProvider>
  );
};

export default memo(AccordionMenuList);
