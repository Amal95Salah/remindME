import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Card, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const theme = createTheme();

function Reminder() {
  const [medicine, setMedicine] = React.useState("");

  const handleChange = (event) => {
    setMedicine(event.target.value);
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    // const dataForm = new FormData(e.currentTarget);
    // const email = dataForm.get("email");
    // const password = dataForm.get("password");
    // const data = { email, password };
    // // const data = { email, password };
    // fetch("/api/Reminder", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     // Parse the response to JSON
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // Save the token in localStorage
    //     console.log(data.token);
    //     localStorage.setItem("token", data.token);
    //   })
    //   .catch((error) => console.error(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create a reminder
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Paper sx={{ p: 8 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={medicine}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Amal</MenuItem>
                <MenuItem value={20}>Medicine</MenuItem>
                <MenuItem value={30}>Another medicine</MenuItem>
              </Select>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{ margin: 10 }}
              >
                <MobileTimePicker
                  label={'"hours", "minutes"'}
                  views={["hours", "minutes"]}
                />
              </LocalizationProvider>
              <FormControlLabel
                control={<Checkbox value="done" color="primary" />}
                label="if the user wants to stop the notification"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add reminder
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Reminder;
