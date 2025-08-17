'use client';

import { Button, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import Head from 'next/head';

interface LoginForm {
  email: string;
  id: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', id: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, id } = formData;

    if (!email || !id) {
      setError('Please enter both email and ID.');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, id }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Login - School Management System</title>
      </Head>
      <Box
        className="flex justify-center items-center h-screen bg-gradient-to-r from-[#f4f7f6] to-[#ffffff]"
        sx={{ backgroundColor: '#f4f7f6' }}
      >
        <Box
          className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full"
          sx={{ maxWidth: '400px', width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <Typography variant="h4" color="primary" className="text-center mb-6 text-[#576086]" sx={{ fontWeight: 600,}}>
            School Management System
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ marginBottom: '16px' }}
              />
            </div>
            <div className="mb-5">
              <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                sx={{ marginBottom: '16px' }}
              />
            </div>
            {error && (
              <Typography variant="body2" color="error" className="text-center mb-4">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#ff9a8b',
                '&:hover': {
                  backgroundColor: '#ff6f6b',
                },
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
