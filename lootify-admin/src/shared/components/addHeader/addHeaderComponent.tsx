import { Button, Divider, ThemeProvider } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

import "../../scss/appbar.scss";
import "./addHeaderComponent.scss";
import { customMuiTheme } from "../../muistyles/customProvider";

export interface actionButtonInterface {
  title: String;
  callbackFunction?: (() => void) | undefined;
}

export interface addHeaderComponentProps {
  title: String;
  href?: URL | string;
  buttonTitle?: String;
  modalHeader?: boolean;
  actionButtons?: actionButtonInterface[];
  callbackFunction?: (() => void) | undefined;
}

const AddHeaderComponent: FC<addHeaderComponentProps> = ({ title, href, buttonTitle, modalHeader, callbackFunction, actionButtons }) => {
  return (
    <ThemeProvider theme={customMuiTheme}>
      <div className="headerMainView">
        <header className="displayEnd headerPadding">
          <h2 className="headerTitle">{title}</h2>
          {!modalHeader ? (
            <div>
              {href && (
                <Link href={href}>
                  <Button variant="contained" color="secondary">
                    {buttonTitle}
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="actionButtonView">
              {actionButtons?.map((actionItem, index) => {
                return (
                  <div key={index}>
                    <Button variant="contained" color="secondary" onClick={actionItem.callbackFunction} sx={{ ml: 3, width: 100 }}>
                      {actionItem.title}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </header>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </div>
    </ThemeProvider>
  );
};

export default AddHeaderComponent;
