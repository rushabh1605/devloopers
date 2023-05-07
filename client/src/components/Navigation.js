import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className='navigation'>
      <h1 className='App-title'>
        Welcome to the SupaStrika
      </h1>
      <NavLink className='nav-links' to='/'>
        Home
      </NavLink>

      <NavLink className='nav-links' to='/about'>
        About
      </NavLink>



      <NavLink className='nav-links' to='/account'>
        Account
      </NavLink>

      <SignOutButton />

    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <NavLink className='nav-links' to='/'>
        Home
      </NavLink>

      <NavLink className='nav-links' to='/about'>
        About us
      </NavLink>

      <NavLink className='nav-links' to='/game'>
        Game
      </NavLink>

      <NavLink className='nav-links' to='/signin'>
        LogIn
      </NavLink>

      <NavLink className='nav-links' to='/signup'>
        SignUp
      </NavLink>
    </nav>
  );
};

export default Navigation;
