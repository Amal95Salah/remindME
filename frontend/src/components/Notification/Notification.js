import { useEffect } from "react";

function Notification(props) {
  const { numberNotification, setNumberNotification } = props;
  
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
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
  }, [id, setNumberNotification, token]);

  return numberNotification;
}

export default Notification;
