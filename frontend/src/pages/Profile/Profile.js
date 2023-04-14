import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

const theme = createTheme();

function Profile() {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`/api/user/${id}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    const firstName = dataForm.get("firstName");

    const lastName = dataForm.get("lastName");
    const newEmail = dataForm.get("email");
    const password = dataForm.get("password");
    const data = { firstName, lastName, password, newEmail };
    console.log(data);
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // setMessage(data.message);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
            Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <Paper
              sx={{ p: 8, display: "flex", flexDirection: "column", gap: 2 }}
              elevation={6}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                id="firstName"
                autoComplete="firstName"
                placeholder={user.firstName}
                sx={{ m: 0 }}
              />
              <TextField
                margin="normal"
                required
                name="lastName"
                fullWidth
                id="lasttName"
                autoComplete="lastName"
                placeholder={user.lastName}
                sx={{ m: 0 }}
              />
              <TextField
                margin="normal"
                required
                name="email"
                fullWidth
                id="email"
                autoComplete="email"
                placeholder={user.email}
                sx={{ m: 0 }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="password"
                id="password"
                autoComplete="password"
                sx={{ m: 0 }}
              />
              <Button type="submit" fullWidth variant="contained">
                Edit
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
