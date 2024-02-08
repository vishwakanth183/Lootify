import React, { FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import "../../../../shared/scss/appbar.scss";
import optionsListStyle from "./optionsListComponent.module.scss";
import optionsData from "./dummy-data.json";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import CommonSearchInput from "@/src/shared/components/search/commonSearchInput";
import { IconButton } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";

interface optionItem {
  optionName: String;
  optionValueLength: number;
  colors: boolean;
  mappedProducts: number;
}

const OptionsListComponent: FC<{}> = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", headerClassName: "tableHeader", flex: 1 },
    { field: "optionName", type: "string", headerName: "Option Name", flex: 1 },
    { field: "optionValueLength", headerName: "Values", align: "center", headerAlign: "center", flex: 1 },
    {
      field: "colors",
      headerName: "Colors",
      type: "boolean",
      flex: 1,
    },
    {
      field: "mappedProducts",
      headerName: "Mapped Products",
      flex: 1,
      type: "number",
      align: "center",
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 300,
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      groupable: false,
      renderCell: () => {
        return (
          <div>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
              <RemoveRedEye />
            </IconButton>
            <IconButton>
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <ComponentView>
        <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} />
        <div className={optionsListStyle.searchView}>
          <CommonSearchInput placeholder="Search by option name" />
        </div>
        <div className={optionsListStyle.mainListView}>
          <DataGrid
            rows={optionsData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            classes={{
              columnHeaderCheckbox: "red",
            }}
            sx={{
              "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": {
                color: "#5ab155",
              },
            }}
          />
        </div>
      </ComponentView>
    </React.Fragment>
  );
};

export default OptionsListComponent;
