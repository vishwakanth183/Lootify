"use client";

import DashboardComponent from "@/src/components/dashboard/dashboard";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const Dashboard = () => {
  useRouteMenuCheck();

  return <DashboardComponent />;
};

export default Dashboard;
