import React from "react";
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

    //   <h3>Admin Dashboard</h3>

    //   <div className="profile">
    //     <span>Welcome, Admin</span>
    //     <button className="logout-btn" onClick={handleLogout} >Logout</button>
    //   </div>

    // </div>

<div className="topbar">

  <h3 className="admin-brand">
    Civic<span>Connect</span>
  </h3>

  <div className="profile">
    <span>Welcome, Admin</span>
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>

</div>

  );
}

export default Topbar;