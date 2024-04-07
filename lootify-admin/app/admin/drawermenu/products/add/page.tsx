"use client"
import React from "react";

// Custom imports
import AddEditProduct from "@/src/components/products/addEditProduct/addEditProduct";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

function NewProduct() {
  useRouteMenuCheck();
  return <AddEditProduct add={true} />;
}

export default NewProduct;
