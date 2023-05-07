import React from 'react';

const SignOut = () => {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default SignOut;
// import { useState } from 'react';

// const SignOutButton = () => {

//   const [authenticated, setAuthenticated] = useState(true);

//   const handleLogout = () => {
//     // Clear authentication token or session from local storage or cookies
//     localStorage.removeItem('authToken');

//     // Update authenticated state
//     setAuthenticated(false);

//     // Redirect to login page or public page
//     window.location.href = '/';
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default SignOutButton;
