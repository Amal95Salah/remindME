import React, { useState } from "react";
import Data from "./Data";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Reminder from "./pages/Reminder/Reminder";
import MedicineForm from "./pages/Medicine/MedicineForm";
import ViewMadicine from "./pages/Medicine/ViewMadicine";
import Profile from "./pages/Profile/Profile";
import ListNotification from "./components/Notification/ListNotification";
import { TimerProvider } from "./context/TimerContext";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./components/ListItems/ListItems";

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
          <Box sx={{ maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
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
                overflow: "hidden",
                display: "flex",
              }}
            >
              {" "}
              <Drawer variant="permanent" open={open}>
                <Toolbar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                  }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">{mainListItems}</List>
              </Drawer>
              <Container
                maxWidth="lg"
                sx={{ mt: 4, mb: 4, overflow: "auto" }}
              >
                <Grid container spacing={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {/* <Route path="/blogs" element={<BlogsPage blogsData={blogs} />} /> */}
                      {/* <Route
              path="/blogs/:blogId"
              element={<SingleBlogPage blogData={blogs} />}
            /> */}
                      <Route path="data" element={<PrivateRoute />}>
                        <Route path="/data" element={<Data />} />
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
                      <Route path="profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                      </Route>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/medicine/list" element={<ViewMadicine />} />
                      <Route
                        path="/notification"
                        element={<ListNotification />}
                      />
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
