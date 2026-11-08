import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { issueCode, type Part } from '../apis/auth'

function AuthPage() {
  const [part, setPart] = useState<Part | ''>('')
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: issueCode,
    onSuccess: (authorizationCode) => {
      localStorage.setItem('authorizationCode', authorizationCode)
      navigate('/posts')
    },
  })

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#181920] px-[20px] text-white">
      <section className="w-full max-w-[430px] text-center">
        <h1 className="text-[28px] font-extrabold">회원 코드 발급</h1>
        <p className="mt-[12px] text-[14px] text-white/45">
          파트를 선택해 회원 코드를 발급받으세요.
        </p>

        <div className="mt-[28px] flex gap-[10px]">
          <select
            className="min-w-0 flex-1 rounded-[7px] border border-white/10 bg-white/10 px-[12px] text-[14px] outline-none"
            value={part}
            onChange={(event) => setPart(event.target.value as Part | '')}
          >
            <option value="">파트를 선택하세요</option>
            <option value="WEB">WEB</option>
            <option value="iOS">iOS</option>
            <option value="ANDROID">ANDROID</option>
          </select>

          <button
            className="rounded-[7px] bg-[#65d8c5] px-[18px] py-[11px] text-[14px] font-bold text-[#181920] transition-colors hover:bg-[#8be5d7] disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={!part || isPending}
            onClick={() => part && mutate(part)}
          >
            {isPending ? '발급 중...' : '코드 발급받기'}
          </button>
        </div>

        <button
          className="mt-[12px] w-full rounded-[7px] border border-white/15 bg-transparent py-[11px] text-[14px] text-white/75 transition-colors hover:bg-white/10"
          type="button"
          onClick={() => navigate('/posts')}
        >
          게시판 바로가기
        </button>

        {isError && (
          <p className="mt-[14px] text-[13px] text-red-400">
            코드 발급에 실패했습니다. 다시 시도해 주세요.
          </p>
        )}
      </section>
    </main>
  )
}

export default AuthPage
