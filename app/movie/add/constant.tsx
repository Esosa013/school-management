import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  genre: yup.string().required('Please input a genre'),
  director: yup.string().required('Please input a director'),
  year: yup.number().positive().integer().required('Please input a genre'),
  rating: yup.number().required('required'),
});

export const defaultValues = {
  title: '',
  year: new Date().getFullYear(),
  genre: '',
  director: '',
  rating: 1,
};
