import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { appColors } from "../appColor";

export const Center = styled(Box)(({ backgroundColor }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: backgroundColor || appColors.primary, // Use the provided color or fallback to the default
}));
