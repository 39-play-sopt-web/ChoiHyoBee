import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function PostDetailPage() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('1단계 제목입니다')
  const [content, setContent] = useState('본문을 써야겠죠')

  const handleEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsEditing(false)
  }

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
          <p className="mt-[8px] text-right text-[13px] text-white/45">{content.length} / 1000</p>

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
              disabled={!title.trim() || title.length > 50 || !content.trim() || content.length > 1000}
            >
              수정 완료
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
        <h1 className="text-[28px] font-extrabold">{title}</h1>
        <div className="mt-[18px] flex gap-[12px] text-[14px]">
          <strong className="text-[#65d8c5]">이름</strong>
          <span className="text-white/45">2026. 10. 24.</span>
        </div>
        <p className="mt-[32px] min-h-[70px] text-[16px] text-white/70">{content}</p>

        <div className="mt-[20px] flex justify-end gap-[10px] border-t border-white/15 pt-[22px]">
          <button
            className="rounded-[10px] border border-white/25 px-[22px] py-[12px] text-[14px] font-bold text-white/75"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
          <button
            className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920]"
            type="button"
          >
            삭제
          </button>
        </div>
      </article>
    </main>
  )
}

export default PostDetailPage
