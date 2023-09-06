import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token",token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/admin-dashboard");
    } catch (error) {
      alert("Login failed");
      console.log("Login failed:", error);
    }
  };

  return (
    <div class="Image1">

    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100 mx-auto justify-content-center align-items-center" >
          <div class="row d-flex  h-100 justify-content-center align-items-center" >
            <div class="col-12 col-md-8 col-lg-6 col-xjustify-content-center align-items-centerl-5">
              <div class="card bg-white text-black" styles="border-radius: 1rem;">
                <div class="card-body p-4 text-left" >
      
                  <div class="mb-md-1 mt-md-0 pb-5 text-left">
      
                    <h4 class="fw-bold mb-2">ECommerce Application</h4>
                    <div class="form-outline form-white mb-4">
                        <label class="form-label"  for="typeEmailX" >Email</label>
                        <input className="input_email"
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your Email"
                          class="form-control form-control-lg"
                        />
                    </div>
                    <div class="form-outline form-white mb-4">
                        <label class="form-label" for="typeEmailX">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your Password"
                          class="form-control form-control-lg"
                        />
                    </div>
                    <label>
                        <input type="checkbox"/>
                        Remember me
                      </label>                   
                    <div class="button" onClick={handleLogin}>
                        Continue
                    </div>          
                  </div>                
                  <div>
                    <p class="mb-0">Don't have an account? <a href="/register" class="text-dark-50 fw-bold">Create An Account</a>
                    </p>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

