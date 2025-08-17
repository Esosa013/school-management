'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@hooks/useApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Movie } from '../page';
import { validationSchema, defaultValues } from './constant';
import { LoaderCircle } from 'lucide-react';
import { useFormValidator } from '@/hooks/useFormValidator';
import { useToast } from '@/components/ui/use-toast';

const AddMoviePage: React.FC = () => {
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const api = useApi<Movie>();
  const onSubmit = async (data: Omit<Movie, '_id'>) => {
    try {
      const result = await api.post(`/api/movies`, data);
      if (result.data) {
        router.push('/movie');
        successToast({
          title: 'Success!',
          description: 'New movie added.',
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
  const { control, handleSubmit, formState } = useFormValidator({
    validationSchema,
    defaultValues,
  });

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
          {formState.isSubmitting ? <LoaderCircle /> : 'Add Movie'}
        </Button>
      </form>
      {api.error && <div>Error: {api.error.message}</div>}
    </div>
  );
};

export default AddMoviePage;
