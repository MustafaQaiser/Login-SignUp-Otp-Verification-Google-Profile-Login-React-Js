import React from 'react';
import logo from '../assets/logo.jpg';

const Logo = ({ style }) => {
  return (
    <img
      src={logo}
      alt='logo'
      style={{ ...style, /* any other styles you want to apply */ }}
    />
  );
};

export default Logo;
