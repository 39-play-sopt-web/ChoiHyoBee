import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../apis/posts'

function CreatePostPage() {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      alert(`${author}님의 게시글이 작성되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    },
    onError: () => alert('게시글 작성에 실패했습니다.'),
  })

  const isDisabled =
    (step === 0 && (!title.trim() || title.length > 50)) ||
    (step === 1 && (!content.trim() || content.length > 1000)) ||
    (step === 2 && (!author.trim() || author.length > 20)) ||
    isPending

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (step < 2) {
      setStep(step + 1)
      return
    }

    mutate({ title: title.trim(), content: content.trim(), author: author.trim() })
  }

  return (
    <main className="mx-auto w-[calc(100%_-_40px)] max-w-[1000px] py-[44px] text-white">
      <h1 className="text-[32px] font-extrabold">글쓰기</h1>

      <form className="mt-[36px]" onSubmit={handleSubmit}>
        {step === 0 && (
          <Field label="제목" count={`${title.length} / 50`} error={title.length > 50}>
            <input
              autoFocus
              className="w-full rounded-[10px] border border-white/20 bg-[#30302f] px-[16px] py-[14px] text-[15px] outline-none focus:border-[#65d8c5]"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>
        )}

        {step === 1 && (
          <Field label="본문" count={`${content.length} / 1000`} error={content.length > 1000}>
            <textarea
              autoFocus
              className="h-[210px] w-full resize-none rounded-[10px] border border-white/20 bg-[#30302f] px-[16px] py-[14px] text-[15px] outline-none focus:border-[#65d8c5]"
              placeholder="본문을 입력하세요"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </Field>
        )}

        {step === 2 && (
          <Field label="작성자" count={`${author.length} / 20`} error={author.length > 20}>
            <input
              autoFocus
              className="w-full rounded-[10px] border border-white/20 bg-[#30302f] px-[16px] py-[14px] text-[15px] outline-none focus:border-[#65d8c5]"
              placeholder="작성자를 입력하세요"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </Field>
        )}

        <div className="mt-[24px] flex justify-end gap-[10px]">
          <button
            className="rounded-[10px] border border-white/25 bg-transparent px-[22px] py-[12px] text-[14px] font-bold text-white/75"
            type="button"
            onClick={() => navigate('/posts')}
          >
            목록으로
          </button>
          <button
            className="rounded-[10px] bg-[#65d8c5] px-[22px] py-[12px] text-[14px] font-bold text-[#181920] transition-colors hover:bg-[#8be5d7] disabled:cursor-not-allowed disabled:opacity-40"
            type="submit"
            disabled={isDisabled}
          >
            {step === 2 ? (isPending ? '작성 중...' : '작성') : '다음'}
          </button>
        </div>
      </form>
    </main>
  )
}

interface FieldProps {
  label: string
  count: string
  error: boolean
  children: React.ReactNode
}

function Field({ label, count, error, children }: FieldProps) {
  return (
    <label className="block text-[15px] text-white/75">
      {label}
      <div className="mt-[10px]">{children}</div>
      <p className={`mt-[8px] text-right text-[13px] ${error ? 'text-red-400' : 'text-white/45'}`}>
        {error ? `글자 수를 초과했습니다. ${count}` : count}
      </p>
    </label>
  )
}

export default CreatePostPage
