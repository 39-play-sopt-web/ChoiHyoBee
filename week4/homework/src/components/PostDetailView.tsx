import type { Post } from '../apis/posts'

interface PostDetailViewProps {
  post: Post
  isDeleting: boolean
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

function PostDetailView({
  post,
  isDeleting,
  onBack,
  onEdit,
  onDelete,
}: PostDetailViewProps) {
  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[32px] text-white">
      <button
        className="rounded-[10px] border border-white/25 px-[18px] py-[11px] text-[14px] text-white/75"
        type="button"
        onClick={onBack}
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
            onClick={onEdit}
          >
            수정
          </button>
          <button
            className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920] disabled:opacity-40"
            type="button"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </article>
    </main>
  )
}

export default PostDetailView
