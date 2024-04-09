"use client";
import React, { FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";

import "./../../../shared/scss/appbar.scss";
import productListStyle from "./productListComponent.module.scss";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import CommonSearchInput from "@/src/shared/components/search/commonSearchInput";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { Add, ArrowForward, Autorenew, Close, ControlPoint, ControlPointDuplicate, Delete, Edit, RadioButtonCheckedOutlined } from "@mui/icons-material";
import ProductModal from "../../orders/manualOrder/productModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { updateStepper } from "@/app/redux/slices/order/manualOrder";
import Link from "next/link";

export interface productItem {
  id: number;
  productName: String;
  isVariants: boolean;
  salesPrice: number;
  mrpPrice: number;
  stock: number;
  variantCombinationDetails: {
    id: number;
    combinationName: string;
    isDefault: boolean | null;
    salesPrice: number;
    mrpPrice: number;
    stock: number;
  }[];
}

const ProductListComponent: FC<{ isRestore?: boolean; isManualOrder?: boolean }> = ({ isRestore, isManualOrder }) => {
  // Variable to handle dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Variable to handle loading value
  const [loading, setLoading] = useState<boolean>(false);

  // Variable to handle page number in pagination
  const [page, setPage] = useState<number>(0);

  // Variable to handle page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Variable to handle page searchValue
  const [searchValue, setSearchValue] = useState<string>("");

  // Variable to handle page data
  const [pageData, setPageData] = useState<productItem[]>();

  // Variable to handle total data count
  const [totalCount, setTotalCount] = useState<number>(0);

  // Variable to handle page table headers
  const productListHeaders: { headerName: string }[] = [
    {
      headerName: "S.No",
    },
    {
      headerName: "ProductName",
    },
    {
      headerName: "isVariants",
    },
    {
      headerName: "SalesPrice",
    },
    {
      headerName: "MrpPrice",
    },
    {
      headerName: "Stock",
    },
    {
      headerName: "Actions",
    },
  ];

  // Variable to handle selectedProduct
  const [selectedProduct, setSelectedProduct] = useState<productItem | null>(null);

  // Variable to open product modal
  const [productModal, setProductModal] = useState<boolean>(false);

  // Function to handle change page pagination
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Function to handle change row pagination
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle search
  let timer: ReturnType<typeof setTimeout>;
  const handleSearch = (searchValue: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchValue(searchValue);
      setPage(0);
    }, 1000); // Adjust the debounce delay as needed (e.g., 300 milliseconds)
  };

  // Function to handle page list data
  const getOptionsList = async ({ offset, searchValue }: { offset: number; searchValue: string }) => {
    await HttpRoutingService.getMethod("product/getProductList", { offset: page * rowsPerPage, searchText: searchValue, limit: rowsPerPage, restore: isRestore })
      .then(res => {
        console.log("optionList res", res);
        setPageData(res.data.rows);
        setTotalCount(res.data.count);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("option err", err);
      });
  };

  // Function to close product modal
  const closeProductModal = () => {
    setProductModal(false);
    setSelectedProduct(null);
  };

  // initial useeffect to get page data
  useEffect(() => {
    setLoading(true);
    getOptionsList({ offset: 0, searchValue: searchValue });
  }, [searchValue, rowsPerPage, page]);

  // useEffect use to open the product modal when triggered
  useEffect(() => {
    if (selectedProduct) {
      setProductModal(true);
    }
  }, [selectedProduct]);

  return (
    <React.Fragment>
      <CommonToastContainer />
      <ComponentView>
        {/* <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} /> */}
        {isManualOrder ? <div></div> : <AddHeaderComponent title={isRestore ? "Restore List" : "Products List"} modalHeader />}

        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <div className={productListStyle.searchView}>
            <CommonSearchInput
              placeholder="Search by product name"
              onChange={event => {
                handleSearch(event.target.value), setPage(0);
                // setSearchValue(event.target.value), setPage(0);
              }}
            />
          </div>
          {isManualOrder ? (
            <IconButton sx={{ bgcolor: "purple" }} size="large" onClick={() => dispatch(updateStepper({ index: 2 }))}>
              <ArrowForward htmlColor="white" />
            </IconButton>
          ) : (
            <Link href={"add"}>
              <Button sx={{ mr: 3 }} variant="contained" color="secondary" endIcon={<Add />}>
                Create Product
              </Button>
            </Link>
          )}
        </Stack>

        {/* List section */}
        <div className={productListStyle.mainListView}>
          {/* Items table display section */}
          <TableContainer component={Paper} sx={{ mt: 2, height: 430 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              {/* Table headers */}
              <TableHead>
                <TableRow sx={{ bgcolor: "black" }}>
                  {productListHeaders.map((headerItem, index) => (
                    <TableCell sx={{ color: "white" }} align="center" key={index}>
                      {headerItem.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table contents */}
              <TableBody>
                {pageData?.map((item: productItem, index: number) => {
                  // console.log("productItem", item);
                  let defaultVariant = item.isVariants && item.variantCombinationDetails.find(variant => variant.isDefault);
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ color: "black" }} align="center">
                        {index + 1}
                      </TableCell>

                      <TableCell sx={{ color: "black" }} align="center">
                        {item.productName}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        <Switch readOnly checked={item.isVariants} />
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        ₹{defaultVariant ? defaultVariant.salesPrice : item.salesPrice}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        ₹{defaultVariant ? defaultVariant.mrpPrice : item.mrpPrice}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        ₹{defaultVariant ? defaultVariant.stock : item.stock}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        {isRestore ? (
                          <IconButton>
                            <Autorenew htmlColor="coral" />
                          </IconButton>
                        ) : isManualOrder ? (
                          <IconButton onClick={() => setSelectedProduct(item)}>{defaultVariant ? <ControlPointDuplicate htmlColor="coral" /> : <ControlPoint htmlColor="coral" />}</IconButton>
                        ) : (
                          <Stack direction={"row"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Link href={`${item.id}`}>
                              <IconButton>
                                <Edit />
                              </IconButton>
                            </Link>
                            <IconButton>
                              <Delete />
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination section */}
          <Box sx={{ bgcolor: "lightgray", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TablePagination
              sx={{ color: "inherit" }}
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </div>
      </ComponentView>

      {/* Product modal */}
      <Modal open={productModal} onClose={closeProductModal} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            height: selectedProduct?.isVariants ? 400 : 300,
            width: 700,
            position: "absolute",
            boxShadow: 24,
            p: 2,
            bgcolor: "white",
            overflowY: "scroll",
          }}>
          <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
            <Typography variant="h6" color={"black"}>
              {"Product Details"}
            </Typography>
            <IconButton onClick={() => closeProductModal()}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <ProductModal product={selectedProduct} closeFunction={() => closeProductModal()} />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ProductListComponent;
