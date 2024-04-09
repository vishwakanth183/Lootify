"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Custom imports
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import AddEditCustomer from "@/src/components/orders/customer/addEditCustomer/addEditCustomer";

function EditCustomer() {
  useRouteMenuCheck();
  let route = usePathname();
  let path = route.split("/");

  return <AddEditCustomer edit={true} id={path[path.length - 1]} />;
}

export default EditCustomer;
