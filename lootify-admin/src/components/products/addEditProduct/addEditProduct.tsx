"use client"

import ComponentView from "@/src/shared/components/componentView/componentView";
import React, { FC } from "react";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import { Button, Grid } from "@mui/material";
import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import { usePathname, useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "@/src/shared/components/Formik/FormikInput";
import FormikCheckBox from "@/src/shared/components/Formik/FormikCheckoBox";



interface addEditProductProps {
    add?: boolean;
    edit?: boolean;
    view?: boolean;
    id?: string;
}

interface variantCombinationDetails {
    isDefault: boolean,
    combinationName: string,
    optionValueIds: number[],
    mrpPrice: number,
    salesPrice: number,
    actualPrice: number,
    stock: number,
    imgurl: string
}

interface productItem {
    productName: string,
    imgUrl: string,
    mrpPrice: number,
    salesPrice: number,
    actualPrice: number,
    isVariants: false,
    stock: number,
    variantCombinationDetails: variantCombinationDetails[]
}

const AddEditProduct: FC<addEditProductProps> = ({ add, edit, id }) => {

    // Variable to handle navigation
    const router = useRouter();
    const path = usePathname();

    // Function to handle back function
    const handleBack = () => {
        // const currentPath = path;
        // const onePathBack = path.split("/").slice(0, -1).join("/");
        // router.push(onePathBack);
        router.back();
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required("Option is required"),
        actualPrice: Yup.number()
            .when('isVariants', {
                is: true,
                then: Yup.number().required("This field is required"),
            })
            .when('isVariants', {
                is: false,
                then: Yup.number() // Allow empty value for actualPrice if not variants
            }),
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
    let initialValues: productItem = { productName: "", isVariants: false, actualPrice: 0.00, mrpPrice: 0.00, salesPrice: 0.00, imgUrl: "", stock: 0.00, variantCombinationDetails: [] };

    return <React.Fragment>
        <ComponentView>
            {/* <ToastContainerWrapper /> */}
            <CommonToastContainer />

            <Formik validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => { }}>
                {({ values, errors, touched, isValid, dirty, resetForm, setFieldValue, enableReinitialize }) => (
                    // console.log("values", values),
                    <React.Fragment>

                        <AddHeaderComponent
                            title={`${add ? "Add" : edit ? "Edit" : "View"} Product`}
                            modalHeader
                            includeBackOption
                            backHandler={() => {
                                handleBack();
                            }}
                            actionView={
                                <React.Fragment>
                                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }} >
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" sx={{ ml: 3, width: 100 }}>
                                        {edit ? "Update" : "Save"}
                                    </Button>
                                </React.Fragment>
                            }
                        />

                        <Grid container columnSpacing={10}>
                            {/* Left side view */}
                            <Grid item xs={12} sm={5} ml={3}>
                                <FormikInput label="Product Name" name="productName" required />
                                <FormikCheckBox label="Variants" name="isVariants" required checked={values.isVariants} />
                            </Grid>

                            {/* Right side view */}
                            <Grid item xs={12} sm={7}>
                            </Grid>
                        </Grid>


                    </React.Fragment>
                )}
            </Formik>


        </ComponentView>
    </React.Fragment>
}

export default AddEditProduct;