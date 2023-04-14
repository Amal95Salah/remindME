import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ListNotification(props) {
  const { numberNotification, setNumberNotification } = props;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [notification, setNotification] = useState([]);
  function HandleItemClick(notificationId) {
    if (notificationId) {
      fetch(
        `/api/notification/read/${notificationId}`,
        { method: "PUT" },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setNumberNotification(numberNotification - 1);
          setNotification((prevNotifications) =>
            prevNotifications.filter(
              (notification) => notification.id !== notificationId
            )
          );
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    fetch(`/api/notification/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotification(data);
      })
      .catch((error) => console.error(error));
  }, [id, token]);

  return (
    <List sx={{ width: "100%" }}>
      {notification.map((item) => (
        <ListItem
          key={item.id}
          style={
            // index === 1 || index === 2 ?
            { width: "100%" }
            //  : null
          }
          button
          onClick={() => HandleItemClick(item.id)}
        >
          <ListItemText
            primary={item.message}
            secondary={new Date(item.created_at).toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
}
