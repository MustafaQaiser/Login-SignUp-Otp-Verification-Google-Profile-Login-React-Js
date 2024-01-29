// AuthContext.js

import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { loginUser,sendOTP } from '../api/auth';




const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN_GOOGLE: 'SIGN_IN_GOOGLE',  // New action for Google sign-in
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const { user, token } = action.payload || {};

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
            token,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { user, token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      token,
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    const { user, token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      token,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: null,
    };
  },
  [HANDLERS.SIGN_IN_GOOGLE]: (state, action) => {
    const { user, token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      token,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = useCallback(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    const loadUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        const isValidToken = await validateToken(token);

        if (isValidToken) {
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: { user, token },
          });
        } else {
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: {},
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    };

    if (isAuthenticated) {
      loadUserData();
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  }, [dispatch]);

  const validateToken = async (token) => {
    try {
      const encodedToken = encodeURIComponent(token);
      const response = await axios.get('http://localhost:3001/secure-route', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${encodedToken}`,
        },
      });

      console.log('Token validation response:', response);

      if (response.data && response.data.isValid !== undefined) {
        return response.data.isValid;
      } else {
        console.error('Invalid response format:', response);
        return false;
      }
    } catch (error) {
      localStorage.clear();
      console.error('Token validation failed:', error);
      return false;
    }
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  const signIn = async (email, password) => {
    try {
      // Replace the following line with the correct path to your `loginUser` function
      const response = await loginUser({ username: email, password: password });
      const { user, token } = response.data;
  
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: { user, token },
      });
  
      // Generate and send OTP
      await sendOTP({email:user.email});

     
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };
  

  // Dummy sign-up function for testing
  const signUp = async (username, email, password) => {
    try {
      const user = { username, email };
      const token = 'dummytoken';

      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      dispatch({
        type: HANDLERS.SIGN_UP,
        payload: { user, token },
      });
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw new Error('Sign-up failed. Please try again.');
    }
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const signInGoogle = (user, token) => {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    dispatch({
      type: HANDLERS.SIGN_IN_GOOGLE,
      payload: { user, token },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        signInGoogle,  // Add the new signInGoogle function to the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
