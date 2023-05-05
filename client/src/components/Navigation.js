import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import logo from './img/logo.png';
const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className='navigation'>
      <img src={logo} className='App-logo' alt='logo' />
      <h1 className='App-title'>
        Welcome to the SupaStrika
      </h1>
      <ul>
        <li>
          <NavLink to='/'>Landing</NavLink>
        </li>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/account'>Account</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/news'>News</NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink to='/'>Landing</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Sign-up</NavLink>
        </li>

        <li>
          <NavLink to='/signin'>Sign-In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
