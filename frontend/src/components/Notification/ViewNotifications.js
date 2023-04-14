import * as React from "react";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

export default function ViewMadicine() {
  const [data, setData] = useState([]);
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`/api/notification/all/${user_id}`, {
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
    <TableContainer>
      <Table stickyHeader sx={{ minWidth: 200 }} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              align="left"
              sx={{ fontWeight: 700, fontSize: 20 }}
            >
              All Notifications
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Notification
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Date and Time
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.message}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.created_at.slice(0, 10)} {row.created_at.slice(11, 19)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.isRead ? "Read" : "Unread"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
