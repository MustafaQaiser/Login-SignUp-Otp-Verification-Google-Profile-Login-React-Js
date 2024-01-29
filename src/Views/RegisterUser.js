import React ,{useCallback}from 'react';
import { Box, Button, Stack, TextField, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../Components/Logo';
import {registerUser} from '../api/auth/index';
import { Layout as AuthLayout } from '../Layouts/auth/layouts';

const Page = () => {
  const router = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      name: Yup.string().max(255).required('Name is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await registerUser({
          username: values.name,
          email: values.email,
          password: values.password,
        });
        console.log('API response:', response);
        router('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      console.log('submit');
    },
  });
  const handleLoginClick = useCallback(() => {
    router('/login');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          p: 2,
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0', width: '100%' }}>
          <Logo style={{ borderRadius: '50%', maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>


        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px !important',
              width: '100%',
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h5">Register</Typography>
                <Typography color="text.secondary" variant="body2">
                  Already have an account?&nbsp;
                  <Button onClick={handleLoginClick} variant="link">
                  Login
                </Button>
                </Typography>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
