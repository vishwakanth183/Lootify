import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["100", "200", "400", "900"], subsets: ["latin"] });

export const customMuiTheme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell:focus": {
            outline: "none !important", // Set outline to none to remove the blue border
          },
          "& .MuiDataGrid-columnHeader": {
            outline: "none !important", // Remove blue border on header cells
            backgroundColor: "rebeccapurple",
            color: "white",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important", // Remove blue border on header cells
          },
        },
        checkboxSelectionHeader: {
          // Styles for header checkbox
          "& .MuiCheckbox-root": {
            color: "white",
          },
        },
      },
    },
  },
});
