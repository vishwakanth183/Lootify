"use client"
import React, { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import AddHeaderComponent from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import { Box, StepButton, StepIcon, Typography } from "@mui/material";
import { AddShoppingCart, CardTravel, Person, ShoppingBasket } from "@mui/icons-material";
import CustomerListComponent from "../customer/customerList";
import ProductListComponent from "../../products/allproduct/productListComponent";


const ManualOrderStepper = () => {

    // variable to handle active stepper
    const [activeStepper, setActiveStepper] = useState<number>(1);

    const steps = [
        'Customer',
        'Products',
        'Checkout',
    ];

    //   Function to generate stepper icon
    const generateStepperIcon = (label: string) => {
        if (label == "Customer") {
            return <Person htmlColor={activeStepper == 0 ? "green" : "grey"} />
        }
        else if (label == "Products") {
            return <AddShoppingCart htmlColor={activeStepper == 1 ? "green" : "grey"} />

        }
        else {
            return <ShoppingBasket htmlColor={activeStepper == 2 ? "green" : "grey"} />

        }
    }

    return (
        <React.Fragment>
            <ComponentView>
                {/* <AddHeaderComponent href={"/admin/drawermenu/products/options/new"} title={"Options List"} buttonTitle={"Add Options"} /> */}
                <AddHeaderComponent title={"Manual Order"} modalHeader />
                <React.Fragment>

                    <Stepper activeStep={activeStepper} sx={{mr:1}}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton sx={{ maxHeight: 4 }}>
                                    <StepLabel StepIconComponent={() => generateStepperIcon(label)}>
                                        <Typography fontWeight={"500"} variant="body1" color={index == activeStepper ? "green" : "grey"}>{label}</Typography>
                                    </StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Components view */}
                    <Box mt={2} p={1.5}>
                    {
                        activeStepper == 0 ?
                            <CustomerListComponent isManualOrder />
                            :
                            activeStepper == 1 ?
                            <ProductListComponent isManualOrder/>
                            : null
                            }
                    </Box>

                </React.Fragment>
            </ComponentView>

        </React.Fragment>
    )

}

export default ManualOrderStepper