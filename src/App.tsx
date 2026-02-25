import './App.css'
import Header from './components/Header/Header'
import Alarm from './components/Alarm/Alarm'
import Timer from './components/Timer/Timer'
import Stopwatch from './components/Stopwatch/Stopwatch'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import TicTacToe from './components/TicTacToe/TicTacToe'
import ToDoList from './components/ToDoList/ToDoList'


function App() {
  const components = [
    { name: 'Timer', component: <Timer /> },
    { name: 'Pomodoro Timer', component: <PomodoroTimer /> },
    { name: 'Tic Tac Toe', component: <TicTacToe /> },
  ]

  return (
    <div className="app">
      <Header />

      <ToDoList />
      <Timer />
    </div>
  )
}

export default App
