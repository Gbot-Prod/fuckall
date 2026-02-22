import "./Timer.css"
import { useState, useRef } from "react";

let totalTime = 0;

function TimePicker() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  function handleConfirm() {
    totalTime = (parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second)) * 1000;
  }

  return (
    <div className="timePicker">
      <div className="manualInput">
        <input className="timeInput" type="text" value={hour} onChange={(e) => setHour(e.target.value)} />
        <span>:</span>
        <input className="timeInput" type="text" value={minute} onChange={(e) => setMinute(e.target.value)} />
        <span>:</span>
        <input className="timeInput" type="text" value={second} onChange={(e) => setSecond(e.target.value)} />
      </div>
      <button className="confirmButton" onClick={handleConfirm}>Confirm</button>
    </div>
  );
}

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const intervalIdRef = useRef<number | undefined>(undefined);
  let alarm = new Audio("/alarm.mp3")

  function formatTime() {
    let hours = Math.floor((totalTime / 1000 / 60 / 60) % 60);
    let minutes = Math.floor((totalTime / 1000 / 60) % 60);
    let seconds = Math.floor((totalTime / 1000) % 60);

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`
  }

  return (
    <div className="Timer">
      <div className="setTimeButtonContainer">
        <button className="setTimeButton" onClick={() => setShowPicker(true)}>
          Set Time
        </button>
      </div>
      <div className="timerDisplay">
        {formatTime()}
      </div>
      <div className="controlButtonsContainer">
        <button className="startStopButton">Start</button>
        <button className="ResetButton">Reset</button>
      </div>
      {showPicker && <TimePicker />}
    </div>
  );
}

export default Timer

