"use client";

import React from "react";
import SettingComponent from "@/src/components/settings/settings";
import { useRouteMenuCheck } from "@/src/hooks/useRouteMenuCheck";

const Settings = () => {
  useRouteMenuCheck();
  return <SettingComponent />;
};

export default Settings;
