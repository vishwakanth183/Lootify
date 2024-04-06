"use client";

import CustomerListComponent from "@/src/components/orders/customer/customerList";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const Dashboard = () => {
  useRouteMenuCheck();
  return <CustomerListComponent />;
};

export default Dashboard;
