import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../../../../shared/scss/appbar.scss";
import "./optionsListComponent.module.scss";
import optionsData from "./dummy-data.json";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";

interface optionItem {
  optionName: String;
  optionValueLength: number;
  colors: boolean;
  mappedProducts: number;
}

const OptionsListComponent = () => {
  return (
    <React.Fragment>
      <ComponentView>
        <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} />
        <div>Options List Component</div>
      </ComponentView>
    </React.Fragment>
  );
};

export default OptionsListComponent;
