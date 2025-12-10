// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // tweak to match design
    },
    secondary: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Inter', sans-serif",
  },
});

export default theme;
