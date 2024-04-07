"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Custom imports
import AddEditProduct from "@/src/components/products/addEditProduct/addEditProduct";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

function EditViewOptions() {
  useRouteMenuCheck();
  let route = usePathname();
  let path = route.split("/");

  return <AddEditProduct edit={true} id={path[path.length - 1]} />;
}

export default EditViewOptions;
