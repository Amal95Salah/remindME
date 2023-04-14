import React, { useState } from "react";
import { TimerProvider } from "./context/TimerContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MuiDrawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Reminder from "./pages/Reminder/Reminder";
import MedicineForm from "./pages/Medicine/MedicineForm";
import ViewMadicine from "./pages/Medicine/ViewMadicine";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { mainListItems } from "./components/ListItems/ListItems";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ViewNotifications from "./components/Notification/ViewNotifications";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function App() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const mdTheme = createTheme();

  return (
    <BrowserRouter>
      <TimerProvider>
        <ThemeProvider theme={mdTheme}>
          <Box
            sx={{
              maxHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar toggleDrawer={toggleDrawer} />
            <CssBaseline />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <Drawer variant="permanent" open={open}>
                <List component="nav">{mainListItems}</List>
              </Drawer>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4, overflow: "auto" }}>
                <Grid container spacing={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: "2rem",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                      </Route>

                      <Route path="profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                      </Route>

                      <Route path="reminder" element={<PrivateRoute />}>
                        <Route path="/reminder" element={<Reminder />} />
                      </Route>

                      <Route path="medicine/add" element={<PrivateRoute />}>
                        <Route
                          path="/medicine/add"
                          element={<MedicineForm />}
                        />
                      </Route>
                      <Route path="medicine/list" element={<PrivateRoute />}>
                        <Route
                          path="/medicine/list"
                          element={<ViewMadicine />}
                        />
                      </Route>

                      <Route path="notification" element={<PrivateRoute />}>
                        <Route
                          path="/notification"
                          element={<ViewNotifications />}
                        />
                      </Route>

                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </Paper>
                </Grid>
              </Container>
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </TimerProvider>
    </BrowserRouter>
  );
}

export default App;
