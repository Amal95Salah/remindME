import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import AddIcon from "@mui/icons-material/Add";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";

export default function ViewMadicine() {
  const [data, setData] = useState([]);
  const user_id = localStorage.getItem("id");

  const HandleDelete = (id) => {
    fetch(`/api/medicine/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData((prevD) =>
          prevD.filter((medicine) => medicine.id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`/api/medicine/${user_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
              colSpan={2}
              align="left"
              sx={{ fontWeight: 700, fontSize: 20 }}
            >
              All Medicines
            </TableCell>
            <TableCell align="right">
              <Link to="/medicine/add">
                <Button variant="contained" endIcon={<AddIcon />}>
                  Add Medicine
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Medicine
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
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {" "}
                <Button startIcon={<EditIcon />}>Edit</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {" "}
                <Button
                  onClick={() => HandleDelete(row.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
