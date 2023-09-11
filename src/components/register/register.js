import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { username, email, phonenumber, password } = user;

    // Password validation: Check if the password meets your criteria (e.g., minimum length)
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!username || !email || !phonenumber || !password) {
      alert("Invalid input");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        phonenumber,
        password,
      });

      navigate("/login"); // Display the success message

      // Clear the form fields after successful registration
      setUser({
        username: "",
        email: "",
        phonenumber: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="mybody">
    <div class="Image">
      <section class="vh-100 gradient-custom">
        <div class="container py-1 h-100 mx-auto justify-content-center align-items-center">
          <div class="row d-flex h-100 justify-content-center align-items-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <form class="card bg-white text-black" autoComplete="off">
                <div class="card-body text-left">
                  <div class="mb-md-0 mt-md-0 pb-1 text-left">
                    <h8 class="fw-bold mb-2">ECommerce Application</h8>
                    <h3 class="fw-bold">Create Account</h3>
                    <div class="form-outline form-white mb-2">
                      <label class="form-label" for="typeEmailX">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        placeholder="username"
                        id="typeEmailX"
                        onChange={handleChange}
                        class="form-control form-control-md"
                        autoComplete="off"
                      />
                    </div>
                    <div class="form-outline form-white mb-1">
                      <label class="form-label" for="typeEmailX">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="phonenumber"
                        value={user.phonenumber}
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        id="typeEmailX"
                        class="form-control form-control-md"
                      />
                    </div>
                    <div class="form-outline form-white mb-1">
                      <label class="form-label" for="typeEmailX">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                        id="typeEmailX"
                        class="form-control form-control-"
                      />
                    </div>
                    <div class="form-outline form-white mb-1">
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={handleChange}
                        id="typePasswordX"
                        class="form-control form-control-md"
                      />
                    </div>
                    <div class="register-button" onClick={register}>
                      Register
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div></div>
  );
};

export default Register;

