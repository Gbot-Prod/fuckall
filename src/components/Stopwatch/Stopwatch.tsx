import "./Stopwatch.css"
import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(0);
  const startStopwatchef = useRef(0);

  useEffect(() => {

    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startStopwatchef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }

  }, [isRunning]);

  function startStopwatch() {
    setIsRunning(true);
    startStopwatchef.current = Date.now() - elapsedTime;
    console.log("Stopwatch started");
  }

  function stopStopwatch() {
    setIsRunning(false);
  }

  function resetStopwatch() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {

    let hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime) % 1000 / 10);

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    const millisecondsStr = String(milliseconds).padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}:${millisecondsStr}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="startButton" onClick={startStopwatch} >Start</button>
        <button className="stopButton" onClick={stopStopwatch} >Stop</button>
        <button className="resetButton" onClick={resetStopwatch} >Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;