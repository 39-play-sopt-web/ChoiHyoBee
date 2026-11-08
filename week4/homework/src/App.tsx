import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
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
            <>
              <Header />
              <CreatePostPage />
            </>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <>
              <Header />
              <PostDetailPage />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
