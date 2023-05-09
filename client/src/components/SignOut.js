import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';


const SignOutButton = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  sessionStorage.removeItem('sessionToken');


  // if (sessionCheck) {
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Signed out successfully!',
    // });
    window.location.href = 'http://localhost:3000/';
    //window.location.reload();
    // navigate('/', { replace: true });
  // }
  // else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Unable to Logout!',
  // });
  // navigate('/', { replace: true });  
  // }

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
