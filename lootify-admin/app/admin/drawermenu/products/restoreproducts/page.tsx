"use client";

import React from "react";
import RestorProductListComponent from "@/src/components/products/restoreProducts/restoreListComponent";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

const RestoreProductList = () => {
  useRouteMenuCheck();
  return <RestorProductListComponent />;
};

export default RestoreProductList;
