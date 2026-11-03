import { useState } from 'react'
import Game from './components/Game'
import Header from './components/Header'
import Ranking from './components/Ranking'

function App() {
  const [menu, setMenu] = useState('game')
  const [level, setLevel] = useState(1)
  const [time, setTime] = useState(0)

  function changeMenu(newMenu) {
    setMenu(newMenu)
    setTime(0)
  }

  function changeLevel(newLevel) {
    setLevel(newLevel)
    setTime(0)
  }

  return (
    <div className="flex min-h-screen flex-col text-gray-900">
      <Header
        menu={menu}
        changeMenu={changeMenu}
        level={level}
        changeLevel={changeLevel}
        time={time}
      />
      {menu === 'game' && (
        <Game key={level} level={level} setTime={setTime} />
      )}
      {menu === 'ranking' && <Ranking />}
    </div>
  )
}

export default App
