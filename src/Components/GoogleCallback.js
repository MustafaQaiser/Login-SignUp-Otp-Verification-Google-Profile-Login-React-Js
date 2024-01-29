// GoogleCallback.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';  // Update the path

const GoogleCallback = () => {
  const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
  const router = useNavigate();
  const authContext = useAuthContext();  // Use the useAuthContext hook to get the context

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Make a request to the server to validate the token
        const response = await axios.get('http://localhost:3001/auth/validate', { withCredentials: true });

        console.log(response);

        // Handle the response as needed
        const { user, token } = response.data;

        // Call the signInGoogle function from the context to handle the user and token
        authContext.signInGoogle(user, token);

        router('/');
        // Update state with user details
        // setUser(user1);
        // setToken(token);
        // console.log(tokenFromResponse, userFromResponse);
      } catch (error) {
        console.error('Error handling Google response:', error);
        // Handle the error if needed
      } finally {
        // Update state to indicate that loading is complete
        setLoading(false);
      }
    };

    // Call the function to handle the response
    handleGoogleCallback();
  }, [authContext, router]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ):''}
    </div>
  );
};

export default GoogleCallback;
