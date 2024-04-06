import { Button, Divider, IconButton, ThemeProvider, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

import "../../scss/appbar.scss";
import "./addHeaderComponent.scss";
import { customMuiTheme } from "../../muistyles/customProvider";
import { ArrowBack } from "@mui/icons-material";

export interface actionButtonInterface {
  title: String;
  callbackFunction?: (() => void) | undefined;
}

export interface addHeaderComponentProps {
  title: String;
  href?: URL | string;
  buttonTitle?: String;
  modalHeader?: boolean;
  actionView?: React.ReactNode;
  includeBackOption?: boolean;
  backHandler?: () => void;
}

const AddHeaderComponent: FC<addHeaderComponentProps> = ({ title, href, buttonTitle, modalHeader, actionView, backHandler, includeBackOption }) => {
  return (
    <div className="headerMainView">
      <header className="displayEnd headerPadding">
        <div className="headingRowView">
          {includeBackOption && (
            <IconButton onClick={backHandler}>
              <ArrowBack color="secondary" />
            </IconButton>
          )}
          <Typography variant="h5" className="headerTitle" color={"purple"}>
            {title}
          </Typography>
          {/* <h2 className="headerTitle">{title}</h2> */}
        </div>
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
          <div className="actionButtonView">{actionView}</div>
        )}
      </header>
      <Divider sx={{ mt: 2, mb: 2 }} />
    </div>
  );
};

export default AddHeaderComponent;
