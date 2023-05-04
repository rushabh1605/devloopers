import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <Navigation />
          </header>
        </div>
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
      </Router>
    </AuthProvider>
  );
}

export default App;