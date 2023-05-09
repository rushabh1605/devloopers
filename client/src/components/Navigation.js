import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import AuthContext from './AuthContext';
import '../App.css';

const Navigation = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <NavigationAuth />;
  } else {
    return <NavigationNonAuth />;
  }
};
  


// const checkLoggedIn = async () => {
//   // Check if the user session exists in Redis
//   const sessionData = await redis.get(`session:${userId}`);
  
//   if (sessionData) {
//     const session = JSON.parse(sessionData);
    
//     // Return the user ID and session data
//     return { userId, session };
//   } else {
//     // User is not logged in
//     return null;
//   }
// };


const NavigationAuth = () => {
  return (
    <nav className='navigation'>
      <h1 className='App-title'>
        Welcome to the SupaStrikers
      </h1>
      <Link className='nav-links' to='/'>
        Home
      </Link>

      <Link className='nav-links' to='/about'>
        About
      </Link>

      <Link className='nav-links' to='/account'>
        Account
      </Link>

      <SignOutButton />

    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <Link className='nav-links' to='/'>
        Home
      </Link>

      <Link className='nav-links' to='/about'>
        About
      </Link>

      <Link className='nav-links' to='/signin'>
        LogIn
      </Link>

      <Link className='nav-links' to='/signup'>
        SignUp
      </Link>
    </nav>
  );
};

export default Navigation;
