import React, { useState } from "react";

function Notification() {
  //   if ("serviceWorker" in navigator && "PushManager" in window) {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then(function (registration) {
  //         Notification.requestPermission().then(function (permission) {
  //           if (permission === "granted") {
  //             registration.pushManager
  //               .subscribe({
  //                 userVisibleOnly: true,
  //                 applicationServerKey:
  //                   "BMRNXV0snkp6yGwbRiCezmcs_PvySQOPvpLkJwYYEOhQTnkrnvh2iRqlANxJb0jMBoRSpIMIvTAhVzOOsxjByhw",
  //               })
  //               .then(function (subscription) {
  //                 registration.showNotification("Scheduled Notification", {
  //                   body: "This is a scheduled notification!",
  //                 });
  //               });
  //           }
  //         });
  //       });
  //   }

  return <div>notification</div>;
}

export default Notification;
