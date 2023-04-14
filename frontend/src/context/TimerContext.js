import React, { createContext, useState } from "react";

const TimerContext = createContext({
  timers: {},
  stopTimer: () => {},
  startTimer: () => {},
});

function TimerProvider(props) {
  const [timers, setTimers] = useState({});

  function startTimer(timerId, callback, delay) {
    console.log("startTimer", timers);
    const timeout = setTimeout(callback, delay);
    setTimers((prevTimers) => ({ ...prevTimers, timerId: timeout }));
  }

  function stopTimer(timerId) {
    clearTimeout(timers[timerId]);
    setTimers((prevTimers) => {
      const newTimers = { ...prevTimers };
      delete newTimers[timerId];
      return newTimers;
    });
  }

  return (
    <TimerContext.Provider value={{ timers, startTimer, stopTimer }}>
      {props.children}
    </TimerContext.Provider>
  );
}
export { TimerContext, TimerProvider };
