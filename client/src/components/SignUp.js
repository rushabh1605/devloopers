import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import queries from "../queries";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { isLoggedIn } from "../helper";

const Signup = () => {
  let [signUp] = useMutation(queries.CREATE);
  let navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, []);
  let userName;
  let password;
  return (
    <div className="main">
      <section className="signup">
        <div className="container1">
          <div className="signup-content">
            <form
              className="signup-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (
                    !userName ||
                    !userName.value ||
                    userName.value.trim() == ""
                  ) {
                    Swal.fire({
                      title: "Error!",
                      text: "Please enter username to signup!",
                      icon: "error",
                      confirmButtonText: "I'll fix it!",
                    });
                    return;
                  }
                  if (!password || !password.value || password.value == "") {
                    Swal.fire({
                      title: "Error!",
                      text: "Please enter password to signup!",
                      icon: "error",
                      confirmButtonText: "I'll fix it!",
                    });
                    return;
                  }

                  const thisUser = await signUp({
                    variables: {
                      userName: userName.value,
                      password: password.value,

                    },
                  });

                  if (thisUser.data.createUser) {
                    Swal.fire({
                      title: "Awesome!",
                      text: `${thisUser.data.createUser.name}, your account has been created. Click the button to login.`,
                      icon: "success",
                      confirmButtonText: "Lets go!",
                    }).then((isConfirmed) => {
                      if (isConfirmed.value === true) navigate("/");
                    });
                  }
                } catch (e) {
                  if (e.message.slice(e.message.length - 3) == "401") {
                    Swal.fire({
                      title: "Oops!",
                      text: `We could not create your account?`,
                      icon: "error",
                      confirmButtonText: "I'll fix it!",
                    });
                  } else {
                    Swal.fire({
                      title: "Oops!",
                      text: `${e.message}`,
                      icon: "error",
                      confirmButtonText: "I'll fix it!",
                    });
                  }
                }
              }}
            >
              <h2 className="form-title">Create account</h2>
              <br />

              <div className="form-group ">
                <label>
                  Enter your Username
                  <br />
                  <input
                    className="form-input"
                    ref={(node) => (userName = node)}
                  ></input>
                </label>
              </div>

              <div className="form-group ">
                <label>
                  Enter your password
                  <br />
                  <input
                    className="form-input"
                    type="password"
                    ref={(node) => (password = node)}
                  ></input>
                </label>
              </div>

              <br />

              <button className="btn-lg btn-danger" type="submit">
                Sign Up
              </button>
            </form>
            <p className="loginhere">
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
      </section>
    </div>
  );
};

export default Signup;
