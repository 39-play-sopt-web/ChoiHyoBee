import Header from '../components/Header'
import RatingFilter from '../components/RatingFilter'

function MovieListPage() {
  return (
    <>
      <Header />

      <main>
        <h2 className="mb-4 text-[20px] font-extrabold text-white pt-10 px-20 ">
        영화 둘러보기
      </h2>
        <RatingFilter />
      </main>
    </>
  )
}

export default MovieListPage