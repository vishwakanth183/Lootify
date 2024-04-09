"use client";

import ComponentView from "@/src/shared/components/componentView/componentView";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { Box, Button, Card, CircularProgress, Divider, Grid, IconButton, Stack, Switch, Typography } from "@mui/material";
import FormikInput from "@/src/shared/components/Formik/FormikInput";
import { Add, Delete } from "@mui/icons-material";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import { toast } from "react-toastify";

interface addEditCustomerProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

interface address {
  id?: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  mobileNumber: string;
  landmark: string;
  addressType: string;
}

interface customer {
  customerName: string;
  email: string;
  mobileNumber: string;
  addressDetails: address[];
}

const AddEditCustomer: FC<addEditCustomerProps> = ({ id, edit, add, view }) => {
  // Variable to handle editId
  const editId = id;

  // Variable to handle navigation
  const router = useRouter();

  // Vairbale to handle page loader
  const [loading, setLoading] = useState<boolean>(false);

  // Variable to handle editAddress api details
  const [editAddressDetails, setEditAddressDetails] = useState<any>({});

  // Variable to handle addEditProductRef
  const formRef = useRef<any>();

  // Variable to handle initial values
  let initialValues: customer = {
    customerName: "",
    email: "",
    mobileNumber: "",
    addressDetails: [],
  };

  //   Variable to handle validation schema
  const validationSchema = Yup.object({});

  // Function to handle back function
  const handleBack = () => {
    router.back();
  };

  // Function to handle submit
  const handleSubmit = () => {
    console.log("formRef", formRef.current.values);
    if (!editId) {
      HttpRoutingService.postMethod("customer/add", formRef.current.values)
        .then(res => {
          setTimeout(() => {
            handleBack();
          }, 1000);
          toast.success(<Typography>Customer created successfully</Typography>);
        })
        .catch(err => {
          toast.error(<Typography>Something went wrong try again</Typography>);
        });
    } else {
      HttpRoutingService.postMethod("customer/edit", Object.assign(formRef.current.values, { id: editId }))
        .then(res => {
          setTimeout(() => {
            handleBack();
          }, 1000);
          toast.success(<Typography>Customer updated successfully</Typography>);
        })
        .catch(err => {
          toast.error(<Typography>Something went wrong try again</Typography>);
        });
    }
  };

  //useEffect
  useEffect(() => {
    if (editId) {
      HttpRoutingService.getMethod("customer/getCustomerDetails", { customerId: editId })
        .then(res => {
          // console.log("setEditAddressDetails", res.data);
          if (formRef.current) {
            formRef.current.setFieldValue("customerName", res.data.customerName);
            formRef.current.setFieldValue("email", res.data.email);
            formRef.current.setFieldValue("mobileNumber", res.data.mobileNumber);
            formRef.current.setFieldValue("addressDetails", res.data.customerAddresses);
            setEditAddressDetails(res.data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setLoading(false);
    }
  }, [editId]);

  // if (editId && Object.keys(editAddressDetails).length) {
  //   return (
  //     <Box height={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <React.Fragment>
      <ComponentView>
        {/* Hader section */}
        <CommonToastContainer />
        <AddHeaderComponent
          title={`${add ? "Add" : edit ? "Edit" : "View"} Customer`}
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

        <Formik
          innerRef={formRef}
          validateOnMount
          initialValues={
            true
              ? initialValues
              : {
                  customerName: editAddressDetails.customerName,
                  email: editAddressDetails.email,
                  mobileNumber: editAddressDetails.mobileNumber,
                  addressDetails: editAddressDetails.addressDetails,
                }
          }
          validationSchema={validationSchema}
          onSubmit={() => {
            handleSubmit();
          }}>
          {({ values, errors, touched, isValid, dirty, resetForm, setFieldValue, enableReinitialize, handleChange, handleBlur }) => (
            <React.Fragment>
              <Grid container columnSpacing={10} pl={5} height={600} pb={20} overflow={"scroll"}>
                {/* Left side view */}
                <Grid item xs={12} md={6}>
                  <FormikInput name="customerName" label={"Customer Name"} required />
                  <FormikInput name="email" label={"Email"} required />
                  <FormikInput name="mobileNumber" label={"Contact Number"} required />
                </Grid>

                {/* Right side view */}
                <Grid item xs={12} md={6}>
                  <FieldArray name="addressDetails">
                    {({ push, remove }) => (
                      <>
                        <Box display={"flex"} flexDirection={"column"} mr={2}>
                          {/* Address add section */}
                          <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button
                              variant="contained"
                              endIcon={<Add />}
                              onClick={() =>
                                push({
                                  addressLine1: "",
                                  addressLine2: "",
                                  city: "",
                                  state: "",
                                  country: "",
                                  zipCode: "",
                                  mobileNumber: "",
                                  landmark: "",
                                  addressType: "",
                                })
                              }>
                              Add Address
                            </Button>
                          </Box>

                          {/* Address list section */}
                          {values.addressDetails.map((address: any, index: number) => {
                            return (
                              <Card key={index} elevation={6} sx={{ p: 2, mt: 2, mb: 2 }}>
                                {/* Card header */}
                                <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                  <Typography variant="h6" color={"coral"}>
                                    {`Address ${index + 1}`}
                                  </Typography>
                                  <Box display={"flex"} flexDirection={"row"}>
                                    <IconButton onClick={() => remove(index)}>
                                      <Delete />
                                    </IconButton>
                                  </Box>
                                </Stack>

                                <Divider />

                                <Stack direction={"row"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                  <Switch checked />
                                  <Typography>Default</Typography>
                                </Stack>

                                <FormikInput label="AddressLine1" name={`addressDetails[${index}].addressLine1`} required />
                                <FormikInput label="AddressLine2" name={`addressDetails[${index}].addressLine2`} required />
                                <FormikInput label="City" name={`addressDetails[${index}].city`} required />
                                <FormikInput label="State" name={`addressDetails[${index}].state`} required />
                                <FormikInput label="Country" name={`addressDetails[${index}].country`} required />
                                <FormikInput label="ZipCode" name={`addressDetails[${index}].zipCode`} required />
                                <FormikInput label="MobileNumber" name={`addressDetails[${index}].mobileNumber`} required />
                                <FormikInput label="Landmark" name={`addressDetails[${index}].landmark`} required />
                                <FormikInput label="AddressType" name={`addressDetails[${index}].addressType`} required />
                              </Card>
                            );
                          })}
                        </Box>
                      </>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </ComponentView>
    </React.Fragment>
  );
};

export default AddEditCustomer;
