"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Custom imports
import AddEditOptions from "../../../../.././../src/components/products/options/addEditOptions/addEditOptions";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

function EditViewOptions() {
  useRouteMenuCheck();
  let route = usePathname();
  let path = route.split("/");

  return <AddEditOptions edit={true} id={path[path.length - 1]} />;
}

export default EditViewOptions;
