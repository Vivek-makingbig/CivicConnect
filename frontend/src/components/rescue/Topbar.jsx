import React from "react";
import {logout} from '../../api';
import {useNavigate} from "react-router-dom"

function Topbar() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      logout();
      navigate("/");
    }
    catch (err) {
      alert("Error occured while logging out");
      console.log(err.message);
    }

  }
  return (
    <div className="topbar">

      <h3>Rescue Team Dashboard</h3>

      <div className="profile">
        <span>Welcome, Rescue Team</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Topbar;