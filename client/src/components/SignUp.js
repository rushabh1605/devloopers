import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react'
import queries from '../queries'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
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

  const [createUser, { loading }] = useMutation(queries.CREATE_USER, {
    variables: formData,
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully signed up!',
      });
      navigate('/signin')

      setFormData({
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
    },
    onError: (error) => {
      console.log(error);
    },
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, passowrd, dob, phone, email, country, profilePic, bio} = formData
    createUser({variables: {username, passowrd, dob, phone, email, country, profilePic, bio}});
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div class="col-md-6 align-items-center ">
      <div className="wsk-cp-matches" >

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className='teamname' >Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="password" className='teamname' >Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="dob" className='teamname' >Date of Birth</label>
          <DatePicker
            id="dob"
            className="form-control"
            dateFormat="MM/dd/yyyy"
            selected={formData.dob}
            onChange={formData.dob}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />

          <label htmlFor="phone" className='teamname' >Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="email" className='teamname' >Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="country" className='teamname' >Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <label htmlFor="bio" className='teamname' >Bio</label>
          <input
            type="text"
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />


        </div>
        <button type="submit" className="btn btn-primary">{loading ? "Creating user..." : "Create user"}</button>

      </form>

      
        <p className='teamname'>
        Have already an account ?{" "}
          <Link
            to={`/signin`}
            className="loginhere-link"
            variant="contained"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
    
  );
};

export default SignUp;
