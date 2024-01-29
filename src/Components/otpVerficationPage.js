import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { verifyOTP } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPVerificationPage = () => {
  const router = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
    }),
    onSubmit: async (values, helpers) => {
        try {
          const userString = localStorage.getItem('user');
          const user = userString ? JSON.parse(userString) : null;
      
          if (!user || !user.email) {
            console.error('User data or email is missing.');
            return;
          }
      
          // Call the verifyOTP function from your AuthContext or API
          const response = await verifyOTP({ email: user.email, otp: values.otp });
      
          if (response.data.success) {
            console.log('OTP verification successful');
      
            // Show success alert
            toast.success('OTP verification successful');
      
            // Wait for the alert to be displayed, then redirect
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 1000)),
              { success: 'OTP verification successful' }
            ).then(() => {
              // Redirect to the main page or perform other actions
              router('/');
            });
          } else {
            // OTP verification failed
            helpers.setErrors({ otp: 'Incorrect OTP' });
          }
        } catch (error) {
          console.error('Error during OTP verification:', error);
      
          // Show error alert
          toast.error('Error during OTP verification');
      
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
      },      
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="form"
        sx={{
          width: '300px',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background:'white'
        }}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Enter OTP
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="OTP"
          name="otp"
          type="text"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.otp && Boolean(formik.errors.otp)}
          helperText={formik.touched.otp && formik.errors.otp}
          sx={{ mb: 2 }}
        />
        {formik.errors.submit && (
          <Typography color="error" sx={{ mt: 1 }} variant="body2">
            {formik.errors.submit}
          </Typography>
        )}
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Verify OTP
        </Button>

        {/* ToastContainer for displaying alerts */}
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Box>
    </Box>
  );
};

export default OTPVerificationPage;
