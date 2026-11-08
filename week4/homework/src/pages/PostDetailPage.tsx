import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPost, updatePost } from '../apis/posts'

function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { data: post, isPending, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId!),
    enabled: Boolean(postId),
  })

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      alert('게시글이 수정되었습니다.')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
        queryClient.invalidateQueries({ queryKey: ['post', postId] }),
      ])
      setIsEditing(false)
    },
    onError: () => alert('게시글 수정에 실패했습니다.'),
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    },
    onError: () => alert('게시글 삭제에 실패했습니다.'),
  })

  const startEditing = () => {
    if (!post) return
    setTitle(post.title)
    setContent(post.content)
    setIsEditing(true)
  }

  const handleEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!postId) return
    updateMutation.mutate({ postId, title: title.trim(), content: content.trim() })
  }

  if (isPending) return <Message>게시글을 불러오는 중입니다.</Message>
  if (isError || !post) return <Message>게시글을 불러오지 못했습니다.</Message>

  if (isEditing) {
    return (
      <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[44px] text-white">
        <h1 className="text-[32px] font-extrabold">게시글 수정</h1>

        <form className="mt-[34px]" onSubmit={handleEdit}>
          <label className="block text-[15px] text-white/75">
            제목
            <input
              className="mt-[10px] w-full rounded-[10px] border border-[#65d8c5] bg-[#30302f] px-[16px] py-[14px] text-white outline-none"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <p className="mt-[8px] text-right text-[13px] text-white/45">{title.length} / 50</p>

          <label className="mt-[28px] block text-[15px] text-white/75">
            본문
            <textarea
              className="mt-[10px] h-[210px] w-full resize-none rounded-[10px] border border-[#65d8c5] bg-[#30302f] px-[16px] py-[14px] text-white outline-none"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <p className="mt-[8px] text-right text-[13px] text-white/45">
            {content.length} / 1000
          </p>

          <div className="mt-[24px] flex justify-end gap-[10px]">
            <button
              className="rounded-[10px] border border-white/25 px-[22px] py-[12px] text-[14px] font-bold text-white/75"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920] disabled:opacity-40"
              type="submit"
              disabled={
                !title.trim() ||
                title.length > 50 ||
                !content.trim() ||
                content.length > 1000 ||
                updateMutation.isPending
              }
            >
              {updateMutation.isPending ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[32px] text-white">
      <button
        className="rounded-[10px] border border-white/25 px-[18px] py-[11px] text-[14px] text-white/75"
        type="button"
        onClick={() => navigate('/posts')}
      >
        ← 목록으로
      </button>

      <article className="mt-[22px] rounded-[18px] bg-[#30302f] px-[34px] py-[32px]">
        <h1 className="text-[28px] font-extrabold">{post.title}</h1>
        <div className="mt-[18px] flex gap-[12px] text-[14px]">
          <strong className="text-[#65d8c5]">{post.author}</strong>
          <span className="text-white/45">
            {new Date(post.createdAt).toLocaleDateString('ko-KR')}
          </span>
        </div>
        <p className="mt-[32px] min-h-[70px] whitespace-pre-wrap text-[16px] text-white/70">
          {post.content}
        </p>

        <div className="mt-[20px] flex justify-end gap-[10px] border-t border-white/15 pt-[22px]">
          <button
            className="rounded-[10px] border border-white/25 px-[22px] py-[12px] text-[14px] font-bold text-white/75"
            type="button"
            onClick={startEditing}
          >
            수정
          </button>
          <button
            className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920] disabled:opacity-40"
            type="button"
            disabled={deleteMutation.isPending}
            onClick={() => postId && deleteMutation.mutate(postId)}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </article>
    </main>
  )
}

function Message({ children }: { children: string }) {
  return <p className="py-[100px] text-center text-[15px] text-white/50">{children}</p>
}

export default PostDetailPage
