import "./PomodoroTimer.css"
import { useState, useRef } from "react";

function PomodoroTimer() {
  const timerDurations = {
    pomodoro: 25 * 60 * 1000,
    shortBreak: 5 * 60 * 1000,
    longBreak: 15 * 60 * 1000,
  };
  
  const [currentTimer, setCurrentTimer] = useState(timerDurations.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(timerDurations.pomodoro);
  const intervalIdRef = useRef(0);
  let alarm = new Audio("/alarm.mp3")
  
  const handleTimerChange = (timerType: keyof typeof timerDurations) => {
    setCurrentTimer(timerDurations[timerType]);
    setElapsedTime(timerDurations[timerType]);
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
  }

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalIdRef.current = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime - 1000);
      }, 1000);
      handleAlarm();
    } else {
      setIsRunning(false);
      clearInterval(intervalIdRef.current);
    }
  }

  const handleAlarm = () => {
    if (currentTimer == 0){
      alarm.play();
      alert("Time's up!");
      setIsRunning(false);
      clearInterval(intervalIdRef.current);
    }
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
  }

  return (
    <div className="pomodoro-timer">
      <div className="timerLengths">
        <button className="Pomodoro" onClick={() => handleTimerChange("pomodoro")}>Pomodoro</button>
        <button className="shortBreak" onClick={() => handleTimerChange("shortBreak")}>Short Break</button>
        <button className="longBreak" onClick={() => handleTimerChange("longBreak")}>Long Break</button>
      </div>
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="startButton" onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="resetButton" onClick={() => {
          setElapsedTime(currentTimer);
          setIsRunning(false);
          clearInterval(intervalIdRef.current);
        }}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
