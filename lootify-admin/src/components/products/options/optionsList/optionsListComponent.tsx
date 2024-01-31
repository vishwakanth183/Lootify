import React from "react";

import "../../../../shared/scss/appbar.scss";
import "./optionsListComponent.scss";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";

const OptionsListComponent = () => {
  return (
    <React.Fragment>
      <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} />
      <ComponentView fullView>
        <div>Options List Component</div>
      </ComponentView>
    </React.Fragment>
  );
};

export default OptionsListComponent;
