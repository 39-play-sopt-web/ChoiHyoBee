import { useQuery } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../apis/posts'

function BoardPage() {
  const [input, setInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const { data: posts = [], isPending, isError } = useQuery({
    queryKey: ['posts', keyword],
    queryFn: () => getPosts(keyword),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setKeyword(input.trim())
  }

  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[38px]">
      <form className="flex gap-[10px]" onSubmit={handleSubmit}>
        <input
          className="min-w-0 flex-1 rounded-[10px] border border-white/20 bg-[#30302f] px-[16px] py-[13px] text-[15px] text-white outline-none placeholder:text-white/25 focus:border-[#65d8c5]"
          placeholder="제목으로 검색"
          value={input}
          onChange={(event) => {
            const value = event.target.value
            setInput(value)
            if (!value.trim()) setKeyword('')
          }}
        />
        <button
          className="rounded-[10px] bg-[#65d8c5] px-[24px] text-[15px] font-bold text-[#181920] transition-colors hover:bg-[#8be5d7] disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={!input.trim()}
        >
          검색
        </button>
      </form>

      <section className="mt-[28px] flex flex-col gap-[16px]">
        {isPending && <Message>게시글을 불러오는 중입니다.</Message>}
        {isError && <Message>게시글을 불러오지 못했습니다.</Message>}
        {!isPending && !isError && posts.length === 0 && (
          <Message>게시글이 없습니다.</Message>
        )}

        {posts.map((post) => (
          <Link
            className="rounded-[16px] border border-transparent bg-[#30302f] px-[26px] py-[22px] text-white no-underline transition hover:border-[#65d8c5] hover:shadow-[0_0_20px_rgba(101,216,197,0.15)]"
            key={post.id}
            to={`/posts/${post.id}`}
          >
            <h2 className="text-[18px] font-bold">{post.title}</h2>
            <p className="mt-[10px] text-[14px] text-white/60">{post.content}</p>
            <div className="mt-[16px] flex items-center gap-[12px] text-[13px]">
              <strong className="text-[#65d8c5]">{post.author}</strong>
              <time className="text-white/45">
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </time>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

function Message({ children }: { children: string }) {
  return <p className="py-[80px] text-center text-[15px] text-white/50">{children}</p>
}

export default BoardPage
