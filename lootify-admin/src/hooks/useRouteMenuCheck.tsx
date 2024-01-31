import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { routeMenuCheck } from "@/app/redux/slices/common/common";
import { usePathname } from "next/navigation";

// Custom hook
export const useRouteMenuCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();

  useEffect(() => {
    console.log("useRouteMenuCheck hook called");
    dispatch(routeMenuCheck({ path }));
  }, [dispatch, path]); // Include all dependencies
};
