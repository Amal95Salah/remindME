import React, { useState, useRef } from "react";
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
import { Card, FormControl, InputLabel, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { format } from "date-fns";

const theme = createTheme();

function Reminder() {
  const [medicine, setMedicine] = useState("");
  const [repetition, setRepetition] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [time, setTime] = useState();

  const [medicines, setMedicines] = useState([]);
  const user_id = localStorage.getItem("id");

  React.useEffect(() => {
    fetch(`/api/medicine/${user_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNotification = (reminderData, frequency) => {
    console.log("inadd notificaion");
    // fetch("/api/notification/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify(reminderData),
    // })
    //   .then((response) => {
    //     // Parse the response to JSON
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => console.error(error));

    //if statement when stop TODO
    const timeForReminder = (24 / frequency) * 60 * 60 * 1000; // in milisecond
    console.log(timeForReminder);
    // const timeout = setTimeout(() => {
    //   console.log("intimeout");
    //   addNotification(reminderData, frequency);
    // }, timeForReminder);
    // return () => clearTimeout(timeout);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const dosage = dataForm.get("dosage");
    const frequency = dataForm.get("frequency");
    const note = dataForm.get("note");
    const data = {
      user_id,
      medicine,
      dosage,
      repetition,
      frequency,
      startDate: startDate?.toISOString().slice(0, 10), // 2021-10-10T00:00:00.000Z
      endDate: endDate?.toISOString().slice(0, 10),
      time: time?.toISOString().slice(11, 16),
      note,
    };

    console.log(data);

    fetch("/api/reminder/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Parse the response to JSON
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    const message = medicine;
    const isRead = false;
    const reminderData = {
      user_id,
      message,
      isRead,
    };

    // Calculate the time until the scheduled notification
    const startTime = startDate ? new Date(startDate) : null;
    const timeValue = time ? time.toDate() : null;
    const currentTime = new Date().getTime();
    let diffInMs = 0;
    if (startTime && timeValue) {
      const startTimeWithTime = new Date(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        timeValue.getHours(),
        timeValue.getMinutes()
      );
      diffInMs = startTimeWithTime.getTime() - currentTime;
    }
    console.log(diffInMs);

    const timeForReminder = diffInMs;
    const timeout = setTimeout(() => {
      addNotification(reminderData, frequency);
    }, timeForReminder);
    return () => clearTimeout(timeout);
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
            Create a reminder
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
              <FormControl fullWidth>
                <InputLabel id="medicine">Medicine</InputLabel>
                <Select
                  labelId="medicine"
                  id="medicine"
                  label="Medicine"
                  defaultValue={""}
                  onChange={(e) => setMedicine(e.target.value)}
                >
                  {medicines.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="dosage"
                label="Dosage"
                name="dosage"
                autoComplete="dosage"
                sx={{ m: 0 }}
              />
              <FormControl fullWidth sx={{ m: 0 }}>
                <InputLabel id="DWM-select-label">Repetition </InputLabel>
                <Select
                  labelId="DWM-select-label"
                  id="DWM-select"
                  label="Repetition"
                  value={repetition}
                  onChange={(e) => setRepetition(e.target.value)}
                >
                  <MenuItem value={"D"}>Daily</MenuItem>
                  <MenuItem value={"W"}>Weekly</MenuItem>
                  <MenuItem value={"M"}>Monthly</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                id="frequency"
                label="Frequency"
                name="frequency"
                autoComplete="frequency"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                sx={{ m: 0 }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} required>
                <DatePicker
                  label="Start Date"
                  id="startDate"
                  name="startDate"
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  id="endDate"
                  name="endDate"
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="Time"
                  views={["hours", "minutes"]}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                fullWidth
                id="note"
                label="Note"
                name="note"
                autoComplete="note"
                multiline
                sx={{ m: 0 }}
              />
              <Button type="submit" fullWidth variant="contained">
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
