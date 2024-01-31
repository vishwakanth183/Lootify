"use client";

import AddHeaderComponent, { actionButtonInterface } from "@/src/shared/components/addHeader/addHeaderComponent";
import ComponentView from "@/src/shared/components/componentView/componentView";
import React, { FC } from "react";

interface addEditOptionProps {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
}

const AddEditOptions: FC<addEditOptionProps> = ({ add, edit, view, id }) => {
  const actionButtons: actionButtonInterface[] = [
    {
      title: "Cancel",
    },
    {
      title: "Save",
    },
  ];
  return (
    <React.Fragment>
      <AddHeaderComponent title={`${add ? "Add" : edit ? "Edit" : "View"} options`} modalHeader actionButtons={actionButtons} />
      <ComponentView fullView>
        <div>AddEditOptions</div>
      </ComponentView>
    </React.Fragment>
  );
};

export default AddEditOptions;
