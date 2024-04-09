"use client";
import React from "react";

// Custom imports
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import AddEditCustomer from "@/src/components/orders/customer/addEditCustomer/addEditCustomer";

function AddCustomer() {
  useRouteMenuCheck();
  return <AddEditCustomer add={true} />;
}

export default AddCustomer;
