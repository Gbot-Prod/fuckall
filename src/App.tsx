import './App.css'

import { useState, type CSSProperties, type ReactElement } from 'react'
import { AlarmClock, Clock3, ListTodo, TimerReset, Trophy } from 'lucide-react'
import DiscordSideBar from './components/DiscordSideBar/DiscordSideBar'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import ToDoList from './components/ToDoList/ToDoList'
import Timer from './components/Timer/Timer'
import TicTacToe from './components/TicTacToe/TicTacToe'
import Stopwatch from './components/Stopwatch/Stopwatch'
import Alarm from './components/Alarm/Alarm'

type ComponentEntry = {
  name: string
  icon: ReactElement
  component: ReactElement
}

const DEFAULT_SIDEBAR_WIDTH = 80
const DEFAULT_SIDEBAR_HEIGHT = 400

function App() {
  const [sidebarSize, setSidebarSize] = useState({
    width: DEFAULT_SIDEBAR_WIDTH,
    height: DEFAULT_SIDEBAR_HEIGHT,
  })
  const components: ComponentEntry[] = [
    { name: 'Timer', icon: <Clock3 size={24} />, component: <Timer /> },
    { name: 'Pomodoro Timer', icon: <TimerReset size={24} />, component: <PomodoroTimer /> },
    { name: 'To Do List', icon: <ListTodo size={24} />, component: <ToDoList /> },
    { name: 'Tic Tac Toe', icon: <Trophy size={24} />, component: <TicTacToe /> },
    { name: 'Stopwatch', icon: <AlarmClock size={24} />, component: <Stopwatch /> },
    { name: 'Alarm', icon: <Clock3 size={24} />, component: <Alarm /> },
  ]

  const [activeComponent, setActiveComponent] = useState(components[0].name)

  const selectedComponent = components.find((component) => component.name === activeComponent) ?? components[0]

  return (
    <div
      className="app"
      style={{ '--sidebar-width': `${sidebarSize.width}px` } as CSSProperties}
    >
      <DiscordSideBar
        items={components.map(({ name, icon }) => ({ name, icon }))}
        activeItem={activeComponent}
        onSelect={setActiveComponent}
        width={sidebarSize.width}
        height={sidebarSize.height}
        onResize={setSidebarSize}
      />

      <main className="componentsGrid">
        <div className="componentContainer">
          {selectedComponent.component}
        </div>
      </main>

    </div>
  )
}

export default App
