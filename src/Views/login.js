import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Layout as AuthLayout } from '../Layouts/auth/layouts';
import Logo from '../Components/Logo';
import { useAuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const authContext = useAuthContext();
  const { signIn } = authContext;
  const router = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password);
        router('/otp-verification-page');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleRegisterClick = useCallback(() => {
    router('/register');
  }, [router]);

  const handleSkip = async () => {
    try {
      // Redirect the user to the Google authentication page on your server
      window.location.href = 'http://localhost:3001/auth/google';
    } catch (error) {
      console.error('Error redirecting to Google:', error);
      // Handle the error if needed
    }
  };

//   // In your component, you can use a useEffect to handle the response after redirection
//   useEffect(() => {
//     const handleGoogleResponse = async () => {
//       try {
//         // Make a request to get the response from the server
//         const response = await axios.get('http://localhost:3001/auth/google/callback');

//         // Handle the response as needed
//         const { token, user } = response.data;
//         console.log('Google authentication response:', { token, user });

//         // Perform additional actions with the response (e.g., set user in state)
//       } catch (error) {
//         console.error('Error handling Google response:', error);
//         // Handle the error if needed
//       }
//     };

//     // Call the function to handle the response
//     handleGoogleResponse();
//   }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account?&nbsp;
                <Button onClick={handleRegisterClick} variant="link">
                  Register
                </Button>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
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
              <FormHelperText sx={{ mt: 1 }}>
                Optionally you can skip.
              </FormHelperText>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
              <Button  fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
                Login With Google 
              </Button>
            </form>

          </div>
        </Box>
      </Card>
    </Box>
  );
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;


