"use client";

import OrderListComponent from "@/src/components/orders/orderList/orderListComponent";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const Dashboard = () => {
  useRouteMenuCheck();
  return <OrderListComponent />;
};

export default Dashboard;
