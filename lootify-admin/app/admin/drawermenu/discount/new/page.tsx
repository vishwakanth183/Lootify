"use client";

import React from "react";

// Custom imports
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import AddEditDiscount from "@/src/components/discount/addEditDiscount/addEditDiscount";

function AddDiscount() {
  useRouteMenuCheck();

  return <AddEditDiscount add />;
}

export default AddDiscount;
