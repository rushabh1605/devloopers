import React from 'react';
import { useState } from 'react';

const SignOutButton = () => {

  const [authenticated, setAuthenticated] = useState(true);

  const handleLogout = () => {
    // Clear authentication token or session from local storage or cookies
    localStorage.removeItem('authToken');

    // Update authenticated state
    setAuthenticated(false);

    // Redirect to login page or public page
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default SignOutButton;