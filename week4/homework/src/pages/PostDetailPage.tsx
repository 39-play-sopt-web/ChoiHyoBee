import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPost, updatePost } from '../apis/posts'
import PostDetailView from '../components/PostDetailView'
import PostEditForm from '../components/PostEditForm'

function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const { data: post, isPending, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId!),
    enabled: Boolean(postId),
  })

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      window.alert('게시글이 수정되었습니다.')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
        queryClient.invalidateQueries({ queryKey: ['post', postId] }),
      ])
      setIsEditing(false)
    },
    onError: () => window.alert('게시글 수정에 실패했습니다.'),
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    },
    onError: () => window.alert('게시글 삭제에 실패했습니다.'),
  })

  if (isPending) return <Message>게시글을 불러오는 중입니다.</Message>
  if (isError || !post || !postId) return <Message>게시글을 불러오지 못했습니다.</Message>

  if (isEditing) {
    return (
      <PostEditForm
        post={post}
        isPending={updateMutation.isPending}
        onCancel={() => setIsEditing(false)}
        onSubmit={(title, content) => updateMutation.mutate({ postId, title, content })}
      />
    )
  }

  return (
    <PostDetailView
      post={post}
      isDeleting={deleteMutation.isPending}
      onBack={() => navigate('/posts')}
      onEdit={() => setIsEditing(true)}
      onDelete={() => deleteMutation.mutate(postId)}
    />
  )
}

function Message({ children }: { children: string }) {
  return <p className="py-[100px] text-center text-[15px] text-white/50">{children}</p>
}

export default PostDetailPage
