import React, { useState, useEffect } from "react";
import { getAssignedMissions } from "../../api";

function AssignedMissions() {

  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getAssignedMissions().then((res) => setMissions(res.data));
  }, []);


   return (
   
<div className="card">
  <h3>Assigned Missions</h3>

  <div className="notice-container">
    {missions.map((m) => (
      <div className="mission-item" key={m._id}>

        {/* Mission Details */}
        <div className="mission-details">
          <p>Issue: {m.disasterType}</p>
          <p>Location: {m.location}</p>
          <p>Date: {new Date(m.createdAt).toLocaleDateString()}</p>
        </div>

        {/* OTP Section - Second Line */}
        <div className="otp-section">
          <label>Enter OTP to mark as completed:</label>

          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
          />

          <button onClick={() => handleComplete(m._id)}>
            Submit
          </button>
        </div>

      </div>
    ))}
  </div>
</div>

  );
}

export default AssignedMissions;
