import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react'
import queries from '../queries'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
  
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

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser();
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
        
      {/* <form onSubmit={handleFormSubmit} className="p-4 bg-light">
      <h2 className="mb-3">Signup</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input type="text" className="form-control" id="dob" placeholder="Date of Birth" onChange={e => setDob(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="text" className="form-control" id="phone" placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" className="form-control" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" className="form-control" id="country" placeholder="Country" onChange={e => setCountry(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="profilePic">Profile Picture</label>
        <input type="text" className="form-control" id="profilePic" placeholder="Profile Picture" onChange={e => setProfilePic(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <input type="text" className="form-control" id="bio" placeholder="Bio" onChange={e => setBio(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">{loading ? "Creating user..." : "Create user"}</button>
      {error && <p className="mt-2 text-danger">{error.message}</p>}
      {data && <p className="mt-2 text-success">{data.createUser}</p>}
    </form> */}

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


// const Signup = () => {
//   let [signUp] = useMutation(queries.CREATE);
//   let navigate = useNavigate();
//   useEffect(() => {
//     if (isLoggedIn()) {
//       navigate("/", { replace: true });
//     }
//   }, []);
//   let userName;
//   let password;
//   return (
//     <div className="main">
//       <section className="signup">
//         <div className="container1">
//           <div className="signup-content">
//             <form
//               className="signup-form"
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 try {
//                   if (
//                     !userName ||
//                     !userName.value ||
//                     userName.value.trim() == ""
//                   ) {
//                     Swal.fire({
//                       title: "Error!",
//                       text: "Please enter username to signup!",
//                       icon: "error",
//                       confirmButtonText: "I'll fix it!",
//                     });
//                     return;
//                   }
//                   if (!password || !password.value || password.value == "") {
//                     Swal.fire({
//                       title: "Error!",
//                       text: "Please enter password to signup!",
//                       icon: "error",
//                       confirmButtonText: "I'll fix it!",
//                     });
//                     return;
//                   }

//                   const thisUser = await signUp({
//                     variables: {
//                       userName: userName.value,
//                       password: password.value,

//                     },
//                   });

//                   if (thisUser.data.createUser) {
//                     Swal.fire({
//                       title: "Awesome!",
//                       text: `${thisUser.data.createUser.name}, your account has been created. Click the button to login.`,
//                       icon: "success",
//                       confirmButtonText: "Lets go!",
//                     }).then((isConfirmed) => {
//                       if (isConfirmed.value === true) navigate("/");
//                     });
//                   }
//                 } catch (e) {
//                   if (e.message.slice(e.message.length - 3) == "401") {
//                     Swal.fire({
//                       title: "Oops!",
//                       text: `We could not create your account?`,
//                       icon: "error",
//                       confirmButtonText: "I'll fix it!",
//                     });
//                   } else {
//                     Swal.fire({
//                       title: "Oops!",
//                       text: `${e.message}`,
//                       icon: "error",
//                       confirmButtonText: "I'll fix it!",
//                     });
//                   }
//                 }
//               }}
//             >
//               <h2 className="form-title">Create account</h2>
//               <br />

//               <div className="form-group ">
//                 <label>
//                   Enter your Username
//                   <br />
//                   <input
//                     className="form-input"
//                     ref={(node) => (userName = node)}
//                   ></input>
//                 </label>
//               </div>

//               <div className="form-group ">
//                 <label>
//                   Enter your password
//                   <br />
//                   <input
//                     className="form-input"
//                     type="password"
//                     ref={(node) => (password = node)}
//                   ></input>
//                 </label>
//               </div>

//               <br />

//               <button className="btn-lg btn-danger" type="submit">
//                 Sign Up
//               </button>
//             </form>
//             <p className="loginhere">
//               Have already an account ?{" "}
//               <Link
//                 to={`/signin`}
//                 className="loginhere-link"
//                 variant="contained"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

export default SignUp;
