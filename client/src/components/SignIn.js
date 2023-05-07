import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { loading, error, data } = useQuery(queries.LOGIN, {
    variables: {
      username: formData.username,
      password: formData.password,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // Check if the user exists in the database
    if (data && data.Login) {
      console.log('User exists');
    } else {
      console.log('User does not exist');
    }
  };

  return (
    <div class="col-md-6 align-items-center ">
      <div className="wsk-cp-matches" >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className='teamname'>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='teamname'>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default SignIn
