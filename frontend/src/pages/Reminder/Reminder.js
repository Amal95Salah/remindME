import React, { useEffect, useState, useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { TimerContext } from "../../context/TimerContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme();

function Reminder() {
  const { startTimer, stopTimer } = useContext(TimerContext);

  const repetitionValue = {
    D: 24,
    W: 24 * 7,
    M: 24 * 30,
  };
  const [medicine, setMedicine] = useState("");
  const [repetition, setRepetition] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [time, setTime] = useState();

  const [medicines, setMedicines] = useState([]);
  const user_id = localStorage.getItem("id");

  useEffect(() => {
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
  }, [user_id]);

  const addNotification = (
    notificationData,
    frequency,
    repetition,
    endTime
  ) => {
    fetch("/api/notification/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(notificationData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));

    const currentTime = new Date().getDate();
    if (currentTime < endTime.getDate()) {
      const timeForReminder =
        (repetitionValue[repetition] / frequency) * 60 * 60 * 1000;
      const timerId = "myTimer";
      startTimer(
        timerId,
        () => {
          addNotification(notificationData, frequency, repetition, endTime);
        },
        timeForReminder
      );

      return () => stopTimer(timerId);
    }
  };

  function HandleSubmit(e) {
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
      startDate: startDate?.toISOString().slice(0, 10),
      endDate: endDate?.toISOString().slice(0, 10),
      time: time?.toISOString().slice(11, 16),
      note,
    };
    let reminder_id = 60;
    fetch("/api/reminder/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        reminder_id = data.id;

        const message = medicine;
        const isRead = false;
        const notificationData = {
          reminder_id,
          user_id,
          message,
          isRead,
        };

        const startTime = startDate ? new Date(startDate) : null;
        const endTime = startDate ? new Date(endDate) : null;

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

        const timeForReminder = diffInMs;
        const timerId = "myTimer";
        startTimer(
          timerId,
          () => {
            addNotification(notificationData, frequency, repetition, endTime);
          },
          timeForReminder
        );

        return () => stopTimer(timerId);
      })
      .catch((error) => console.error(error));
  }

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
            onSubmit={HandleSubmit}
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
