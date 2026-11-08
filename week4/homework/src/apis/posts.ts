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

interface PostDetailResponse {
  isSuccess: boolean
  code: string
  message: string
  data: Post
}

interface UpdatePostRequest {
  postId: string
  title: string
  content: string
}

function getAuthorizationHeader() {
  const authorizationCode = localStorage.getItem('authorizationCode')

  if (!authorizationCode) {
    throw new Error('인증 코드가 없습니다.')
  }

  return { Authorization: authorizationCode }
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

  if (!apiUrl) {
    throw new Error('API 주소가 설정되지 않았습니다.')
  }

  await axios.post(`${apiUrl}/posts`, post, {
    headers: getAuthorizationHeader(),
  })
}

export async function getPost(postId: string) {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('API 주소가 설정되지 않았습니다.')
  }

  const { data } = await axios.get<PostDetailResponse>(`${apiUrl}/posts/${postId}`)
  return data.data
}

export async function updatePost({ postId, title, content }: UpdatePostRequest) {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('API 주소가 설정되지 않았습니다.')
  }

  await axios.put(
    `${apiUrl}/posts/${postId}`,
    { title, content },
    { headers: getAuthorizationHeader() },
  )
}

export async function deletePost(postId: string) {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('API 주소가 설정되지 않았습니다.')
  }

  await axios.delete(`${apiUrl}/posts/${postId}`, {
    headers: getAuthorizationHeader(),
  })
}
