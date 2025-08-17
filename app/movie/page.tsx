'use client';
import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@hooks/useApi';
import { buildUrlWithQuery, isEmptyObject, compositeRoute } from '@utils/utils';
import { useFilter } from '@hooks/useFilter';
import { MovieRoutes } from '@/routes/MovieRoutes';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export interface Movie {
  _id: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  rating: number;
}

const MovieListPage: React.FC = () => {
  const router = useRouter();
  const { filters, resetFilters } = useFilter();
  const { user } = useUser();
  const { get, isLoading, error, data } = useApi<Movie[]>();

  const fetchMovies = useCallback(async () => {
    await get(buildUrlWithQuery('/api/movies', filters));
  }, [filters, get]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, filters]);

  const handleAddMovie = () => {
    router.push(MovieRoutes.addMovie);
  };

  const handleUpdateMovie = (id: string) => {
    router.push(compositeRoute(MovieRoutes.updateMovie, { id }));
  };

  const handleDeleteMovie = (id: string) => {
    router.push(compositeRoute(MovieRoutes.deleteMovie, { id }));
  };

  const handleFilterMovie = () => {
    router.push(`/movie/filters`);
  };

  const handleResetMovie = () => {
    resetFilters('/movie');
  };

  if (isLoading)
    return (
      <div>
        <Loader2 />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
   <div className="flex w-full gap-x-5">
    <div className="bg-emerald-500 h-screen w-1/2">Ionnnnn</div>
     <div>
       <h1 className="text-4xl font-bold font-mono pl-5">Movie List: {user?.email}</h1>
       <div className="flex gap-1">
         <button className="black_btn" onClick={handleAddMovie}>
           Add New Movie
         </button>
         <button className="black_btn" onClick={handleFilterMovie}>
           Filter Movie
         </button>
         {!isEmptyObject(filters) && (
           <button className="black_btn" onClick={handleResetMovie}>
             Reset Movie
           </button>
         )}
       </div>
       <ul className="space-y-3 mt-3 text-white">
         {data
           ?.sort((a, b) => a.title.localeCompare(b.title))
           .map((movie) => (
             <li key={movie._id}>
               <div className="bg-blue-400 p-2 space-y-1">
                 <h4>{movie.title}</h4>
                 <div className="font-serif font-light text-sm">
                   {movie.genre}
                 </div>
                 <div className="flex gap-1">
                   <button
                     className="black_btn"
                     onClick={() => handleUpdateMovie(movie._id)}
                   >
                     Update
                   </button>
                   <button
                     className="black_btn"
                     onClick={() => handleDeleteMovie(movie._id)}
                   >
                     Delete
                   </button>
                 </div>
               </div>
             </li>
           ))}
       </ul>
     </div>
   </div>
  );
};

export default MovieListPage;
