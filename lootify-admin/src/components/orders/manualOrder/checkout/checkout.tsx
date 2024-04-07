"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";

import { AppDispatch, RootState } from "@/app/redux/store";
import { productItem } from "@/src/components/products/allproduct/productListComponent";
import { Add, RadioButtonCheckedOutlined, RadioButtonUnchecked, Remove } from "@mui/icons-material";
import { Grid, Stack, Typography, Card, Box, IconButton, Button, Divider, TextField, Backdrop, Modal } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import OrderAnimation from './order-animation.json'
import Link from "next/link";
import { resetManualOrder } from "@/app/redux/slices/order/manualOrder";

interface discountDetails {
    id: number,
    promoCode: string,
    discountType: string,
    discountValue: number,
    maxumumDiscountValue: number,
    minimumOrderValue: number,
    isActive: true,
}
interface orderedProduct {
    id: number,
    productName: String,
    isVariants: boolean,
    variantId : number,
    salesPrice: number,
    combinationName: string,
    quantity: number
}

interface orderData{
        customerId : number,
        discountId : number | null,
        shippingType : string,
        subTotal : number,
        discountAmount : number,
        tax : number,
        deliveryFee : number,
        shippingFee : string,
        total : number,
        orderedProducts : orderedProduct[]
}

const Checkout = () => {

    // Variable to handle dispatch
    const dispatch = useDispatch<AppDispatch>();

    // Coupon field ref
    const couponField = useRef();

    // Variable to handle order confirmation
    const [orderConfirmation, setOrderConfirmation] = useState<boolean>(false);

    // Variable to handle applied discount
    const [appliedDiscount, setAppliedDiscount] = useState<discountDetails>();

    // Variable to store maunal order data
    const manualOrderSlice = useSelector((state: RootState) => state.manualOrderSlice);

    // Variable to handle shipping type
    const shippingTypeList = [
        { shippinType: "Free", shippingFee: 0 },
        { shippinType: "Standard Shipping", shippingFee: 100, isDefault: true },
        { shippinType: "Expedited Shipping", shippingFee: 200 },
        { shippinType: "Overnight Shipping", shippingFee: 300 },
    ]

   

    // Function to get order amount details
    const orderAmountDetails = useMemo(() => {
        let details = {
            subTotal: 0,
            discount: 0,
            tax: 0,
            delivery: 0,
            shipping: 0,
            total: 0
        }

        manualOrderSlice.cartProducts.map((item) => {
            details.subTotal += Number(item.salesPrice) * item.quantity,
                details.total += Number(item.salesPrice) * item.quantity
        });

        if (appliedDiscount) {
            if (appliedDiscount.discountType == "percentage") {
                const orderDiscountValue = details.subTotal * (appliedDiscount.discountValue / 100);
                // console.log("orderDiscountValue",orderDiscountValue,appliedDiscount)
                if (orderDiscountValue < appliedDiscount.maxumumDiscountValue) {
                    details.discount = appliedDiscount.maxumumDiscountValue;
                    details.total -= appliedDiscount.maxumumDiscountValue;
                }
                else {
                    details.discount = orderDiscountValue;
                    details.total -= orderDiscountValue;
                }
            }
            else {
                details.discount = appliedDiscount.discountValue;
                details.total -= appliedDiscount.discountValue;
            }
        }
        return details
    }, [manualOrderSlice, appliedDiscount])

    // Function apply discount
    const applyDiscount = (promoCode: string) => {
        HttpRoutingService.postMethod("order/applyCoupon", { promoCode: promoCode }).then((res) => {
            // console.log("discount res", res);
            let discountDetails: discountDetails = {
                discountType: res.data.discountType,
                discountValue: res.data.discountValue,
                id: res.data.id,
                isActive: res.data.isActive,
                maxumumDiscountValue: res.data.maxumumDiscountValue,
                minimumOrderValue: res.data.minimumOrderValue,
                promoCode: res.data.promoCode
            }
            if (orderAmountDetails.total >= discountDetails.minimumOrderValue || !discountDetails.minimumOrderValue) {
                toast.success(<Typography>Discount applied successfully</Typography>);
                setAppliedDiscount(res.data);
            }
            else {
                toast.error(<Typography>To apply this discount miniumun order value should be above ₹{discountDetails.minimumOrderValue}</Typography>);
            }
        }).catch((err) => {
            toast.error(<Typography>{err?.response?.data?.error}</Typography>);
        })
    }

     // Function to place order
     const placeOrder = async() =>{
        let orderData : orderData = {
            customerId : manualOrderSlice.selectedCustomer?.id,
            deliveryFee : orderAmountDetails.delivery,
            discountAmount : orderAmountDetails.discount,
            discountId : appliedDiscount?.id,
            orderedProducts : manualOrderSlice.cartProducts,
            shippingFee : orderAmountDetails.shipping,
            shippingType : "Free",
            subTotal : orderAmountDetails.subTotal,
            tax : orderAmountDetails.tax,
            total : orderAmountDetails.total
        }

        HttpRoutingService.postMethod("order/createOrder",orderData).then((data)=>{
            setOrderConfirmation(true)
        }).catch((err : any)=>{
            dispatch(resetManualOrder({}))
            toast.error(<Typography>Something went wrong! Try again</Typography>);
        })

        console.log("orderData",orderData)
    }

    // useEffect
    // useEffect(() => {
    //     if (manualOrderSlice.selectedCustomer) {
    //         console.log(manualOrderSlice.selectedCustomer)
    //     }

    // }, [manualOrderSlice])


    return (
        <Grid container columnSpacing={4} display={"flex"} sx={{
            height: 500,
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
            mb: 8,
        }}>

            <CommonToastContainer />

            {/* Cart list item */}
            <Grid item sm={12} md={12} lg={6}>
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
                                        <Typography color={"black"}>₹{Number(cartItem?.salesPrice * cartItem?.quantity).toFixed(2)}</Typography>
                                        <Button variant="contained" sx={{ mb: 2 }} color="error">
                                            REMOVE
                                        </Button>
                                    </Stack>
                                </Stack>


                            </Stack>
                        </Card>
                    })
                }

                {/* <Box height={1300}></Box> */}

            </Grid>

            {/* Checkout section */}
            <Grid item sm={12} md={12} lg={6} pr={2}>

                {/* Customer details section */}
                <Card sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" color={"purple"}>Customer Details</Typography>
                    <Divider />
                    <Box mt={2}>
                        <Stack display={"flex"} direction={"row"}>
                            <Typography color={"gray"}>Name : {manualOrderSlice.selectedCustomer?.customerName}</Typography>
                        </Stack>
                        <Stack display={"flex"} direction={"row"}>
                            <Typography color={"gray"}>Ph.no : {manualOrderSlice.selectedCustomer?.mobileNumber}</Typography>
                        </Stack>
                        <Stack display={"flex"} direction={"row"}>
                            <Typography color={"gray"}>Email : {manualOrderSlice.selectedCustomer?.email}</Typography>
                        </Stack>
                    </Box>
                </Card>

                {/* Customer Deliver Address */}
                <Card sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" color={"purple"}>Delivery Address</Typography>
                    <Divider />
                    <Box mt={2}>
                        {
                            manualOrderSlice.selectedCustomer?.customerAddresses?.map((addressItem) => {
                                return <Stack direction={"row"} display={"flex"} alignItems={"center"}>
                                    <IconButton>
                                        {addressItem.isDefault ? <RadioButtonCheckedOutlined htmlColor="coral" /> : <RadioButtonUnchecked />}
                                    </IconButton>
                                    <Typography color={"gray"}>
                                        {addressItem.addressLine1} ,
                                        {addressItem.addressLine2} ,
                                        {addressItem.country} ,
                                        {addressItem.state} -
                                        {" "}
                                        {addressItem.zipCode}
                                    </Typography>
                                </Stack>
                            })
                        }
                    </Box>
                </Card>

                {/* Shipping Type */}
                <Card sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" color={"purple"}>Shipping Type</Typography>
                    <Divider />
                    <Box mt={2}>
                        {
                            shippingTypeList.map((item) => {
                                return <Stack direction={"row"} display={"flex"} alignItems={"center"}>
                                    <IconButton>
                                        {item.isDefault ? <RadioButtonCheckedOutlined htmlColor="coral" /> : <RadioButtonUnchecked />}
                                    </IconButton>
                                    <Typography>
                                        {item.shippinType}
                                        {" - "}
                                        ₹
                                        {item.shippingFee}
                                    </Typography>
                                </Stack>
                            })
                        }
                    </Box>
                </Card>

                {/* Discount */}
                <Card sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" color={"purple"}>Apply Coupon</Typography>
                    <Divider />
                    <Stack display={"flex"} direction={"row"} justifyContent={"space-between"} mt={2} spacing={2}>
                        <TextField inputRef={couponField} fullWidth />
                        <Button variant="contained" color="secondary" sx={{ width: 200 }} onClick={() => applyDiscount(couponField?.current?.value)}>
                            Apply Coupons
                        </Button>
                    </Stack>
                </Card>

                {/* Order Details */}
                <Card sx={{ mt: 3, p: 2, mb: 5 }}>
                    <Typography variant="h6" color={"purple"}>Order Details</Typography>
                    <Divider />
                    <Box mt={2} mb={2}>
                        {/* Sub total */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Sub Total</Typography>
                            <Typography >₹{orderAmountDetails?.subTotal?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        {/* DiscountAmount */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Discount Amount</Typography>
                            <Typography >₹{orderAmountDetails?.discount?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        {/* Tax */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Tax</Typography>
                            <Typography >₹{orderAmountDetails?.tax?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        {/* DeliveryFee */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Delivery Fee</Typography>
                            <Typography >₹{orderAmountDetails?.delivery?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        {/* ShippingFee */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Shipping Fee</Typography>
                            <Typography >₹{orderAmountDetails?.shipping?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        {/* Total */}
                        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography >Total</Typography>
                            <Typography >₹{orderAmountDetails?.total?.toFixed(2)}</Typography>
                        </Stack>
                        <Divider sx={{ mb: 2 }} />

                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button variant="contained" color="success" onClick={() => placeOrder()}>
                                PLACE ORDER
                            </Button>
                        </Box>
                    </Box>
                </Card>

            </Grid>

            {/* Order confirmation display */}
            {
                <Modal open={orderConfirmation} onClose={() => setOrderConfirmation(false)} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* <OrderLottie /> */}
                    <Box sx={{ height: 500, width: 400 , bgcolor:"white" }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                        <Lottie animationData={OrderAnimation} loop={true} height={50} width={50} />
                        <Typography color={"black"} mt={-4}>Order placed successfully!</Typography>
                        <Link href={"allorders"}>
                        <Button variant="contained" color="warning" sx={{mt:1}}>Continue</Button>
                        </Link>
                    </Box>
                </Modal>
            }

        </Grid>
    )
}

export default Checkout;