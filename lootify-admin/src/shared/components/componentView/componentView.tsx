import React, { FC } from "react";

import "./componentView.scss";
import { ThemeProvider } from "@emotion/react";
import { customMuiTheme } from "../../muistyles/customProvider";

interface componentView {
  children?: React.ReactElement | React.ReactElement[];
  fullView?: boolean;
  enableScroll?: boolean;
}

const ComponentView: FC<componentView> = ({ children, fullView, enableScroll }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={customMuiTheme}>
        <div className={`componentView ${fullView ? "fullView" : ""} ${enableScroll ? "enableCustomScroll" : "disableScroll"}`}>{children}</div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ComponentView;
