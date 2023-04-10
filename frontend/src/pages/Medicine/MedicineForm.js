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
import {
  Alert,
  Card,
  FormControl,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function MedicineForm() {
  const [addMedicine, setAddMedicine] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    console.log(dataForm);
    const name = dataForm.get("name");
    const data = { name };
    console.log(data);
    fetch("/api/medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setAddMedicine(false);

          throw new Error("Can not add this medicine");
        }
        setAddMedicine(true);
        setTimeout(() => {
          navigate("/medicine/list");
        }, 2000);
        // Parse the response to JSON
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
          {addMedicine && (
            <Alert severity="success">
              <span>
                <span>Alert!</span> Medicine is added successfully
              </span>
            </Alert>
          )}
          <Typography component="h1" variant="h5">
            Add a medicine
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ m: 0 }}
              />

              <Button type="submit" fullWidth variant="contained">
                Add Medicine
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MedicineForm;
