'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@hooks/useApi';
import { Movie } from '../../page';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validationSchema } from '../../add/constant';
import { LoaderCircle } from 'lucide-react';
import { useFormValidator } from '@/hooks/useFormValidator';
import { useToast } from '@/components/ui/use-toast';

const UpdateMoviePage = ({ params }: any) => {
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const { id } = params;
  const api = useApi<Movie>();
  const [initialValues, setInitialValues] = useState<Omit<Movie, '_id'> | null>(
    null
  );

  const fetchMovie = async () => {
    try {
      const result = await api.get(`/api/movies/${id}`);
      if (result.data) {
        setInitialValues(result.data);
      } else {
        errorToast({
          title: 'Error!',
          description: 'Movie not found.',
        });
        router.push('/movie');
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

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  const onSubmit = async (data: Omit<Movie, '_id'>) => {
    try {
      const result = await api.put(`/api/movies/${id}`, data);
      if (result.data) {
        router.push('/movie');
        successToast({
          title: 'Success!',
          description: 'Your operation was successful.',
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

  const { control, handleSubmit, formState, reset } = useFormValidator({
    validationSchema,
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        year: initialValues.year,
        genre: initialValues.genre,
        director: initialValues.director,
        rating: initialValues.rating,
      });
    }
  }, [initialValues, reset]);

  if (!initialValues) {
    return <LoaderCircle className="mx-auto mt-7" />;
  }

  return (
    <div className="mt-14">
      <h1>Edit Movie</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col"
      >
        <Input name="title" control={control} placeholder="Movie Title" />
        <Input name="year" control={control} placeholder="Movie Year" />
        <Input name="genre" control={control} placeholder="Movie Genre" />
        <Input name="director" control={control} placeholder="Movie Director" />
        <Input name="rating" control={control} placeholder="Movie Rating" />
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? <LoaderCircle /> : 'Edit Movie'}
        </Button>
      </form>
      {api.error && <div>Error: {api.error.message}</div>}
    </div>
  );
};

export default UpdateMoviePage;
