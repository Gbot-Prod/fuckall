import './App.css'

import Timer from './components/Timer/Timer'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import ToDoList from './components/ToDoList/ToDoList'
import DiscordSideBar from './components/DiscordSideBar/DiscordSideBar'
import TicTacToe from './components/TicTacToe/TicTacToe'
import Stopwatch from './components/Stopwatch/Stopwatch'


function App() {
  const components = [
    { name: 'Timer', component: <Timer /> },
    { name: 'Pomodoro Timer', component: <PomodoroTimer /> },
    { name: 'To Do List', component: <ToDoList /> },
    { name: 'Tic Tac Toe', component: <TicTacToe /> },
    { name: 'Stopwatch', component: <Stopwatch /> },
  ]

  return (
    <div className="app">
      <DiscordSideBar />

      <main className="componentsGrid">
        {components.map((comp, index) => (
          <div className="componentContainer" key={index}>{comp.component}</div>
        ))}
      </main>
      
    </div>
  )
}

export default App
