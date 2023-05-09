import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';


const SignOutButton = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // Clear the user's session from Redis
    // await redisClient.del(`session:${currentUser.username}`);

    // Update the current user context
    setCurrentUser(null);

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div>
    <h2>Are you sure you want to sign out?</h2>
    <button onClick={handleSignOut}>Sign Out</button>
  </div>
  );
};

export default SignOutButton;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useApolloClient } from '@apollo/client';
// import Swal from 'sweetalert2';

// const Signout = () => {
//   const navigate = useNavigate();
//   const client = useApolloClient();

//   useEffect(() => {
//     const clearSession = async () => {
//       try {
//         // Delete the session from the server
//         await fetch('/api/signout', { method: 'POST' });

//         // Clear the Apollo cache
//         await client.clearStore();

//         // Redirect to the homepage
//         navigate('/', { replace: true });

//         // Show a success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Signed out successfully!',
//         });
//       } catch (error) {
//         // Show an error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: error.message,
//         });
//       }
//     };

//     clearSession();
//   }, [client, navigate]);

//   return (
//     <div className="container py-5">
//       <h1 className="text-center">Signing out...</h1>
//     </div>
//   );
// };

// export default Signout;
