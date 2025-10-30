export interface Movie {
  _id: string;
  title: string;
  type: 'Movie' | 'TV Show';
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearOrTime: string;
  description: string;
  posterUrl: string;
  createdAt: string;
  __v?: number;
}

export interface ApiResponse {
  data: Movie[];
  nextCursor: string | null;
}

export interface MovieFormData {
  title: string;
  type: 'Movie' | 'TV Show';
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearOrTime: string;
  description: string;
  posterUrl: string;
}

export interface PaginatedResponse {
  data: Movie[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}