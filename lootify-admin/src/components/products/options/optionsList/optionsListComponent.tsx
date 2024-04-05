import React, { FC, Fragment } from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridValueGetterParams } from "@mui/x-data-grid";

import "../../../../shared/scss/appbar.scss";
import optionsListStyle from "./optionsListComponent.module.scss";
import optionsData from "./dummy-data.json";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import CommonSearchInput from "@/src/shared/components/search/commonSearchInput";
import { Button, IconButton } from "@mui/material";
import { Delete, Edit, FileDownload, FileUpload, RemoveRedEye } from "@mui/icons-material";
import Link from "next/link";

interface optionItem {
  optionName: String;
  optionValueLength: number;
  colors: boolean;
  mappedProducts: number;
}

const OptionsListComponent: FC<{}> = () => {
  // Columns section with set of required field
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

  const handleImport = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx";
    fileInput.addEventListener("change", async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      handleFile(file);
    });
    fileInput.click();
  };

  const handleFile = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // const response = await fetch('/your-backend-endpoint', {
        //   method: 'POST',
        //   body: formData,
        // });
        // console.log('File uploaded successfully:', response);
        console.log("formData to upload", formData);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <React.Fragment>
      <ComponentView>
        {/* <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} /> */}
        <AddHeaderComponent
          title={"Option List"}
          modalHeader
          // includeBackOption
          actionView={
            <Fragment>
              <Button variant="contained" color="secondary" sx={{ ml: 3, width: 120 }} endIcon={<FileUpload />} onClick={() => handleImport()}>
                IMPORT
              </Button>

              <Button variant="contained" color="secondary" sx={{ ml: 3, width: 120 }} endIcon={<FileDownload />}>
                EXPORT
              </Button>
              <Link href={"/admin/drawermenu/products/options/new"}>
                <Button variant="contained" color="secondary" sx={{ ml: 3, width: 140 }}>
                  ADD OPTIONS
                </Button>
              </Link>
            </Fragment>
          }
        />
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
            checkboxSelection={false}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
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
