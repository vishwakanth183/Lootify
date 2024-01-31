"use client";

import DiscountMarketingListComponent from "@/src/components/marketing/discountmarketing/discountmarketingList/discountMarketingList";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const DiscountMarketing = () => {
  useRouteMenuCheck;
  return <DiscountMarketingListComponent />;
};

export default DiscountMarketing;
