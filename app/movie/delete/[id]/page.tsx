'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@hooks/useApi';
import { Movie } from '../../page';
import { useToast } from '@/components/ui/use-toast';

const DeleteMoviePage = ({ params }: any) => {
  const { successToast, errorToast } = useToast();
  const { id } = params;
  const router = useRouter();
  const api = useApi<Movie>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = async () => {
    const result = await api.get(`/api/movies/${id}`);
    if (result.data) {
      setMovie(result.data);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, []);

  const handleDelete = async () => {
    try {
      const result = await api.delete(`/api/movies/${id}`);
      if (result.data) {
        router.push('/movie');
        successToast({
          title: 'Success!',
          description: 'movie successfully deleted.',
        });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorToast({
          title: 'Error!',
          description: e.message || 'An unknown error occurred.',
        });
      } else {
        errorToast({
          title: 'Error!',
          description: 'An unknown error occurred.',
        });
      }
    }
  };

  return (
    <div className="bg-black text-white space-y-4">
      <h1>Delete Movie</h1>
      {movie && (
        <div>
          <p>Are you sure you want to delete {movie.title}?</p>
          <div className="flex gap-2">
            <button className="orange_gradient" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button
              className="orange_gradient"
              onClick={() => router.push('/movie')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteMoviePage;
