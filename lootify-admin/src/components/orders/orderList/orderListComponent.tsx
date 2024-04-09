"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
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

import "./../../../shared/scss/appbar.scss";
import orderList from "./orderListComponent.module.scss";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import CommonSearchInput from "@/src/shared/components/search/commonSearchInput";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Add, Autorenew, Delete, Edit, HdrPlus } from "@mui/icons-material";
import moment from "moment";
import Link from "next/link";

interface orderItem {
  id: number;
  orderStatus: string;
  shippingType: string;
  subTotal: number;
  discountAmount: number;
  tax: number;
  shippingFee: number;
  deliveryFee: number;
  total: number;
  isCancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
  customerId: 1;
}

const OrderListComponent: FC<{}> = () => {
  // Variable to handle loading value
  const [loading, setLoading] = useState<boolean>(false);

  // Variable to handle page number in pagination
  const [page, setPage] = useState<number>(0);

  // Variable to handle page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Variable to handle page searchValue
  const [searchValue, setSearchValue] = useState<string>("");

  // Variable to handle page data
  const [pageData, setPageData] = useState<orderItem[]>();

  // Variable to handle total data count
  const [totalCount, setTotalCount] = useState<number>(0);

  // Variable to handle page table headers
  const orderListHeader: { headerName: string }[] = [
    {
      headerName: "S.No",
    },
    {
      headerName: "OrderId",
    },
    {
      headerName: "Status",
    },
    {
      headerName: "Total",
    },
    {
      headerName: "Discount",
    },
    {
      headerName: "Ordered Date",
    },
    {
      headerName: "Actions",
    },
  ];

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
    await HttpRoutingService.getMethod("order/getOrderList", { offset: page * rowsPerPage, searchText: searchValue, limit: rowsPerPage })
      .then(res => {
        setPageData(res.data.rows);
        setTotalCount(res.data.count);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("option err", err);
      });
  };

  // Function to handle date format
  const formatDate = useMemo(
    () => (currentDate: Date) => {
      if (currentDate) {
        // const formattedDate = currentDate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" });
        return moment(currentDate).format("MMMM D, YYYY");
      }
      return null;
    },
    [pageData],
  );

  // initial useeffect to get page data
  useEffect(() => {
    setLoading(true);
    getOptionsList({ offset: 0, searchValue: searchValue });
  }, [searchValue, rowsPerPage, page]);

  return (
    <React.Fragment>
      <ComponentView>
        {/* <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} /> */}
        <AddHeaderComponent title={"Order List"} modalHeader />
        <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mr={3}>
          {/* search view */}
          <div className={orderList.searchView}>
            <CommonSearchInput
              placeholder="Search by order id"
              onChange={event => {
                handleSearch(event.target.value), setPage(0);
                // setSearchValue(event.target.value), setPage(0);
              }}
            />
          </div>

          {/* Manual order button */}
          <Link href={"manualOrder"}>
            <Button variant="contained" color="secondary" endIcon={<Add />}>
              Create Order
            </Button>
          </Link>
        </Stack>

        {/* List section */}
        <div className={orderList.mainListView}>
          {/* Items table display section */}
          <TableContainer component={Paper} sx={{ mt: 2, height: 430 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              {/* Table headers */}
              <TableHead>
                <TableRow sx={{ bgcolor: "black" }}>
                  {orderListHeader.map((headerItem, index) => (
                    <TableCell sx={{ color: "white" }} align="center" key={index}>
                      {headerItem.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table contents */}
              <TableBody>
                {pageData?.map((item: orderItem, index: number) => {
                  // console.log("orderItem", item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell sx={{ color: "black" }} align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        #{item.id}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        <Chip
                          sx={{ width: 100 }}
                          label={item.orderStatus}
                          color={item.orderStatus == "Ordered" ? "primary" : item.orderStatus == "Processing" ? "warning" : item.orderStatus == "Delivered" ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        {item.total}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        {item.discountAmount}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        <Stack direction={"row"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                          <IconButton>
                            <Edit />
                          </IconButton>
                          <IconButton>
                            <Delete />
                          </IconButton>
                        </Stack>
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
    </React.Fragment>
  );
};

export default OrderListComponent;
