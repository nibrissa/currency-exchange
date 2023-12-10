import React from 'react';

const RootPage = () => {
  if (window.location.pathname === '/' && localStorage.getItem('token')) {
    window.location.pathname = '/convert'
  } else if (window.location.pathname === '/' && !localStorage.getItem('token')) {
    window.location.pathname = '/signup'
  }
};

export default RootPage;