import { useState, type FormEvent } from 'react'

const posts = [
  {
    id: 1,
    title: '쿸',
    content: '키키키키키',
    author: '카카카카카',
    date: '2026. 10. 24. 오후 01:54',
  },
]

function BoardPage() {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[38px]">
      <form className="flex gap-[10px]" onSubmit={handleSubmit}>
        <input
          className="min-w-0 flex-1 rounded-[10px] border border-white/20 bg-[#30302f] px-[16px] py-[13px] text-[15px] text-white outline-none placeholder:text-white/25 focus:border-[#65d8c5]"
          placeholder="제목으로 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button
          className="rounded-[10px] bg-[#65d8c5] px-[24px] text-[15px] font-bold text-[#181920] transition-colors hover:bg-[#8be5d7] disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={!keyword.trim()}
        >
          검색
        </button>
      </form>

      <section className="mt-[28px] flex flex-col gap-[16px]">
        {posts.map((post) => (
          <article
            className="rounded-[16px] border border-transparent bg-[#30302f] px-[26px] py-[22px] text-white transition hover:border-[#65d8c5] hover:shadow-[0_0_20px_rgba(101,216,197,0.15)]"
            key={post.id}
          >
            <h2 className="text-[18px] font-bold">{post.title}</h2>
            <p className="mt-[10px] text-[14px] text-white/60">{post.content}</p>
            <div className="mt-[16px] flex items-center gap-[12px] text-[13px]">
              <strong className="text-[#65d8c5]">{post.author}</strong>
              <time className="text-white/45">{post.date}</time>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default BoardPage
