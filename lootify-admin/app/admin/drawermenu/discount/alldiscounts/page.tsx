"use client";

import DiscountListComponent from "@/src/components/discount/discountList/discountList";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const DiscountMarketing = () => {
  useRouteMenuCheck;
  return <DiscountListComponent />;
};

export default DiscountMarketing;
