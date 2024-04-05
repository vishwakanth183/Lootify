import React from "react";
import {
  Dashboard,
  SettingsRounded,
  PowerSettingsNewRounded,
  MailRounded,
  BuildRounded,
  ShoppingBasketRounded,
  LayersRounded,
  HistoryRounded,
  ChecklistRounded,
  ReceiptLongRounded,
  DiscountRounded,
  RepeatRounded,
} from "@mui/icons-material";

interface menuIconProps {
  name: string;
  selected: boolean;
  submenu?: boolean;
}

const iconComponents: { [key: string]: React.ElementType } = {
  dashboard: Dashboard,
  logout: PowerSettingsNewRounded,
  orders: ShoppingBasketRounded,
  marketing: MailRounded,
  products: LayersRounded,
  default: SettingsRounded,
  ["all products"]: ChecklistRounded,
  ["restore products"]: HistoryRounded,
  options: BuildRounded,
  orderlist: ReceiptLongRounded,
  ["discount marketing"]: DiscountRounded,
  templates: RepeatRounded,
};

const GenerateMenuIcon: React.FC<menuIconProps> = ({ name, selected, submenu }) => {
  const IconComponent = iconComponents[name.toLowerCase()] || iconComponents.default;
  return <IconComponent htmlColor={selected ? (submenu ? "coral" : "coral") : "grey"} />;
};

export default React.memo(GenerateMenuIcon);
