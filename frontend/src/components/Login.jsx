import React, { useState } from "react";
import "../styles/login.css";
import {login} from '../api';
import {useNavigate} from "react-router-dom"

function Login({setRole}) {  
  const [email,setemail] = useState("");
   const [password,setpassword] = useState("");
   const navigate = useNavigate();
   const handleSubmit = async (e) =>
   {
    e.preventDefault();
    try {
      const res = await login(
        { email, password },
        { withCredentials: true }
      );

      const role = res.data.User.role;
      const roleRoutes = 
      {
        user : '/user',
        rescue : '/rescue',
        admin :'/admin'
      };
      setRole(role);
      console.log(role);
      navigate(roleRoutes[role] || "/");  
    } catch (error) {
      alert("Login failed! Please try again");
    }
  };

  return (
  <>
     
      <h1 id="Welcome_login">Welcome to Local Connect</h1>
    <form className="login-container" onSubmit={handleSubmit}>

  <div >
    <label htmlFor="uname"><b>Email</b></label>
    <input type="text" value={email} onChange ={e =>setemail(e.target.value)} placeholder="Enter email" name="uname" required/>

    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" value={password} onChange ={e =>setpassword(e.target.value)} placeholder="Enter Password" name="psw" required/>

    <button type="submit">Login</button>
   
<button id="back_to_home"onClick={()=>navigate("/")}>Back to Home</button>
  </div>

  
</form>

</>

  );
}

export default Login;