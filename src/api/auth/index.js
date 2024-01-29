// api/index.js
import axios from 'axios';

// Define your API base URL
const baseURL = 'https://login-with-otp-and-google-oauth-2-0-in-node-js.vercel.app/auth';

const api = axios.create({
  baseURL,
});

// Example function to make a POST request
const registerUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response; // Return the entire response object
  } catch (error) {
    // Handle specific error cases if needed
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network error, status code other than 2xx)
      console.error('Axios Error:', error.response || error.request || error.message);
    } else {
      // Handle other types of errors
      console.error('Error:', error.message);
    }

    throw error; // Re-throw the error to propagate it to the calling code
  }
};
const loginUser = async (userData) => {
    try {
      const response = await api.post('/login', userData);
      return response; 
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response || error.request || error.message);
      } else {
        console.error('Error:', error.message);
      }
  
      throw error; 
    }
  };
  const sendOTP = async (userData) => {
    try {
      const response = await api.post('/generateOtp', userData);
      return response; 
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response || error.request || error.message);
      } else {
        console.error('Error:', error.message);
      }
  
      throw error; 
    }
  };
  const verifyOTP = async (userData) => {
    try {
      const response = await api.post('/verifyOTP', userData);
      return response; 
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response || error.request || error.message);
      } else {
        console.error('Error:', error.message);
      }
  
      throw error; 
    }
  };

const google = async ()=>{
    const response = await api.get('/google')
    return response
}
export  {registerUser,loginUser,google,sendOTP,verifyOTP};
