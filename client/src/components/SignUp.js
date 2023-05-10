import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    dob: '',
    phone: '',
    email: '',
    country: '',
    profilePic: '',
    bio: '',
    isPremium: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [createUser, { loading, error, data }] = useMutation(queries.CREATE_USER, {
    onCompleted: async () => {
      console.log('User Created');
      navigate('/signin');

    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message.split(':')[1].trim().replace(/"/g, ''),
        confirmButtonText: "Fix it",
      });
      console.log(error)
      console.log(error.message.split(':')[1].trim().replace(/"/g, ''));
      console.log('User not created');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, dob, phone, email, country, bio } = formData
    if(!username || !password || !email || !dob || !phone || !country || !bio) {
      console.log('Something is empty');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please fill up all the fields',
        confirmButtonText: "Fix it",
      });
    } else{
      createUser({ variables: { username, password, dob, phone, email, country, bio } });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date
    });
  };

  return (
    <div class="col-md-4  offset-4 align-items-center ">
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

          <div className="form-group">
            <label htmlFor="dob" className='teamname' >Date of Birth</label>
            <DatePicker
              id="dob"
              className="form-control"
              dateFormat="MM/dd/yyyy"
              selected={formData.dob}
              onChange={handleDateChange}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          </div>
          

          <div className="form-group">
            <label htmlFor="phone" className='teamname' >Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className='teamname' >Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country" className='teamname' >Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio" className='teamname' >Bio</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
      </div>
    
  );
};

export default SignIn