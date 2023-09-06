// import React, { useState } from "react";
// import axios from "axios"; // Import axios for making API requests
// import "./register.css";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phonenumber: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const register = async () => {
//     const { username, email, phonenumber, password } = user;

//     if (!username || !email || !phonenumber || !password) {
//       alert("Invalid input");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/register", {
//         username,
//         email,
//         phonenumber,
//         password,
//       });

//       navigate("/login"); // Display the success message

//       // Clear the form fields after successful registration
//       setUser({
//         username: "",
//         email: "",
//         phonenumber: "",
//         password: "",
//       });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       alert("An error occurred while registering user");
//     }
//   };

//   return (
//       <div className="Image">
//       <div className="register">
//         <div className="InBox">
//           <p className="ECom">ECommerce Application</p>
//           <h1>Register</h1>
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             placeholder="Your Name"
//             onChange={handleChange}
//           ></input>
//           <input
//             type="text"
//             name="phonenumber"
//             value={user.phonenumber}
//             placeholder="Mobile Number"
//             onChange={handleChange}
//           ></input>
//           <input
//             type="text"
//             name="email"
//             value={user.email}
//             placeholder="Email Address"
//             onChange={handleChange}
//           ></input>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             placeholder="Password"
//             onChange={handleChange}
//           ></input>
//           <div className="button" onClick={register}>
//             Register
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
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
    <div class="Image">

        <section class="vh-100 gradient-custom ">
            <div class="container py-5 h-100 mx-auto justify-content-center align-items-center" >
              <div class="row d-flex  h-100 justify-content-center align-items-center" >
                <div class="col-12 col-md-8 col-lg-6 col-xjustify-content-center align-items-centerl-5">
                  <div class="card bg-white text-black" styles="border-radius: 1rem;">
                    <div class="card-body p-5 text-left" >
          
                      <div class="mb-md-0 mt-md-0 pb-1 text-left">
          
                        <h4 class="fw-bold mb-2 ">ECommerce Application</h4>
                        <h5 class="fw-bold">Create Account</h5>
                        <div class="form-outline form-white mb-4">
                            <label class="form-label"  for="typeEmailX" >Username</label>
                            <input type="text" name="username" value={user.username} placeholder="username"id="typeEmailX" onChange={handleChange} class="form-control form-control-md" />
                            
                        </div>
                        <div class="form-outline form-white mb-4">
                            <label class="form-label" for="typeEmailX">Mobile Number</label>
                            <input type="text"
                              name="phonenumber"
                              value={user.phonenumber}
                              placeholder="Mobile Number"
                              onChange={handleChange}  id="typeEmailX" class="form-control form-control-md " />
                           
                        </div>
                        <div class="form-outline form-white mb-4">
                          <label class="form-label" for="typeEmailX">Email address</label>
                          <input type="text"
                            name="email"
                            value={user.email}
                            placeholder="Email Address"
                            onChange={handleChange} id="typeEmailX" class="form-control form-control-" />
                          
                        </div>
          
                        <div class="form-outline form-white mb-4">
                            <label class="form-label" for="typePasswordX">Password</label>
                          <input type="password"
                            name="password"
                            value={user.password}
                            placeholder="Password"
                            onChange={handleChange} id="typePasswordX" class="form-control form-control-md" />
                          
                        </div>
          
                        
                        <div class="button" onClick={register}>
                            Register
                        </div>          
                      </div>
                      <label>
                        <input type="checkbox"/>I certify that I have read and accept the <a href="#">term of use</a> and <a href="#">privacy policy </a>
                     
                      </label>
                      
                      {/* <div>
                        <p class="mb-0">Don't have an account? <a href="#!" class="text-dark-50 fw-bold">Create An Account</a>
                        </p>
                      </div> */}
          
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
         
        </div>

  );
};

export default Register;
