import { useState, type FormEvent } from 'react'
import type { Post } from '../apis/posts'

interface PostEditFormProps {
  post: Post
  isPending: boolean
  onCancel: () => void
  onSubmit: (title: string, content: string) => void
}

function PostEditForm({ post, isPending, onCancel, onSubmit }: PostEditFormProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(title.trim(), content.trim())
  }

  const isDisabled =
    !title.trim() || title.length > 50 || !content.trim() || content.length > 1000 || isPending

  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[44px] text-white">
      <h1 className="text-[32px] font-extrabold">게시글 수정</h1>

      <form className="mt-[34px]" onSubmit={handleSubmit}>
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
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920] disabled:opacity-40"
            type="submit"
            disabled={isDisabled}
          >
            {isPending ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default PostEditForm
