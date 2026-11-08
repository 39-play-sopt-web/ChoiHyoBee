import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import BoardPage from './pages/BoardPage'
import CreatePostPage from './pages/CreatePostPage'
import PostDetailPage from './pages/PostDetailPage'

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
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <Header />
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <Header />
              <PostDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
