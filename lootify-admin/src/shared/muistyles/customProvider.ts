import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["100", "200", "400", "900"], subsets: ["latin"] });

export const customMuiTheme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});
