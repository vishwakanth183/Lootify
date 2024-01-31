"use client";

import React from "react";
import OptionsListComponent from "@/src/components/products/options/optionsList/optionsListComponent";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

const OptionsList = () => {
  useRouteMenuCheck();
  return <OptionsListComponent />;
};

export default OptionsList;
