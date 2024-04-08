"use client";

import React, { FC, useEffect, useState } from "react";
import { productItem } from "../../products/allproduct/productListComponent";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import HttpRoutingService from "@/src/services/axios/httpRoutingService";
import { Add, Circle, MiscellaneousServicesSharp, PlusOne, RadioButtonChecked, RadioButtonUncheckedOutlined, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";
// import CommonToastContainer from "@/src/shared/components/Snackbar/CommonToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { addToCartProducts, updateCartProducts } from "@/app/redux/slices/order/manualOrder";

export interface variantCombinationDetails {
  id: number;
  combinationName: string;
  optionValueIds: string;
  isDefault: boolean | null;
  salesPrice: number;
  mrpPrice: number;
  stock: number;
  quantity: number;
}

interface optionValueId {
  id: number;
  value: string;
  color: string;
  optionId: number;
}

interface optionValues {
  id: number;
  optionName: string;
  showColors: boolean;
  optionValues: optionValueId[];
}

interface productOptionMappings {
  optionId: number;
  option: optionValues;
}

interface productDetail {
  id: number;
  productName: String;
  isVariants: boolean;
  salesPrice: number;
  mrpPrice: number;
  stock: number;
  variantCombinationDetails: variantCombinationDetails[];
  productOptionMappings: productOptionMappings[];
  quantity: number;
}

const ProductModal: FC<{ product: productItem | null; closeFunction: any }> = ({ product, closeFunction }) => {
  // Function to handle product item data from parent
  const productProps = product;

  // Variable used to handle redux
  const manualOrderSlice = useSelector((state: RootState) => state.manualOrderSlice);
  const dispatch = useDispatch<AppDispatch>();

  // Variable to handle loading state
  const [loading, setLoading] = useState<boolean>(false);

  // state to maintain product details data
  const [productDetail, setProductDetail] = useState<productDetail>();

  // state to maintain selected variant
  const [selectedVariant, setSelectedVariant] = useState<variantCombinationDetails>();

  // Variable to handle unavailable combination
  const [unavailableCombination, setUnavailableCombination] = useState<boolean>(false);

  // state to maintain filtered options list
  const [optionsList, setOptionsList] = useState<optionValues[]>();

  // Function to get product detail from server
  const getProductDetails = async () => {
    await HttpRoutingService.getMethod("product/getProductDetailById", { productId: productProps?.id })
      .then((res: any) => {
        // console.log("product detail", res)
        let responseProduct: productDetail = res.data;
        if (responseProduct.isVariants) {
          let defaultVariant: variantCombinationDetails | any = responseProduct.variantCombinationDetails.find(item => item.isDefault);
          let nestedVptionValueIds = responseProduct.variantCombinationDetails.map(item => JSON.parse(item.optionValueIds));
          let optionValueIds: any = [...new Set(nestedVptionValueIds.flatMap(item => item))];
          console.log("optionValueIds", optionValueIds);
          let filteredOptionListWithIds: productOptionMappings[] | any = [];
          for (let i = 0; i < responseProduct.productOptionMappings.length; i++) {
            let optionDetails = responseProduct.productOptionMappings[i].option;
            // console.log("optionDetails.optionValues", optionDetails)
            optionDetails.optionValues = optionDetails.optionValues.filter(item => optionValueIds.includes(item.id));
            filteredOptionListWithIds.push(optionDetails);
          }
          // console.log("filteredOptionListWithIds", filteredOptionListWithIds)
          setOptionsList(filteredOptionListWithIds);
          // defaultVariant.combinationName =generateCombinationName(JSON.parse(optionValueIds));
          const isExistingProduct = checkIsCartProduct(responseProduct, defaultVariant);
          if (isExistingProduct) {
            defaultVariant.quantity = isExistingProduct?.quantity;
          }
          console.log("defaultVariant", defaultVariant);
          setSelectedVariant(defaultVariant);
        } else {
          const isExistingProduct = checkIsCartProduct(responseProduct);
          if (isExistingProduct) {
            responseProduct.quantity = isExistingProduct?.quantity;
          }
        }
        // console.log("responseProduct",responseProduct)
        setProductDetail(JSON.parse(JSON.stringify(responseProduct)));
      })
      .catch((err: any) => {
        console.log("product details err", err);
      });
  };

  // Function to check whether the optionvalue is selected or not
  const checkSelectedValue = (valueId: number) => {
    if (selectedVariant) {
      return JSON.parse(selectedVariant?.optionValueIds).includes(valueId);
    } else {
      return false;
    }
  };

  // function to generate combination name based on selected option ids
  const generateCombinationName = (optionValueIds: any) => {
    let combinationName: any = [];
    optionsList?.forEach((option: optionValues) => {
      option.optionValues.map(valueId => {
        if (optionValueIds.includes(valueId.id)) {
          combinationName.push(valueId.value);
        }
      });
    });
    return combinationName.join(",");
  };

  // Function to check whether the product is added in the cart or not
  const checkIsCartProduct = (productData: any, currentVariant?: variantCombinationDetails) => {
    const cartData = manualOrderSlice.cartProducts;
    if (productData.isVariants) {
      return cartData.find(item => item.id == productData.id && item.variantId == currentVariant?.id);
    } else {
      return cartData.find(item => item.id == productData.id);
    }
  };

  // Function used to add a product to cart
  const addToCart = () => {
    let newCartItem: any = productDetail;
    newCartItem = {
      id: productDetail?.id,
      productName: productDetail?.productName,
      isVariants: productDetail?.isVariants,
    };
    if (productDetail?.isVariants) {
      newCartItem["variantId"] = selectedVariant?.id;
      newCartItem["combinationName"] = selectedVariant?.combinationName;
      (newCartItem["quantity"] = 1), (newCartItem["salesPrice"] = selectedVariant?.salesPrice);
      dispatch(addToCartProducts(newCartItem));
      toast.success(<Typography>Product added to cart</Typography>);
      closeFunction();
    } else {
      newCartItem["salesPrice"] = productDetail?.salesPrice;
      newCartItem["quantity"] = 1;
      dispatch(addToCartProducts(newCartItem));
      toast.success(<Typography>Product added to cart</Typography>);
      closeFunction();
    }
  };

  // Function to handle increment/decrement
  const updateQuantity = (action: "increment" | "decrement") => {
    if (action == "increment") {
      if (productDetail) {
        if (productDetail.isVariants) {
          if (selectedVariant && selectedVariant?.quantity + 1 > selectedVariant?.stock) {
            toast.error(<Typography>Product exceeds stock</Typography>);
          } else {
            if (selectedVariant) {
              let newCartProducts = JSON.parse(JSON.stringify(manualOrderSlice.cartProducts));
              newCartProducts.map((cartItem: any) => {
                if (cartItem.id == productDetail.id && cartItem.variantId == selectedVariant?.id) {
                  cartItem.quantity = selectedVariant.quantity + 1;
                }
              });
              dispatch(updateCartProducts(newCartProducts));
              setSelectedVariant(Object.assign(selectedVariant, { quantity: selectedVariant.quantity + 1 }));
              toast.success(<Typography>Product updated successfully</Typography>);
            }
          }
        } else {
          // console.log("productDetail?.quantity", productDetail?.quantity);
          if (productDetail && productDetail?.quantity + 1 > productDetail?.stock) {
            toast.error(<Typography>Product exceeds stock</Typography>);
          } else {
            let newCartProducts = JSON.parse(JSON.stringify(manualOrderSlice.cartProducts));
            newCartProducts.map((cartItem: any) => {
              if (cartItem.id == productDetail.id) {
                cartItem["quantity"] = productDetail.quantity + 1;
              }
            });
            setProductDetail(Object.assign(productDetail, { quantity: productDetail.quantity + 1 }));
            dispatch(updateCartProducts(newCartProducts));
            toast.success(<Typography>Product updated successfully</Typography>);
          }
        }
      }
    } else {
      if (productDetail) {
        if (productDetail.isVariants) {
          if (selectedVariant) {
            if (selectedVariant && selectedVariant?.quantity - 1 <= 0) {
              let newCartProducts = manualOrderSlice.cartProducts.filter(cartItem => cartItem.id != productDetail.id && cartItem.variantId != selectedVariant.id);
              dispatch(updateCartProducts(newCartProducts));
              // console.log("newCartProducts",newCartProducts)
              closeFunction();
              setSelectedVariant(Object.assign(selectedVariant, { quantity: selectedVariant.quantity - 1 }));
              toast.success(<Typography>Product removed from cart successfully</Typography>);
            } else {
              let newCartProducts = JSON.parse(JSON.stringify(manualOrderSlice.cartProducts));
              newCartProducts.map((cartItem: any) => {
                if (cartItem.id == productDetail.id && cartItem.variantId == selectedVariant.id) {
                  cartItem.quantity = selectedVariant.quantity - 1;
                }
              });
              dispatch(updateCartProducts(newCartProducts));
              setSelectedVariant(Object.assign(selectedVariant, { quantity: selectedVariant.quantity - 1 }));
              toast.success(<Typography>Product updated successfully</Typography>);
            }
          }
        } else {
          if (productDetail?.quantity - 1 <= 0) {
            let newCartProducts = manualOrderSlice.cartProducts.filter(cartItem => cartItem.id != productDetail.id);
            dispatch(updateCartProducts(newCartProducts));
            // console.log("newCartProducts",newCartProducts,productDetail.id)
            closeFunction();
            toast.success(<Typography>Product removed from cart successfully</Typography>);
            closeFunction();
          } else {
            let newCartProducts = JSON.parse(JSON.stringify(manualOrderSlice.cartProducts));
            newCartProducts.map((cartItem: any) => {
              if (cartItem.id == productDetail.id) {
                cartItem["quantity"] = productDetail.quantity - 1;
              }
            });
            dispatch(updateCartProducts(newCartProducts));
            setProductDetail(Object.assign(productDetail, { quantity: productDetail.quantity - 1 }));
            toast.success(<Typography>Product updated successfully</Typography>);
          }
        }
      }
    }
  };

  // Function trigged while tapping on a option value
  const onChangeVariant = ({ optionId, optionValueId }: { optionId: number; optionValueId: number }) => {
    if (optionsList && selectedVariant) {
      const currentSelectedOption = optionsList.find(item => item.id == optionId);
      let currentSelectedVariant: any = selectedVariant;
      currentSelectedVariant.optionValueIds = JSON.parse(currentSelectedVariant?.optionValueIds);
      // console.log("currentSelectedOption",currentSelectedOption)
      // console.log("currentSelectedVariant?.optionValueIds",currentSelectedVariant.optionValueIds)
      const previousOptionId = currentSelectedVariant.optionValueIds?.find((item: any) => currentSelectedOption?.optionValues.find(values => values.id == item));
      const previousIndex = currentSelectedVariant.optionValueIds.findIndex((values: any) => values == previousOptionId);
      // setSelectedVariant((prev:variantCombinationDetails)=>{
      //     return prev.optionValueIds[previousIndex] = optionValueId;
      // })
      currentSelectedVariant.optionValueIds[previousIndex] = optionValueId;
      currentSelectedVariant.combinationName = generateCombinationName(currentSelectedVariant.optionValueIds);
      currentSelectedVariant.optionValueIds = JSON.stringify(currentSelectedVariant.optionValueIds);

      let currentCombinationDetails = productDetail?.variantCombinationDetails.find(item => item.optionValueIds == currentSelectedVariant.optionValueIds);

      if (currentCombinationDetails) {
        setUnavailableCombination(false);
        currentSelectedVariant.id = currentCombinationDetails.id;
        currentSelectedVariant.mrpPrice = currentCombinationDetails.mrpPrice;
        currentSelectedVariant.salesPrice = currentCombinationDetails.salesPrice;
        currentSelectedVariant.stock = currentCombinationDetails.stock;
      } else {
        setUnavailableCombination(true);
        currentSelectedVariant.id = undefined;
        currentSelectedVariant.stock = 0;
      }

      const isExistingProduct = checkIsCartProduct(productDetail, currentSelectedVariant);
      if (isExistingProduct) {
        currentSelectedVariant.quantity = isExistingProduct?.quantity;
      } else {
        currentSelectedVariant.quantity = 0;
      }

      // console.log("variantCombinationDetails",productDetail?.variantCombinationDetails)
      // console.log("currentSelectedVariant",currentSelectedVariant)

      // console.log("previousOptionId",previousOptionId,previousIndex)
      // console.log("currentSelectedVariant", currentSelectedVariant);
      // console.log("genrateCombinationName", generateCombinationName(currentSelectedVariant.optionValueIds));

      setSelectedVariant({ ...currentSelectedVariant });
    }
  };

  useEffect(() => {
    if (productProps) {
      // console.log("productProps", productProps)
      getProductDetails();
    }
  }, [productProps]);

  useEffect(() => {
    console.log("selectedVariant", selectedVariant);
  }, [selectedVariant]);

  return (
    <Box pt={3}>
      {/* <CommonToastContainer /> */}
      <Stack display={"flex"} alignItems={"flex-start"} direction={"row"}>
        {/* Product image */}
        <Image src="/images/no-image.jpg" alt={productProps?.productName + "image"} width={150} height={150} />

        {/* Product details section */}
        <Box pl={2}>
          <Typography variant="h6" color={"purple"}>
            {productDetail?.productName}
          </Typography>
          <Stack display={"flex"} direction={"row"} spacing={1}>
            <Typography sx={{ textDecoration: "line-through" }} color={"grey"}>
              ₹{productDetail?.isVariants ? selectedVariant?.mrpPrice : productDetail?.mrpPrice}
            </Typography>
            <Typography color={"black"}>₹{productDetail?.isVariants ? selectedVariant?.salesPrice : productDetail?.salesPrice}</Typography>
          </Stack>
          <Typography color={"grey"}>Available Stock : {productDetail?.isVariants ? selectedVariant?.stock : productDetail?.stock}</Typography>

          {productDetail?.isVariants ? (
            <Stack direction={"column"} pb={3} pt={2}>
              {optionsList?.map((options, index) => {
                return (
                  <Box key={index}>
                    <Typography color={"blue"}>{options.optionName}</Typography>
                    <Stack direction={"row"}>
                      {options.optionValues.map((optionValue, index) => {
                        return (
                          <Box key={index}>
                            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
                              <IconButton onClick={() => onChangeVariant({ optionId: options.id, optionValueId: optionValue.id })}>
                                {optionValue.color ? (
                                  checkSelectedValue(optionValue.id) ? (
                                    <RadioButtonChecked htmlColor={optionValue.color} />
                                  ) : (
                                    <Circle htmlColor={optionValue.color} />
                                  )
                                ) : checkSelectedValue(optionValue.id) ? (
                                  <RadioButtonChecked htmlColor={optionValue.color} />
                                ) : (
                                  <RadioButtonUncheckedOutlined />
                                )}
                              </IconButton>
                              {optionValue.color ? null : <Typography color={"black"}>{optionValue.value}</Typography>}
                            </Stack>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          ) : null}
          {!productDetail?.quantity && !selectedVariant?.quantity ? (
            <Button variant="contained" color="success" disabled={!Number(productDetail?.isVariants ? selectedVariant?.stock : productDetail?.stock)} onClick={() => addToCart()}>
              Add to cart
            </Button>
          ) : (
            <Stack direction={"row"} display={"flex"} alignItems={"center"} spacing={2}>
              <IconButton
                sx={{ bgcolor: "lightgrey" }}
                onClick={() => {
                  updateQuantity("decrement");
                }}>
                <Remove fontSize="small" />
              </IconButton>
              <Typography color={"black"}>{product?.isVariants ? selectedVariant?.quantity : productDetail?.quantity}</Typography>
              <IconButton
                sx={{ bgcolor: "lightgrey" }}
                onClick={() => {
                  updateQuantity("increment");
                }}>
                <Add fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductModal;
