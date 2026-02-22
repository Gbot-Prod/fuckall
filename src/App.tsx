import './App.css'
import Header from './components/Header/Header'
import Alarm from './components/Alarm/Alarm'
import Timer from './components/Timer/Timer'
import Stopwatch from './components/Stopwatch/Stopwatch'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import TicTacToe from './components/TicTacToe/TicTacToe'


function App() {
  const components = [
    { name: 'Alarm', component: <Alarm /> },
    { name: 'Timer', component: <Timer /> },
    { name: 'Pomodoro Timer', component: <PomodoroTimer /> },
    { name: 'Tic Tac Toe', component: <TicTacToe /> },
  ]

  return (
    <div className="app">
      <Header />
      <Timer />
      <PomodoroTimer />
    </div>
  )
}

export default App
