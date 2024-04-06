import { AppDispatch, RootState } from "@/app/redux/store";
import { productItem } from "@/src/components/products/allproduct/productListComponent";
import { Add, Remove } from "@mui/icons-material";
import { Grid, Stack, Typography, Card, Box, IconButton, Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {

    // Variable to handle dispatch
    const dispatch = useDispatch<AppDispatch>();

    // Variable to store maunal order data
    const manualOrderSlice = useSelector((state: RootState) => state.manualOrderSlice);

    return (
        <Grid container sx={{ overflowY: "scroll" }}>

            {/* Cart list item */}
            <Grid item sm={12} md={12} lg={6} height={500}>
                {
                    manualOrderSlice.cartProducts.map((cartItem: any, index: any) => {
                        return <Card key={index} sx={{ mt: 3, pr: 3 }} elevation={6}>
                            <Stack direction={"row"} mt={0}>

                                {/* image section */}
                                <Image
                                    src="/images/no-image.jpg"
                                    alt={cartItem?.productName + "image"}
                                    width={140}
                                    height={140}
                                />

                                {/* Product details section */}
                                <Stack display={"flex"} direction={"row"} justifyContent={"space-between"} spacing={1} width={"100%"} pt={3} pl={2}>
                                    <Box>
                                        <Typography color={"purple"}>{cartItem?.productName}</Typography>
                                        {cartItem.variantId && <Typography variant="body2" color={"black"}>({cartItem?.combinationName})</Typography>}
                                        {/* Quantity section */}
                                        <Stack direction={"row"} display={"flex"} alignItems={"center"} spacing={2} mt={2} mb={2}>
                                            <IconButton sx={{ bgcolor: "lightgrey" }}>
                                                <Remove fontSize="small" />
                                            </IconButton>
                                            <Typography color={"black"}>{cartItem?.quantity}</Typography>
                                            <IconButton sx={{ bgcolor: "lightgrey" }}>
                                                <Add fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                    <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography color={"black"}>₹{cartItem?.salesPrice}</Typography>
                                        <Button variant="contained" sx={{mb:2}} color="error">
                                            REMOVE
                                        </Button>
                                    </Stack>
                                </Stack>


                            </Stack>
                        </Card>
                    })
                }

            </Grid>

            {/* Checkout section */}
            <Grid item sm={12} md={12} lg={6}>


            </Grid>

        </Grid>
    )
}

export default Checkout;