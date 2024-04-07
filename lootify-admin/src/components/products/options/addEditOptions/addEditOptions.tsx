"use client";

import React, { FC, Fragment, useState, useEffect } from "react";
import ComponentView from "@/src/shared/components/componentView/componentView";

import { Box, Button, CircularProgress, Dialog, Divider, Grid, IconButton, InputAdornment, Modal, Stack, Typography } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { HexColorPicker } from "react-colorful";

import FormikInput from "@/src/shared/components/Formik/FormikInput";
import addEditOptionStyle from "./addEditOptions.module.scss";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { Add, Circle, Clear, Close, Delete, PanoramaFishEye, Visibility } from "@mui/icons-material";
import FormikCheckBox from "@/src/shared/components/Formik/FormikCheckoBox";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";

interface addEditOptionProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

interface optionValueInterface {
  id : number,
  value: string, color?: string | undefined, productOptionValueIdMappings?: {
    productId: number,
    product: {
      productName: string
    }
  }[]
}

interface optionData {
  name: string,
  description: string,
  showColors: boolean,
  optionsValues: optionValueInterface[]
}

const AddEditOptions: FC<addEditOptionProps> = ({ add, edit, view, id }) => {
  useRouteMenuCheck();

  const validationSchema = Yup.object({
    name: Yup.string().required("Option is required"),
    optionsValues: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required("Option value is required"),
      }),
    ),
  });

  // Function to handle edit id
  const editId = id;

  // Function to handle loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Variable to handle product mapping view
  const [visisbleMapping, setVisibleMapping] = useState<boolean>(false);

  // Variable to handle deleted optionvalue ids
  const [removedIds,setRemovedIds] = useState<number[]>([]);

  // Variable to handle selected optionValueId data
  const [selectedOptionValueId, setSelectedOptionValueId] = useState<optionValueInterface>();

  const handleSubmit = (values: any) => {
    if (edit) {
      // console.log("Values", removedIds);
      values["removeIds"] = removedIds;
      HttpRoutingService.postMethod("options/updateOption", values, { optionId: editId }).then((res) => {
        toast.success(<Typography>Option created successfully</Typography>);
        setTimeout(()=>{
          handleBack();
        },1000)
      }).catch((err) => {
        toast.error(<Typography>Something went wrong try again</Typography>);
      })
    }
    else {
      // Creating new option
      HttpRoutingService.postMethod("options/createOption", values).then((res) => {
        toast.success(<Typography>Option created successfully</Typography>);
        setTimeout(()=>{
          handleBack();
        },1000)
      }).catch((err) => {
        toast.error(<Typography>Something went wrong try again</Typography>);
      })
    }
  };



  // Variable to handle initial values
  let initialValues: optionData = { name: "", description: "", showColors: false, optionsValues: [{ value: "", color: undefined, productOptionValueIdMappings: [] }] };

  // Variable to handle current selected color picker index
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>("#00000");

  // Variable to handle navigation
  const router = useRouter();
  const path = usePathname();

  // Function to handle back function
  const handleBack = () => {
    // const currentPath = path;
    const onePathBack = path.split("/").slice(0, -1).join("/");
    router.push(onePathBack);
  };

  // useEffect for edit
  useEffect(() => {
    if (editId) {
      HttpRoutingService.getMethod("options/getOptionDetails", { optionId: editId }).then((res) => {
        console.log("edit option res", res)
        initialValues.name = res.data.optionName;
        initialValues.description = res.data.description;
        initialValues.showColors = res.data.showColors;
        initialValues.optionsValues = res.data.optionValues
        setLoading(false);
      }).catch((err: any) => {
        console.log("edit option details err", err)
      })
    }
    else {
      setLoading(false);
    }
  }, [editId])

  // if(loading && editId)
  //   {
  //    return <Box sx={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
  //       <CircularProgress color="secondary"/>
  //     </Box>
  //   }

  return (
    <React.Fragment>
      <ComponentView>
        {/* <ToastContainerWrapper /> */}
        <CommonToastContainer />

        {/* Product option mapping modal */}
        <Modal open={visisbleMapping} onClose={() => setVisibleMapping(false)}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Box sx={{
            height: 400,
            width: 500,
            position: "absolute",
            boxShadow: 24,
            p: 2,
            bgcolor: "white",
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
              width: '8px', // Adjust width as needed
              backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: '6px', // Optional for rounded corners
            },
            '&:hover > &::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa',
            },
          }}>

            <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
              <Typography variant="h6" color={"black"}>{"Product Details"}</Typography>
              <IconButton onClick={() => setVisibleMapping(false)}>
                <Close />
              </IconButton>
            </Stack>
            <Divider />

            {/* Mapped products */}
            {selectedOptionValueId?.productOptionValueIdMappings?.map((productItem, index) => {
              return <Box key={index} pt={1} pb={1}>
                <Stack direction={"row"} display={"flex"} alignItems={"center"} spacing={1}>
                  <Typography color={"black"}>{index + 1}{")"}</Typography>
                  <Typography color={"black"}>{productItem.product.productName}</Typography>
                </Stack>
                <Divider sx={{ pt: 1 }} />
              </Box>
            })}
          </Box>
        </Modal>


        <Formik validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, isValid, dirty, resetForm, setFieldValue, enableReinitialize }) => (
            // console.log("values", values),
            <Fragment>
              <AddHeaderComponent
                title={`${add ? "Add" : edit ? "Edit" : "View"} options`}
                modalHeader
                includeBackOption
                backHandler={() => {
                  handleBack();
                }}
                actionView={
                  <Fragment>
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} disabled={!dirty} onClick={() => {resetForm(),setRemovedIds([])}}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} disabled={!dirty || !isValid || Boolean(Object.keys(errors).length)} onClick={() => handleSubmit(values)}>
                      {editId ? "Update" : "Save"}
                    </Button>
                  </Fragment>
                }
              />
              <div className={addEditOptionStyle.mainContentView}>
                <Fragment>
                  {/* Left side view */}
                  <Grid container columnSpacing={10}>
                    <Grid item xs={12} sm={5}>
                      {/* <div className={addEditOptionStyle.leftView}> */}
                      <Fragment>
                        <FormikInput label="Name" name="name" required />
                        <FormikInput label="Description" name="description" multiline rows={4} />
                        <FormikCheckBox label="Show colors" name="showColors" required checked={values.showColors} />
                      </Fragment>
                      {/* </div> */}
                    </Grid>

                    {/* Right side view */}
                    <Grid item xs={12} sm={7}>
                      {/* <div className={addEditOptionStyle.rightView}> */}
                      <FieldArray name="optionsValues">
                        {({ push, remove }) => (
                          <>
                            <div className={addEditOptionStyle.horizontalEndView}>
                              <Button variant="contained" endIcon={<Add />} onClick={() => push({ value: "", color: undefined })}>
                                Add Option
                              </Button>
                            </div>

                            {/* List of added option values */}
                            {values.optionsValues.map((optionValue: optionValueInterface, optionValueIndex) => {
                              // console.log("optionValue", optionValue);
                              return (
                                <div key={optionValueIndex}>
                                  {/* Color picker section */}
                                  {selectedIndex == optionValueIndex ? (
                                    <div style={{ position: "absolute" }} className={addEditOptionStyle.colorPickerView}>
                                      <div className={addEditOptionStyle.colorPickerHeader}>
                                        <Typography>{optionValue.value}</Typography>
                                        <IconButton onClick={() => setSelectedIndex(undefined)}>
                                          <Clear />
                                        </IconButton>
                                      </div>
                                      <Divider sx={{ mb: 2 }} />
                                      <div className={addEditOptionStyle.centerView}>
                                        <HexColorPicker
                                          color={selectedColor}
                                          onChange={color => {
                                            setSelectedColor(color);
                                          }}
                                          className={addEditOptionStyle.colorPickerPadding}
                                        />
                                        <Typography sx={{ paddingTop: 2, paddingBottom: 2 }}>Selected Color : {selectedColor}</Typography>
                                        <Button
                                          color="success"
                                          variant="contained"
                                          onClick={() => {
                                            setFieldValue(`optionsValues[${optionValueIndex}].color`, selectedColor), setSelectedColor("#00000");
                                            setSelectedIndex(undefined);
                                          }}>
                                          Save Color
                                        </Button>
                                      </div>
                                    </div>
                                  ) : null}

                                  <FormikInput
                                    key={optionValueIndex}
                                    label={"Option Value"}
                                    placeholder="Enter option value"
                                    name={`optionsValues[${optionValueIndex}].value`}
                                    InputProps={{
                                      startAdornment: values.showColors ? (
                                        <InputAdornment position="start">
                                          <IconButton
                                            onClick={() => {
                                              if (optionValue.value) {
                                                setSelectedIndex(optionValueIndex), setSelectedColor(optionValue.color);
                                              } else {
                                                toast.error(<Typography>Enter value to continue</Typography>);
                                              }
                                            }}>
                                            <Circle htmlColor={optionValue.color} />
                                          </IconButton>
                                        </InputAdornment>
                                      ) : null,
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <IconButton onClick={() => {
                                            console.log("optionValue", optionValue)
                                            if (!optionValue.productOptionValueIdMappings?.length) {
                                              if(optionValue.id) {
                                                let newRemoveIds = removedIds;
                                                newRemoveIds.push(optionValue.id);
                                                setRemovedIds(newRemoveIds)
                                              }
                                              remove(optionValueIndex)
                                            }
                                            else {
                                              setSelectedOptionValueId(optionValue);
                                              setVisibleMapping(true);
                                            }
                                          }}>
                                            {optionValue.productOptionValueIdMappings?.length ? <Visibility htmlColor="grey" /> : <Delete htmlColor="grey" />}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                    defaultValue={optionValue.value}
                                    required
                                  />
                                </div>
                              );
                            })}
                          </>
                        )}
                      </FieldArray>
                      {/* </div> */}
                    </Grid>
                  </Grid>
                </Fragment>
              </div>
            </Fragment>
          )}
        </Formik>
      </ComponentView>
    </React.Fragment>
  );
};

export default AddEditOptions;
