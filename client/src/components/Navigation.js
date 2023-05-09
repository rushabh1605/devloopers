// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../firebase/Auth';
// import SignOutButton from './SignOut';
// import '../App.css';
// const Navigation = () => {
//   const { currentUser } = useContext(AuthContext);
//   return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
// };

// const NavigationAuth = () => {
//   return (
//     <nav className='navigation'>
//       <h1 className='App-title'>
//         Welcome to the SupaStrika
//       </h1>
//       <NavLink className='nav-links' to='/'>
//         Home
//       </NavLink>

//       <NavLink className='nav-links' to='/about'>
//         About
//       </NavLink>



//       <NavLink className='nav-links' to='/account'>
//         Account
//       </NavLink>

//       <SignOutButton />

//     </nav>
//   );
// };

// const NavigationNonAuth = () => {
//   return (
//     <nav className='navigation'>
//       <NavLink className='nav-links' to='/'>
//         Home
//       </NavLink>

//       <NavLink className='nav-links' to='/about'>
//         About us
//       </NavLink>

//       <NavLink className='nav-links' to='/game'>
//         Game
//       </NavLink>

//       <NavLink className='nav-links' to='/signin'>
//         LogIn
//       </NavLink>

//       <NavLink className='nav-links' to='/signup'>
//         SignUp
//       </NavLink>
//     </nav>
//   );
// };

// export default Navigation;


import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import AuthContext from './AuthContext';
import '../App.css';

const Navigation = () => {

  const sessionToken = sessionStorage.getItem('sessionToken');
  console.log(sessionToken);

  if (sessionToken) {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        
        <NavLink className='nav-links' to='/game'>
          Game
        </NavLink>
  
        <NavLink className='nav-links' to='/score'>
          Score
        </NavLink>
  
        <NavLink className='nav-links' to='/signout'>
          Sign Out
        </NavLink>
  
         {/* <NavLink className='nav-links' to='/signup'>
          SignUp
        </NavLink>  */}
      </nav>
    );
    
  } else {
    // the user is not logged in
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
  
        {/* <NavLink className='nav-links' to='/game'>
          Game
        </NavLink>
  
        <NavLink className='nav-links' to='/score'>
          Score
        </NavLink> */}
  
        <NavLink className='nav-links' to='/signin'>
          Log In
        </NavLink>
  
        <NavLink className='nav-links' to='/signup'>
          Sign Up
        </NavLink>
      </nav>
    );
  }

  
    // const getLoggedInStatus = async () => {
    //   const userSession = await checkLoggedIn();
      
    //   if (userSession) {
    //     return (
    //       <NavigationAuth />
    //     )
    //   } else {
    //     // User is not logged in
    //     return (
    //       <NavigationNonAuth />
    //     )
    //   }
    // };
  // const { currentUser } = useContext(AuthContext);
  // return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
  return <div>{<NavigationNonAuth/>}</div>

}
  


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


// const NavigationAuth = () => {
//   return (
//     <nav className='navigation'>
//       <h1 className='App-title'>
//         Welcome to the SupaStrikers
//       </h1>
//       <Link className='nav-links' to='/'>
//         Home
//       </Link>

//       <Link className='nav-links' to='/about'>
//         About
//       </Link>

//       <Link className='nav-links' to='/account'>
//         Account
//       </Link>

//       <SignOutButton />

//     </nav>
//   );
// };

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <Link className='nav-links' to='/'>
        Home
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
