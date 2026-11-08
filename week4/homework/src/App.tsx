import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BoardPage from './pages/BoardPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<BoardPage />} />
      </Routes>
    </>
  )
}

export default App
