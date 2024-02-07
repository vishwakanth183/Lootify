"use client";

import React, { FC, Fragment, useState } from "react";
import ComponentView from "@/src/shared/components/componentView/componentView";

import { Button, Dialog, Divider, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { HexColorPicker } from "react-colorful";

import FormikInput from "@/src/shared/components/Formik/FormikInput";
import addEditOptionStyle from "./addEditOptions.module.scss";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { Add, Circle, Clear, Delete } from "@mui/icons-material";
import FormikCheckBox from "@/src/shared/components/Formik/FormikCheckoBox";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import { usePathname, useRouter } from "next/navigation";

interface addEditOptionProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

interface optionValueInterface {
  value: String;
  color: string | undefined;
}

const AddEditOptions: FC<addEditOptionProps> = ({ add, edit, view, id }) => {
  useRouteMenuCheck();

  const validationSchema = Yup.object({
    name: Yup.string().required("Option is required"),
    optionValues: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required("Option value is required"),
      }),
    ),
  });

  const handleSubmit = (values: any) => {
    console.log("Values", values);
  };

  // Variable to handle initial values
  let initialValues = { name: "", description: "", showColors: false, optionValues: [] };

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

  return (
    <React.Fragment>
      <ComponentView>
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
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} disabled={!dirty} onClick={() => resetForm()}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} disabled={!dirty || !isValid || Boolean(Object.keys(errors).length)} onClick={() => handleSubmit(values)}>
                      Save
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
                      <FieldArray name="optionValues">
                        {({ push, remove }) => (
                          <>
                            <div className={addEditOptionStyle.horizontalEndView}>
                              <Button variant="contained" endIcon={<Add />} onClick={() => push({ value: "", color: undefined })}>
                                Add Option
                              </Button>
                            </div>

                            {/* List of added option values */}
                            {values.optionValues.map((optionValue: optionValueInterface, optionValueIndex) => {
                              // console.log("optionValue", optionValue);
                              return (
                                <div>
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
                                            setFieldValue(`optionValues[${optionValueIndex}].color`, selectedColor), setSelectedColor("#00000");
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
                                    name={`optionValues[${optionValueIndex}].value`}
                                    InputProps={{
                                      startAdornment: values.showColors ? (
                                        <InputAdornment position="start">
                                          <IconButton
                                            onClick={() => {
                                              setSelectedIndex(optionValueIndex), setSelectedColor(optionValue.color);
                                            }}>
                                            <Circle htmlColor={optionValue.color} />
                                          </IconButton>
                                        </InputAdornment>
                                      ) : null,
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <IconButton onClick={() => remove(optionValueIndex)}>
                                            <Delete htmlColor="grey" />
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
