import type { MovieListResponse } from '../types/movie'
import apiClient from './apiClient'

export async function getMovies(page = 1) {
  const response = await apiClient.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
    },
  })

  return response.data
}