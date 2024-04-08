"use client";

import ComponentView from "@/src/shared/components/componentView/componentView";
import React, { FC, useEffect, useRef, useState } from "react";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import { Box, Button, Card, Divider, Grid, IconButton, Modal, Stack, Switch, Typography } from "@mui/material";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { usePathname, useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "@/src/shared/components/Formik/FormikInput";
import FormikCheckBox from "@/src/shared/components/Formik/FormikCheckoBox";
import Image from "next/image";
import { Add, Close, Delete, RadioButtonUncheckedOutlined } from "@mui/icons-material";
import VariantSection from "./variantSection/variantSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { resetProductSlice } from "@/app/redux/slices/product/addEditProductSlice";

interface addEditProductProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

export interface variantCombinationDetails {
  isDefault: boolean;
  combinationName: string;
  optionValueIds: number[];
  mrpPrice: number;
  salesPrice: number;
  actualPrice: number;
  stock: number;
  imgurl: string;
}

interface productItem {
  productName: string;
  imgUrl: string;
  mrpPrice?: number;
  salesPrice?: number;
  actualPrice?: number;
  isVariants: false;
  stock?: number;
  variantCombinationDetails: variantCombinationDetails[];
}

const AddEditProduct: FC<addEditProductProps> = ({ add, edit, id }) => {
  // Variable to handle navigation
  const router = useRouter();

  // Variable to handle addEditProductRef
  const formRef = useRef();

  // Redux utilities
  const dispatch = useDispatch<AppDispatch>();
  const addEditProductSlice = useSelector((state: RootState) => state.addEditProductSlice);

  //   Variable to handle variant modal
  const [openVariantModal, setOpenVariantModal] = useState<boolean>(false);

  // Function to handle back function
  const handleBack = () => {
    router.back();
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Option is required"),
    // actualPrice: Yup.number()
    //   .when("isVariants", {
    //     is: true,
    //     then: Yup.number().required("This field is required"),
    //   })
    //   .when("isVariants", {
    //     is: false,
    //     then: Yup.number(), // Allow empty value for actualPrice if not variants
    //   }),
    variantCombinationDetails: Yup.array().of(
      Yup.object().shape({
        mrpPrice: Yup.number().required("This field is required"),
        salesPrice: Yup.number().required("This field is required"),
        actualPrice: Yup.number().required("This field is required"),
        stock: Yup.number().required("This field is required"),
      }),
    ),
  });

  // Variable to handle initial values
  let initialValues: productItem = { productName: "", isVariants: false, imgUrl: "", variantCombinationDetails: [] };

  // Function to handle submit
  const handleSubmit = () => {
    console.log("addProduct", formRef?.current?.values);
  }

  useEffect(() => {
    console.log("formRef", formRef?.current?.setFieldValue("variantCombinationDetails", addEditProductSlice.selectedVariantCombinations))
  }, [addEditProductSlice.selectedVariantCombinations])

  // To reset slice on initial page load
  useEffect(() => {
    dispatch(resetProductSlice());
  }, [])

  return (
    <React.Fragment>
      <ComponentView>
        {/* <ToastContainerWrapper /> */}
        <CommonToastContainer />

        <Formik innerRef={formRef} validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => { }}>
          {({ values, errors, touched, isValid, dirty, resetForm, setFieldValue, enableReinitialize, handleChange, handleBlur }) => (
            // console.log("values", values),
            <React.Fragment>
              {/* {console.log("values.variantCombinationDetails",values.variantCombinationDetails)}, */}
              <AddHeaderComponent
                title={`${add ? "Add" : edit ? "Edit" : "View"} Product`}
                modalHeader
                includeBackOption
                backHandler={() => {
                  handleBack();
                }}
                actionView={
                  <React.Fragment>
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} onClick={() => handleSubmit()}>
                      {edit ? "Update" : "Save"}
                    </Button>
                  </React.Fragment>
                }
              />

              <Grid container columnSpacing={10} pl={5} height={600} pb={20} overflow={"scroll"}>
                {/* Left side view */}
                <Grid item xs={12} md={6}>
                  <FormikInput label="Product Name" name="productName" required />
                  {/* Product image */}
                  <Image src="/images/no-image.jpg" alt={"product image"} width={150} height={150} />
                  <Box>
                    <FormikCheckBox label="Variants" name="isVariants" checked={values.isVariants} />
                  </Box>
                </Grid>

                {/* Right side view */}
                <Grid item xs={12} md={6}>
                  {!values.isVariants ? (
                    //   Without variant view
                    <Box mr={2}>
                      <FormikInput label="Image URL" name="imgUrl" />
                      <FormikInput label="Actual Price" required name="actualPrice" />
                      <FormikInput label="MRP Price" required name="mrpPrice" />
                      <FormikInput label="Sales Price" required name="salesPrice" />
                      <FormikInput label="Stock" required name="stock" />
                    </Box>
                  ) : (
                    //   With variant view
                    <Box>
                      <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <Button sx={{ mr: 3 }} variant="contained" color="success" endIcon={<Add />} onClick={() => setOpenVariantModal(true)}>
                          Create Variants
                        </Button>
                      </Box>
                      {/* {values.variantCombinationDetails.map((variant, index) => {
                        return (
                          <Box>
                            <FormikInput label="Image URL" name="imgUrl" />
                            <FormikInput label="Actual Price" required name="actualPrice" />
                            <FormikInput label="MRP Price" required name="mrpPrice" />+
                            <FormikInput label="Sales Price" required name="salesPrice" />
                            <FormikInput label="Stock" required name="stock" />
                          </Box>
                        );
                      })} */}


                      {values.variantCombinationDetails.map((variant, index) => {
                        return (
                          <Box key={index}>
                            <Card sx={{ mt: 2, mr: 2, p: 2 }}>
                              {/* Card header */}
                              <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography variant="h6" color={"coral"}>
                                  {variant.combinationName}
                                </Typography>
                                <Box display={"flex"} flexDirection={"row"}>
                                  <IconButton>
                                    <Delete />
                                  </IconButton>
                                  {/* <IconButton>
                                    <RadioButtonUncheckedOutlined />
                                  </IconButton> */}
                                </Box>
                              </Stack>
                              <Divider />
                              {/* Defualt section */}
                              <Stack direction={"row"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Switch onChange={() => setFieldValue(`variantCombinationDetails[${index}].isDefault`, !variant.isDefault)} />
                                <Typography>Default</Typography>
                              </Stack>
                              {/* Input section */}
                              <FormikInput label="Image URL" name={`variantCombinationDetails[${index}].imgUrl`} />
                              <FormikInput label="Actual Price" required name={`variantCombinationDetails[${index}].actualPrice`} />
                              <FormikInput label="MRP Price" required name={`variantCombinationDetails[${index}].mrpPrice`} />
                              <FormikInput label="Sales Price" required name={`variantCombinationDetails[${index}].salesPrice`} />
                              <FormikInput label="Stock" required name={`variantCombinationDetails[${index}].stock`} />
                            </Card>
                          </Box>
                          //   <Box>
                          //     <FormikInput label="Image URL" name="imgUrl" />
                          //     <FormikInput label="Actual Price" required name="actualPrice" />
                          //     <FormikInput label="MRP Price" required name="mrpPrice" />+
                          //     <FormikInput label="Sales Price" required name="salesPrice" />
                          //     <FormikInput label="Stock" required name="stock" />
                          //   </Box>
                        );
                      })}
                    </Box>
                  )}
                </Grid>
              </Grid>

              {/* Option combination modal */}
              <Modal open={openVariantModal} onClose={() => setOpenVariantModal(false)} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                  sx={{
                    height: 500,
                    width: 700,
                    position: "absolute",
                    boxShadow: 24,
                    p: 2,
                    bgcolor: "white",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "8px", // Adjust width as needed
                      backgroundColor: "#F5F5F5",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#ccc",
                      borderRadius: "6px", // Optional for rounded corners
                    },
                    "&:hover > &::-webkit-scrollbar-thumb": {
                      backgroundColor: "#aaa",
                    },
                  }}>
                  <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
                    <Typography variant="h6" color={"black"}>
                      {"Variants"}
                    </Typography>
                    <IconButton onClick={() => setOpenVariantModal(false)}>
                      <Close />
                    </IconButton>
                  </Stack>
                  <Divider />

                  {/* Variant section view */}
                  <VariantSection />
                </Box>
              </Modal>
            </React.Fragment>
          )}
        </Formik>
      </ComponentView>
    </React.Fragment>
  );
};

export default AddEditProduct;
