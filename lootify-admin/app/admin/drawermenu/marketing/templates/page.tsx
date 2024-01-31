"use client";

import TemplatesListComponent from "@/src/components/marketing/templates/templatesList/templatesList";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";
import React from "react";

const Templates = () => {
  useRouteMenuCheck();
  return <TemplatesListComponent />;
};

export default Templates;
