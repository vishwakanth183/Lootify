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
  LocalOffer,
  Person,
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
  ["all orders"]: ReceiptLongRounded,
  ["all customers"]: Person,
  ["discount"]: DiscountRounded,
  ["all discounts"] : LocalOffer,
  templates: RepeatRounded,
};

const GenerateMenuIcon: React.FC<menuIconProps> = ({ name, selected, submenu }) => {
  const IconComponent = iconComponents[name.toLowerCase()] || iconComponents.default;
  return <IconComponent htmlColor={selected ? (submenu ? "coral" : "white") : "grey"} />;
};

export default React.memo(GenerateMenuIcon);
