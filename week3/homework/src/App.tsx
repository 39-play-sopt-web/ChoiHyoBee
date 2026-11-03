import { Route, Routes } from 'react-router'
import MovieListPage from './pages/MovieListPage'
import MovieDetailPage from './pages/MovieDetailPage'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#1b1b25] text-white">
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
