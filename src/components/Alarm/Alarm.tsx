import { useEffect, useState } from "react";
import "./Alarm.css"

function Alarm() {
  const [currentDateFormatted, setCurrentDateFormatted] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateFormatted(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="alarmComponent">
      <h2 className="title">Alarm</h2>
      <div className="alarmContent">
        <h1 className="alarmTime"></h1>
        <p className="dateTime">{currentDateFormatted}</p>
      </div>
    </div>
  );
}

export default Alarm