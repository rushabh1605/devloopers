import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
const Navigation = () => {
  // const { currentUser } = useContext(AuthContext);
  // return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
  return <div>{<NavigationNonAuth/>}</div>
};

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
