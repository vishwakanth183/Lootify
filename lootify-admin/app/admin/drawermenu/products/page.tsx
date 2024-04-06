"use client";

import React from "react";
import ProductListComponent from "@/src/components/products/allproduct/productListComponent";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

const ProductListRoute = () => {
  useRouteMenuCheck();
  return <ProductListComponent isRestore={false} />;
};

export default ProductListRoute;
