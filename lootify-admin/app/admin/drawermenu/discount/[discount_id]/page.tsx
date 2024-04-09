"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Custom imports
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import AddEditDiscount from "@/src/components/discount/addEditDiscount/addEditDiscount";

function EditDiscount() {
  useRouteMenuCheck();
  let route = usePathname();
  let path = route.split("/");

  return <AddEditDiscount edit={true} id={path[path.length - 1]} />;
}

export default EditDiscount;
