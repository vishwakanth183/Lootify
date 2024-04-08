import React, { useState, useEffect, FC, useMemo } from "react";
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Modal, Stack, TablePagination, Typography } from "@mui/material";
import variantSectionStyle from "./variantSection.module.scss";
import CommonSearchInput from "@/src/shared/components/search/commonSearchInput";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import CheckBox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { changeSelectedCombination, changeSelectedOption } from "@/app/redux/slices/product/addEditProductSlice";
import { comboItem, optionCombo } from "./generateCombo";

interface optionItem {
  id: number;
  optionName: String;
  showColors: boolean;
  optionValues: { id: number; value: string }[];
  productOptionMappings: { productId: number }[];
}

const VariantSection: FC<{}> = () => {
  // Redux utilities
  const dispatch = useDispatch<AppDispatch>();
  const addEditProductSlice = useSelector((state: RootState) => state.addEditProductSlice);

  // Variable to handle loading value
  const [loading, setLoading] = useState<boolean>(false);

  // Variable to handle page number in pagination
  const [page, setPage] = useState<number>(0);

  // Variable to handle page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Variable to handle page searchValue
  const [searchValue, setSearchValue] = useState<string>("");

  // Variable to handle page data
  const [pageData, setPageData] = useState<optionItem[]>();

  // Variable to handle total data count
  const [totalCount, setTotalCount] = useState<number>(0);

  // Function to handle search
  let timer: ReturnType<typeof setTimeout>;
  const handleSearch = (searchValue: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchValue(searchValue);
      setPage(0);
    }, 1000); // Adjust the debounce delay as needed (e.g., 300 milliseconds)
  };

  // Function to handle change page pagination
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Function to handle change row pagination
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle selected option or not
  const isSelectedOption = (optionId: number) => {
    let selected = addEditProductSlice.selectedOptions.find(item => item.id == optionId);
    return selected ? true : false;
  };

  // Function to handle selected combination or not
  const isSelectedCombination = (combo: any) => {
    // console.log("combo", combo);
    let currentCombinationIds = combo?.map((item: any) => item.id);
    // console.log("drr", addEditProductSlice.selectedVariantCombinations);
    let selected = addEditProductSlice.selectedVariantCombinations.find(item => {
      // console.log("currentCombinationIds", JSON.stringify(currentCombinationIds) == JSON.stringify(item.optionValueIds));
      return JSON.stringify(item.optionValueIds) == JSON.stringify(currentCombinationIds);
    });
    return selected ? true : false;
    // return false;
  };

  // Function to handle tapped option
  const onOptionTap = (optionItem: optionItem) => {
    dispatch(changeSelectedOption(optionItem));
  };

  // Function to handle tapped combination
  const onCombinationTap = (comboItem: comboItem[]) => {
    let newCombination = {
      isDefault: false,
      combinationName: createCombinationName(comboItem),
      optionValueIds: comboItem.map(item => item?.id),
      mrpPrice: 0,
      salesPrice: 0,
      actualPrice: 0,
      stock: 0,
      imgurl: "",
    };

    // console.log("newCombination", newCombination);
    dispatch(changeSelectedCombination(newCombination));
  };

  // Function to handle combination generation based on option
  const generatedCombination = useMemo(() => {
    return optionCombo(addEditProductSlice.selectedOptions);
  }, [addEditProductSlice.selectedOptions]);

  // Function to generate combinatio name
  const createCombinationName = (comboItem: comboItem[]) => {
    let combinationName = [];
    // console.log("comboItem", comboItem);
    comboItem.map(combo => {
      combinationName.push(combo.value);
    });
    return combinationName.join(",");
  };

  // Function to handle page list data
  const getOptionsList = async ({ offset, searchValue }: { offset?: number; searchValue: string }) => {
    await HttpRoutingService.getMethod("options/getOptionsList", { offset: page * rowsPerPage, searchText: searchValue, limit: rowsPerPage })
      .then(res => {
        // console.log("optionList res", res);
        setPageData(res.data.rows);
        setTotalCount(res.data.count);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("option err", err);
      });
  };

  // initial useeffect to get page data
  useEffect(() => {
    setLoading(true);
    getOptionsList({ offset: 0, searchValue: searchValue });
  }, [searchValue, rowsPerPage, page]);

  return (
    <Box>
      <Grid container>
        <Grid item sm={12} md={6}>
          {/* search view */}
          <div className={variantSectionStyle.searchView}>
            <CommonSearchInput
              placeholder="Search by option name"
              onChange={event => {
                handleSearch(event.target.value), setPage(0);
                // setSearchValue(event.target.value), setPage(0);
              }}
              sx={{ mb: 2, mt: 2 }}
            />
          </div>

          {loading ? (
            <Box minHeight={200} display={"flex"} alignItems={"center"} justifyContent={"center"}>
              <CircularProgress />
            </Box>
          ) : (
            <Box minHeight={250}>
              {pageData?.length ? (
                pageData.map((item, index) => {
                  return (
                    <Stack key={index} direction={"row"} spacing={1} mb={1} display={"flex"} alignItems={"center"}>
                      <CheckBox checked={isSelectedOption(item.id)} onChange={() => onOptionTap(item)} />
                      <Typography color={"black"}>{item.optionName}</Typography>
                    </Stack>
                  );
                })
              ) : (
                <Box minHeight={200} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  <Typography>No records found</Typography>
                </Box>
              )}
            </Box>
          )}

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
        </Grid>
        <Grid item sm={12} md={6}>
          <Box display={"flex"} flexDirection={"row"} mt={2} ml={2}>
            <Divider orientation="vertical" sx={{ height: 400 }} />
            <Box ml={2} sx={{ width: "100%" }}>
              <Typography variant="h6" color={"purple"}>
                VariantCombinations
              </Typography>

              {/* List of combinations */}
              {generatedCombination.length ? (
                generatedCombination.map((combo: any, index: number) => {
                  return (
                    <Stack key={index} direction={"row"} display={"flex"} alignItems={"center"}>
                      <CheckBox checked={isSelectedCombination(combo)} onChange={() => onCombinationTap(combo)} />
                      <Typography color={"black"}>{createCombinationName(combo)}</Typography>
                    </Stack>
                  );
                })
              ) : (
                <Box minHeight={200} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  <Typography>Select options to create combinations</Typography>
                </Box>
              )}
              <Divider />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VariantSection;
