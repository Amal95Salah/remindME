import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import LayersIcon from "@mui/icons-material/Layers";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemButton from "@mui/material/ListItemButton";
import MedicationIcon from "@mui/icons-material/Medication";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const SignOut = () => {

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ListItemButton onClick={handleSignout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </ListItemButton>
  );
};

export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Reminders" />
      </ListItemButton>
    </Link>
    <Link
      to="/medicine/list"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <MedicationIcon />
        </ListItemIcon>
        <ListItemText primary="Medicines" />
      </ListItemButton>
    </Link>
    <Link
      to="/notification"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
    </Link>
    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
    <SignOut />
  </React.Fragment>
);
