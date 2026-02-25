import './App.css'
import Header from './components/Header/Header'
import Timer from './components/Timer/Timer'
import Stopwatch from './components/Stopwatch/Stopwatch'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import ToDoList from './components/ToDoList/ToDoList'


function App() {
  const components = [
    { name: 'Timer', component: <Timer /> },
    { name: 'Pomodoro Timer', component: <PomodoroTimer /> },
    { name: 'Stopwatch', component: <Stopwatch /> },
    { name: 'To Do List', component: <ToDoList /> },
  ]

  return (
    <div className="app">
      <Header />
      <main className="componentsGrid">
        {components.map((comp, index) => (
          <div className="componentContainer" key={index}>{comp.component}</div>
        ))}
      </main>
    </div>
  )
}

export default App
