import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import BoardPage from './pages/BoardPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/posts"
          element={
            <>
              <Header />
              <BoardPage />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
