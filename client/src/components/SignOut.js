import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import Swal from 'sweetalert2';

const Signout = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

  useEffect(() => {
    const clearSession = async () => {
      try {
        // Delete the session from the server
        await fetch('/api/signout', { method: 'POST' });

        // Clear the Apollo cache
        await client.clearStore();

        // Redirect to the homepage
        navigate('/', { replace: true });

        // Show a success message
        Swal.fire({
          icon: 'success',
          title: 'Signed out successfully!',
        });
      } catch (error) {
        // Show an error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message,
        });
      }
    };

    clearSession();
  }, [client, navigate]);

  return (
    <div className="container py-5">
      <h1 className="text-center">Signing out...</h1>
    </div>
  );
};

export default Signout;
