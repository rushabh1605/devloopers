import React from 'react';
import '../App.css';
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import SingleLeague from './SingleLeague';
import LeagueStats from './LeagueStats';
import Standings from './Standings';
import SinglePlayer from './SinglePlayer';
import Game from './Game';
//import logo from '../logo.jpg';
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
                      <Navigation />
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </header>

            <div className='App-body'>
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={<Landing />} />

                <Route path='/account' element={<PrivateRoute />}>
                  <Route path='/account' element={<Account />} />
                </Route>
                <Route path='/league/:leagueId' element={<SingleLeague />} />
                <Route path='/league/:leagueId/standings' element={<Standings />} />
                <Route path='/league/:leagueId/stats' element={<LeagueStats />} />
                <Route path='/player/:playerId' element={<SinglePlayer />} />
                <Route path='/game/' element={<Game />} />
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
