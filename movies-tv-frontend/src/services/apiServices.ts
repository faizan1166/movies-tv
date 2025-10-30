import axios from "axios";
import type { ApiResponse, Movie, MovieFormData, PaginatedResponse } from "../types";

const API_BASE_URL = "https://movies-tv-kwi0.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const movieApi = {
  getAllMovies: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse> => {
    const response = await apiClient.get<PaginatedResponse>(
      `/movies?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getMovieById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  createMovie: async (data: MovieFormData): Promise<Movie> => {
    const response = await apiClient.post<Movie>("/movies", data);
    return response.data;
  },

  updateMovie: async (id: string, data: MovieFormData): Promise<Movie> => {
    const response = await apiClient.put<Movie>(`/movies/${id}`, data);
    return response.data;
  },

  deleteMovie: async (id: string): Promise<void> => {
    await apiClient.delete(`/movies/${id}`);
  },

  searchMovies: async (query: string): Promise<ApiResponse> => {
    const response = await apiClient.get<ApiResponse>(
      `/movies/search?q=${query}`
    );
    return response.data;
  },
};

export default apiClient;
