'use client';
import React from 'react';
import useApi from '@hooks/useApi';
import { Movie } from '../page';
import { useFilter } from '@/hooks/useFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useFormValidator } from '@/hooks/useFormValidator';
import { useToast } from '@/components/ui/use-toast';

const MovieFilterPage = () => {
  const { successToast, errorToast } = useToast();
  const { applyFilters } = useFilter();
  const api = useApi<Movie>();
  const onSubmit = async (data: { genre: string }) => {
    try {
      applyFilters('/movie', data);
      successToast({
        title: 'Success!',
        description: 'movies filtered.',
      });
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
  const { control, handleSubmit, formState } = useFormValidator({});

  return (
    <div className="mt-14">
      <h1>Filter Movie</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col"
      >
        <Input name="genre" control={control} placeholder="Movie Genre" />
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? <LoaderCircle /> : 'Filter'}
        </Button>
      </form>
      {api.error && <div>Error: {api.error.message}</div>}
    </div>
  );
};
export default MovieFilterPage;
