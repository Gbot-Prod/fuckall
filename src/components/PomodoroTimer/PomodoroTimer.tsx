import "./PomodoroTimer.css"
import { useState, useRef } from "react";

const clickSound = new Audio("/click.mp3");
clickSound.load();
clickSound.volume = 0.5;

const alarm = new Audio("/alarm.mp3");
let alarmPlaying = false;
alarm.currentTime = 0;
alarm.load();
alarm.volume = 0.5;

const handleAlarm = () => {
  if (alarmPlaying) return;
  alarmPlaying = true;

  alarm.play();

  setTimeout(() => {
    alarmPlaying = false;
  }, 1000);
}

function PomodoroTimer() {
  const timerDurations = {
    pomodoro: 25 * 60 * 1000,
    shortBreak: 5 * 60 * 1000,
    longBreak: 15 * 60 * 1000,
  };
  
  const [currentTimer, setCurrentTimer] = useState(timerDurations.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(timerDurations.pomodoro);
  const intervalIdRef = useRef<number | undefined>(undefined);
  
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
        setElapsedTime(prev => {
          if (prev <= 1000) {
            handleAlarm();
            clearInterval(intervalIdRef.current);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    } else {
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
        <button className="Pomodoro" onClick={() => {
          clickSound.play();
          handleTimerChange("pomodoro");
        }}>
          Pomodoro
        </button>

        <button className="shortBreak" onClick={() => {
          clickSound.play();
          handleTimerChange("shortBreak");
        }}>
          Short Break
        </button>

        <button className="longBreak" onClick={() => {
          clickSound.play();
          handleTimerChange("longBreak");
        }}>
          Long Break
        </button>
      </div>
      
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="startButton" onClick={() => {
          if (alarm && !alarm.paused && !alarm.ended) {
            alarm.pause();
            alarm.currentTime = 0;
          }
          clickSound.play();
          handleStartStop();
        }}>
          {isRunning ? "Stop" : "Start"}
        </button>

        <button className="resetButton" onClick={() => {
          clickSound.play();
          setElapsedTime(currentTimer);
          setIsRunning(false);
          clearInterval(intervalIdRef.current);
        }}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
