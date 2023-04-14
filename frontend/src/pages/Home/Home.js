import * as React from "react";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ReminderList from "../Reminder/ReminderList";

const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
          }}
        >
          <ReminderList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Home() {
  return <DashboardContent />;
}
