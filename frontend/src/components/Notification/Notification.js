import React, { useState } from "react";

function Notification(props) {
  const { numberNotification, setNumberNotification } = props;
  const [notification, setNotification] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  React.useEffect(() => {
    fetch(`/api/notification/count/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.count);
        setNumberNotification(data.count);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // if (!notification) {
  //   return null; // No notification to display
  // }
  // numberNotification = numberNotification + 1;
  return numberNotification;

  // return (
  //   <div>
  //     <p>{notification.message}</p>
  //   </div>
  // );
}

export default Notification;
