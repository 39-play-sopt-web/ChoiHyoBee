import axios from 'axios'

export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface CreatePostRequest {
  title: string
  content: string
  author: string
}

interface PostListResponse {
  isSuccess: boolean
  code: string
  message: string
  data: {
    posts: Post[]
    nextCursor: number
    hasNext: boolean
  }
}

export async function getPosts(keyword: string) {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('API 주소가 설정되지 않았습니다.')
  }

  const { data } = await axios.get<PostListResponse>(`${apiUrl}/posts`, {
    params: keyword ? { keyword } : undefined,
  })

  return data.data.posts
}

export async function createPost(post: CreatePostRequest) {
  const apiUrl = import.meta.env.VITE_API_URL
  const authorizationCode = localStorage.getItem('authorizationCode')

  if (!apiUrl || !authorizationCode) {
    throw new Error('API 주소 또는 인증 코드가 없습니다.')
  }

  await axios.post(`${apiUrl}/posts`, post, {
    headers: { Authorization: authorizationCode },
  })
}
