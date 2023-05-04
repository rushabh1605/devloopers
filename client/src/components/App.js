import React from 'react';
import '../App.css';
import {NavLink , BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
import About from './About';
import News from './News';
import NotFound from './NotFound';
import logo from '../logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';





const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
    <AuthProvider>
    <Router>
    <div className='App'>
      <header className='App-header'>
        
    <Navbar collapseOnSelect expand="lg" className='bg' >
    <Container>
      
    <Navbar.Brand ><span class="navbar-brand">SUPASTRIKERS</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" >
                <NavLink className='nav-links' to='/'>
                  Home
                </NavLink>

                <NavLink className='nav-links' to='/about'>
                  About
                </NavLink>

                <NavLink className='nav-links' to='/leagues'>
                  Leagues
                </NavLink>
                
                <NavLink className='nav-links' to='/account'>
                  Account
                </NavLink>

                <NavLink className='nav-links' to='/signin'>
                  LogIn
                </NavLink>

                <NavLink className='nav-links' to='/signup'>
                  SignUp
                </NavLink>


        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      </header>
      
      <div className='App-body'>
      <Routes>
        <Route path='/' element={<Landing />} />
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/news' element={<News />} />
          <Route path="/404" element={<NotFound />} />
      </Routes>
      </div>
      
    </div>
  </Router>
  </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
