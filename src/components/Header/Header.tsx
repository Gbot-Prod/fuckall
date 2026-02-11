import './Header.css'
import AlarmIcon from '../../assets/alarmIcon.png'
import NotepadIcon from '../../assets/notepadIcon.png'
import TimerIcon from '../../assets/timerIcon.png'

function Header() {
  return (
    <header className="header">
      <h1 className='title'>Fuckery</h1>
      <div className="iconsContainer">
        <img className="notepadIcon icon" src={NotepadIcon} alt="Logo"></img>
        <img className="alarmIcon icon" src={AlarmIcon} alt="Logo"></img>
        <img className="timerIcon icon" src={TimerIcon} alt="Logo"></img>
      </div>
    </header>
  );
}

export default Header;