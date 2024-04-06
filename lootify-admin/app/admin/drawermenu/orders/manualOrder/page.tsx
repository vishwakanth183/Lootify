"use client";

import ManualOrderStepper from "@/src/components/orders/manualOrder/stepper";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const Dashboard = () => {
  useRouteMenuCheck();
  return <ManualOrderStepper />;
};

export default Dashboard;
