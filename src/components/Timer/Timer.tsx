import "./Timer.css"
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

function TimePicker({ onConfirm }: { onConfirm: (ms: number) => void }) {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  function handleConfirm() {
    const totalTimeMs = (parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second)) * 1000;
    onConfirm(totalTimeMs);
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
      <button className="confirmButton" onClick={() => {handleConfirm(); clickSound.play()}}>Confirm</button>
    </div>
  );
}

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [totalTimeMs, setTotalTime] = useState(0);
  const intervalIdRef = useRef<number | undefined>(undefined);

  function handleConfirm(totalTimeMs: number) {
    setTotalTime(totalTimeMs);
    setShowPicker(false);
  }

  function handleStartStop() {
    if (!isRunning) {
      setIsRunning(true)
      clearInterval(intervalIdRef.current); 

      // set1 second tick
      intervalIdRef.current = window.setInterval(() => {
        setTotalTime(prev => {
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
    let hours = Math.floor((totalTimeMs / 1000 / 60 / 60) % 60);
    let minutes = Math.floor((totalTimeMs / 1000 / 60) % 60);
    let seconds = Math.floor((totalTimeMs / 1000) % 60);

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
        <span>{formatTime()}</span>
      </div>
      <div className="controlButtonsContainer">
        <button className="startStopButton" onClick={() => {
          if (alarm && !alarm.paused && !alarm.ended) {
            alarm.pause();
            alarm.currentTime = 0;
          }
          clickSound.play();
          handleStartStop();
          }}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="ResetButton" onClick={() => {
          setTotalTime(0)
          setIsRunning(false)
          clearInterval(intervalIdRef.current)
          clickSound.play()
          }}>
          Reset
        </button>
      </div>
      {showPicker && <TimePicker onConfirm={handleConfirm} />}
    </div>
  );
}

export default Timer

