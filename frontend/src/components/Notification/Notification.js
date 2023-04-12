import React, { useState } from "react";

function Notification({ numberNotification, setNumberNotification }) {
  const [notification, setNotification] = useState(null);
  // const [numberNotificationUnRead, setNumberNotification] = useState(0);
  //  useEffect(() => {
  //    // Calculate the time until the scheduled notification
  //    const scheduledTime = new Date("2023-04-15T12:00:00Z").getTime(); // Replace with your scheduled time
  //    const currentTime = new Date().getTime();
  //    const timeForReminder = scheduledTime - currentTime;

  //    // Wait until the scheduled time to send the request
  //    const timeout = setTimeout(() => {
  //      // Call backend API to get scheduled notification
  //      axios.get("/api/notification").then((response) => {
  //        setNotification("true");
  //      });
  //    }, timeForReminder);

  //    //check if reminder still working calculate next reminder
  //    // Clean up the timeout on unmount
  //    return () => clearTimeout(timeout);
  //  }, []);

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
        // console.log(data.count);
        setNumberNotification(data.count);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // if (!notification) {
  //   return null; // No notification to display
  // }
  // numberNotification = numberNotification + 1;
  console.log(numberNotification);
  return numberNotification;

  // return (
  //   <div>
  //     <p>{notification.message}</p>
  //   </div>
  // );
}

export default Notification;
