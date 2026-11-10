import React from "react";
import "../../styles/user/Topbar.css";
import {logout} from '../../api';
import {useNavigate} from "react-router-dom"

function Topbar() {
const navigate = useNavigate();

 const handleLogout = async (e) => {
     e.preventDefault();
     try{
        logout();
        navigate("/");  
         }
     catch(err)
     {
       alert("Error occured while logging out");
       console.log(err.message);
     }
    }
  return (
    // <div className="topbar">

    //   <div className="welcome">
    //     <h3>Logo</h3>
    //     <h2>Report incidents and stay updated with emergency alerts.</h2>
    //   </div>

    //   <button className="logout-btn" onClick={handleLogout}>
    //     Logout
    //   </button>

    // </div>


<div className="topbar">

  <div className="welcome">
    <h3>Civic<span>Connect</span></h3>
    <p>Report incidents and stay updated with emergency alerts.</p>
  </div>

  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>

</div>

  );
}

export default Topbar;