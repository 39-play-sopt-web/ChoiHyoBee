import { NavLink } from 'react-router-dom'

const navStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-[#65d8c5] no-underline' : 'text-white/70 no-underline'

function Header() {
  return (
    <header className="flex h-[55px] items-center border-b border-white/10 bg-[#181920] px-[10px]">
      <p className="text-[16px] leading-none font-extrabold tracking-[-0.02em] text-[#65d8c5]">
        PLAY SOPT BOARD
      </p>
      <span className="ml-[16px] rounded-full border border-white/10 px-[12px] py-[7px] text-[14px] font-bold text-[#65d8c5]">
        WEB 파트
      </span>
      <nav className="ml-auto flex items-center gap-[36px] text-[13px] font-semibold">
        <NavLink className={navStyle} end to="/posts">
          게시글 목록
        </NavLink>
        <NavLink className={navStyle} to="/posts/new">
          글쓰기
        </NavLink>
        <button className="border-0 bg-transparent p-0 text-white/70">로그아웃</button>
      </nav>
    </header>
  )
}

export default Header
