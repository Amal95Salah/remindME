import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function ReminderList() {
  const [data, setData] = useState([]);
  const user_id = localStorage.getItem("id");
  const HandleDelete=(reminderId)=>{
    // console.log(reminderId)
      }

  useEffect(() => {
    fetch(`/api/reminder/${user_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);
  
  return (
    <TableContainer sx={{ width: "100%", backgroundColor: "white" }}>
      <Table stickyHeader sx={{ minWidth: 200 }} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>All Reminders</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Medicine
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Start Date
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              End Date
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Repetition
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Dosage
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Frequency
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Time
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Note
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Edit
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.medicine}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.startDate.toString().slice(0, 10)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.endDate.toString().slice(0, 10)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.repetition}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.dosage}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.frequency}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.note}
              </TableCell>
              <TableCell component="th" scope="row">
                {" "}
                <Button startIcon={<EditIcon />}>Edit</Button>
              </TableCell>
              <TableCell component="th" scope="row" onClick={HandleDelete(row.id)}>
                {" "}
                <Button startIcon={<DeleteIcon />} >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
