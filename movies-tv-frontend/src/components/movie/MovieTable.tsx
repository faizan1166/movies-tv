import React from "react";
import type { Movie } from "../../types";
import { Edit, Trash } from "lucide-react";

interface TableProps {
  movies: Movie[];
  setEditingMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  setDeletingMovie: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
    } | null>
  >;
}

const MovieTable: React.FC<TableProps> = ({
  movies,
  setEditingMovie,
  setDeletingMovie,
}) => {
  return (
    <div className="overflow-x-auto bg-slate-800/40 rounded-lg shadow-lg ">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-slate-800/70 text-gray-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Director</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie._id}
              className="border-t border-slate-700 hover:bg-slate-700/50 transition"
            >
              <td className="px-4 py-2 font-medium">{movie.title}</td>
              <td className="px-4 py-2">{movie.type}</td>
              <td className="px-4 py-2">{movie.director || "-"}</td>
              <td className="px-4 py-2">{movie.yearOrTime || "-"}</td>
              <td className="px-4 py-2">{movie.duration || "-"}</td>
              <td className="px-4 py-2">{movie.budget || "-"}</td>
              <td className="px-4 py-2 text-right space-x-3">
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                >
                  <Edit className="h-4 w-4"/>
                </button>
                <button
                  onClick={() =>
                    setDeletingMovie({
                      id: movie._id,
                      title: movie.title,
                    })
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash className="h-4 w-4"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
