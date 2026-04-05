import "./PomodoroTimer.css"
import { useEffect, useState } from "react";
import { formatMMSS } from "../../lib/timeFormatUtils";
import { playClickSound, playAlarm, stopAlarm } from "../../lib/audio";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";

const timerDurations = {
  pomodoro: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
};

type TimerType = keyof typeof timerDurations;

function PomodoroTimer() {
  const [selectedTimer, setSelectedTimer] = useState<TimerType>("pomodoro");
  const { timeMs, isRunning, start, pause, resume, setTime } = useCountdownTimer({
    onFinish: () => {
      playAlarm();
    },
  });

  useEffect(() => {
    setTime(timerDurations[selectedTimer]);
  }, [selectedTimer, setTime]);

  const handleTimerChange = (timerType: TimerType) => {
    stopAlarm();
    setSelectedTimer(timerType);
  };

  const handleStartPause = () => {
    stopAlarm();
    if (isRunning) {
      pause();
      return;
    }

    if (timeMs <= 0) {
      start(timerDurations[selectedTimer]);
      return;
    }

    resume();
  };

  const handleReset = () => {
    stopAlarm();
    setTime(timerDurations[selectedTimer]);
  };

  return (
    <div className="pomodoro-timer">
      <div className="timerLengths">
        <button className="Pomodoro" onClick={() => {
          playClickSound();
          handleTimerChange("pomodoro");
        }}>
          Pomodoro
        </button>

        <button className="shortBreak" onClick={() => {
          playClickSound();
          handleTimerChange("shortBreak");
        }}>
          Short Break
        </button>

        <button className="longBreak" onClick={() => {
          playClickSound();
          handleTimerChange("longBreak");
        }}>
          Long Break
        </button>
      </div>

      <div className="display">{formatMMSS(timeMs)}</div>
      <div className="controls">
        <button className="startButton" onClick={() => {
          playClickSound();
          handleStartPause();
        }}>
          {isRunning ? "Pause" : "Start"}
        </button>

        <button className="resetButton" onClick={() => {
          playClickSound();
          handleReset();
        }}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
