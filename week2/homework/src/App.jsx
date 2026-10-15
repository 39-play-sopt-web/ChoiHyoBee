import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [menu, setMenu] = useState('game')

  return (
    <div className="flex min-h-screen flex-col text-gray-900">
      <Header menu={menu} setMenu={setMenu} />
      <main className="flex-1 bg-[#c8f8f6]" />
    </div>
  )
}

export default App
