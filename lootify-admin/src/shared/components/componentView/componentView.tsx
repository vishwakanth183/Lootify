import React, { FC } from "react";

import "./componentView.scss";

interface componentView {
  children?: React.ReactElement | React.ReactElement[];
  fullView?: boolean;
}

const ComponentView: FC<componentView> = ({ children, fullView }) => {
  return (
    <React.Fragment>
      <div className={`componentView ${fullView ? "fullView" : ""}`}>{children}</div>
    </React.Fragment>
  );
};

export default ComponentView;
