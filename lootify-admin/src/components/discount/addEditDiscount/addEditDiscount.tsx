"use client";

import ComponentView from "@/src/shared/components/componentView/componentView";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { Box, Button, FormControl, Grid, InputLabel, Select, Stack, Switch, Typography } from "@mui/material";
import FormikInput from "@/src/shared/components/Formik/FormikInput";
import MenuItem from "@mui/material/MenuItem";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import { toast } from "react-toastify";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";

interface addEditDiscountProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

interface discount {
  promoCode: string;
  discountType: string;
  discountValue: string;
  maximumDiscountValue: string;
  minimumOrderValue: string;
  isActive: boolean;
  usageLimitPerCustomer: string;
}

const AddEditDiscount: FC<addEditDiscountProps> = ({ id, edit, add, view }) => {
  // Variable to handle editId
  const editId = id;

  // Variable to handle navigation
  const router = useRouter();

  // Vairbale to handle page loader
  const [loading, setLoading] = useState<boolean>(false);

  // Variable to handle edit discount data
  const [editDiscountValue, setEditDiscountValue] = useState<any>();

  // Variable to handle addEditProductRef
  const formRef = useRef<any>();

  // Variable to handle initial values
  let initialValues: discount = {
    discountType: "1",
    discountValue: "",
    isActive: false,
    maximumDiscountValue: "",
    minimumOrderValue: "",
    promoCode: "",
    usageLimitPerCustomer: "",
  };

  //   Variable to handle validation schema
  const validationSchema = Yup.object({});

  // Function to handle back function
  const handleBack = () => {
    router.back();
  };

  // Function to handle submit
  const handleSubmit = () => {
    let discountData = Object.assign({
      discountType: formRef.current.values.discountType == 1 ? "Percentage" : "Fixed",
      discountValue: Number(formRef.current.values.discountValue),
      isActive: formRef.current.values.isActive,
      maximumDiscountValue: Number(formRef.current.values.maximumDiscountValue),
      minimumOrderValue: Number(formRef.current.values.minimumOrderValue),
      promoCode: formRef.current.values.promoCode,
      usageLimitPerCustomer: Number(formRef.current.values.usageLimitPerCustomer),
    });
    // console.log("discountData", discountData);
    if (!editId) {
      HttpRoutingService.postMethod("discount/add", discountData)
        .then(res => {
          setTimeout(() => {
            handleBack();
          }, 1000);
          toast.success(<Typography>Discount created successfully</Typography>);
        })
        .catch(err => {
          toast.error(<Typography>Something went wrong try again</Typography>);
        });
    } else {
      HttpRoutingService.postMethod("discount/edit", Object.assign(discountData, { id: editId }))
        .then(res => {
          setTimeout(() => {
            handleBack();
          }, 1000);
          toast.success(<Typography>Discount updated successfully</Typography>);
        })
        .catch(err => {
          toast.error(<Typography>Something went wrong try again</Typography>);
        });
    }
  };

  useEffect(() => {
    if (editId) {
      HttpRoutingService.getMethod("discount/getDiscountDetails", { discountId: editId })
        .then(res => {
          // console.log("setEditAddressDetails", res.data);
          if (formRef.current) {
            formRef.current.setFieldValue("discountType", res.data.discountType == "Percentage" ? "1" : "2");
            formRef.current.setFieldValue("discountValue", res.data.discountValue);
            formRef.current.setFieldValue("isActive", res.data.isActive);
            formRef.current.setFieldValue("maximumDiscountValue", res.data.maximumDiscountValue);
            formRef.current.setFieldValue("minimumOrderValue", res.data.minimumOrderValue);
            formRef.current.setFieldValue("promoCode", res.data.promoCode);
            formRef.current.setFieldValue("usageLimitPerCustomer", res.data.usageLimitPerCustomer);
            setEditDiscountValue(res.data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <React.Fragment>
      <ComponentView>
        <CommonToastContainer />
        {/* Hader section */}
        <AddHeaderComponent
          title={`${add ? "Add" : edit ? "Edit" : "View"} Discount`}
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
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 3, width: 100 }}
                onClick={() => {
                  handleSubmit();
                }}>
                {edit ? "Update" : "Save"}
              </Button>
            </React.Fragment>
          }
        />

        <Formik innerRef={formRef} validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
          {({ values, errors, touched, isValid, dirty, resetForm, setFieldValue, enableReinitialize, handleChange, handleBlur }) => (
            <React.Fragment>
              <Grid container>
                {/* Left side view */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ ml: 2, mr: 2 }}>
                    <FormikInput label={"PromoCode"} name="promoCode" />

                    <FormikInput label={"Discount Value"} name="discountValue" />
                    <Stack direction={"row"} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mb={1}>
                      <Switch checked={values.isActive} onChange={() => setFieldValue(`isActive`, !values.isActive)} />
                      <Typography>Active</Typography>
                    </Stack>
                  </Box>
                </Grid>

                {/* Right side view */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ ml: 2, mr: 2 }}>
                    <FormControl fullWidth sx={{ "& .MuiInputLabel-root": { width: "150px" } }}>
                      <InputLabel>Type</InputLabel>
                      <Select label={"Type"} value={values.discountType} onChange={event => setFieldValue("discountType", event.target.value)}>
                        <MenuItem value={1}>Percentage</MenuItem>
                        <MenuItem value={2}>Fixed</MenuItem>
                      </Select>
                    </FormControl>
                    <FormikInput label={"Minimum Order Value"} name="minimumOrderValue" />
                    <FormikInput label={"Maximum Discount Value"} name="maximumDiscountValue" />
                    <FormikInput label={"Usage Limit Per Customer"} name="usageLimitPerCustomer" />
                  </Box>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </ComponentView>
    </React.Fragment>
  );
};

export default AddEditDiscount;
