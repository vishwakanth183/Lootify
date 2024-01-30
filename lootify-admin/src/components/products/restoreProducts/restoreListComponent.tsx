import React, { useEffect, FC } from "react";
import { useSelector } from "react-redux";

// custom imports
import { AppDispatch, RootState } from "@/app/redux/store";
import "./restoreListComponent.scss";

const RestorProductListComponent = () => {
  const productList = useSelector((state: RootState) => state.productList);

  useEffect(() => {
    console.log("ProductList", productList);
  }, [productList]);

  return <div className="mainProductListView">Restore ProductList</div>;
};

export default RestorProductListComponent;
