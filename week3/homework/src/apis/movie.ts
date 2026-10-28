import type { MovieListResponse } from '../types/movie'
import apiClient from './apiClient'

interface GetMoviesParams {
  page?: number
  minRating?: number
  maxRating?: number
}

export async function getMovies({
  page = 1,
  minRating,
  maxRating,
}: GetMoviesParams = {}) {
  const response = await apiClient.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      'vote_average.gte': minRating,
      'vote_average.lte': maxRating,
    },
  })

  return response.data
}
