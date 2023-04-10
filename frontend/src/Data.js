import React, { useState, useEffect } from "react";
import axios from "axios";

function Data() {
  const [data, setData] = useState([]);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get("/api/data", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Data from MySQL database</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Data;
