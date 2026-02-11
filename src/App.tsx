import './App.css'
import Header from './components/Header/Header'
import Timer from './components/Stopwatch/Stopwatch'
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer'
import TicTacToe from './components/TicTacToe/TicTacToe'


function App() {
  return (
    <div className="app">
      <Header/>
      <Timer/>
      <PomodoroTimer/>
      <TicTacToe/>
    </div>
  )
}

export default App
