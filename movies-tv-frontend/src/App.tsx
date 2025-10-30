import { useState, useEffect, useRef, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader2, AlertCircle, Search, Plus } from "lucide-react";
import Navbar from "./components/navbar/Navbar";
import AddEditModal from "./components/movie/AddEditModal";
import DeleteConfirmModal from "./components/movie/DeleteConfirmationModal";
import { movieApi } from "./services/apiServices";
import type { Movie, MovieFormData } from "./types";
import Button from "./components/globalButton/Button";
import MovieTable from "./components/movie/MovieTable";
import { debounce } from "./services/helper";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deletingMovie, setDeletingMovie] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const limit = 20;
  const initialLoadDone = useRef(false);

  const loadMovies = async (pageNum = 1, isInitial = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      setError(null);

      const response = await movieApi.getAllMovies(pageNum, limit);
      const { data, pagination } = response;

      if (pageNum === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }

      setHasMore(pagination.hasNext);
      setPage(pagination.page + 1);
      setIsSearchMode(false);

      if (isInitial) {
        initialLoadDone.current = true;
      }
    } catch (err: any) {
      console.error("Error loading movies:", err);
      setError(err.response?.data?.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialLoadDone.current) {
      loadMovies(1, true);
    }
  }, []);

  const handleAddMovie = async (data: MovieFormData) => {
    try {
      const newMovie = await movieApi.createMovie(data);
      setMovies((prev) => [newMovie, ...prev]);
      setIsAddModalOpen(false);
    } catch (err: any) {
      console.error("Error adding movie:", err);
      throw err;
    }
  };

  const handleUpdateMovie = async (data: MovieFormData) => {
    if (!editingMovie) return;
    try {
      const updatedMovie = await movieApi.updateMovie(editingMovie._id, data);
      setMovies((prev) =>
        prev.map((movie) =>
          movie._id === editingMovie._id ? updatedMovie : movie
        )
      );
      setEditingMovie(null);
    } catch (err: any) {
      console.error("Error updating movie:", err);
      throw err;
    }
  };

  const handleDeleteMovie = async () => {
    if (!deletingMovie) return;

    try {
      setIsDeleting(true);
      await movieApi.deleteMovie(deletingMovie.id);
      setMovies((prev) =>
        prev.filter((movie) => movie._id !== deletingMovie.id)
      );
      setDeletingMovie(null);
    } catch (err: any) {
      console.error("Error deleting movie:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadMovies(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await movieApi.searchMovies(query);
      setMovies(response.data);
      setHasMore(false);
      setIsSearchMode(true);
    } catch (err: any) {
      console.error("Error searching movies:", err);
      setError("Search failed. Loading all movies...");
      loadMovies(1);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      handleSearch(query);
    }, 500),
    []
  );

  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else if (isSearchMode) {
      loadMovies(1);
    }
  }, [searchQuery]);

  const handleLoadMore = () => {
    if (!isSearchMode && hasMore) {
      loadMovies(page);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-900 text-white">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-4 py-4 h-[calc(100vh-80px)] flex flex-col">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-3 gap-4 flex-shrink-0">
          <div className="relative max-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies or TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
          >
            Add Movies
          </Button>
        </div>

        {loading && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400 text-lg">Loading movies...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No movies found</p>
            <p className="text-gray-500 text-sm">
              {searchQuery
                ? "Try a different search term"
                : "Add your first movie to get started"}
            </p>
          </div>
        ) : (
          <div id="scrollableDiv" className="flex-1 overflow-auto min-h-0">
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={movies.length}
              next={handleLoadMore}
              hasMore={hasMore && !isSearchMode}
              loader={
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
              }
              endMessage={
                <p className="text-center text-gray-400 py-6">
                  {isSearchMode ? "End of search results" : "All caught up!"}
                </p>
              }
              scrollThreshold={0.9}
            >
              <MovieTable
                movies={movies}
                setDeletingMovie={setDeletingMovie}
                setEditingMovie={setEditingMovie}
              />
            </InfiniteScroll>
          </div>
        )}
      </main>

      <AddEditModal
        isOpen={isAddModalOpen || editingMovie !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMovie(null);
        }}
        onSubmit={editingMovie ? handleUpdateMovie : handleAddMovie}
        editMovie={editingMovie}
      />

      <DeleteConfirmModal
        isOpen={deletingMovie !== null}
        onClose={() => setDeletingMovie(null)}
        onConfirm={handleDeleteMovie}
        title={deletingMovie?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default App;
