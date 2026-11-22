import React, { useState, useEffect } from "react";
// import { getAssignedMissions } from "../../api";
import { getAssignedMissions, verifyMissionOTP } from "../../api";

function AssignedMissions() {

  const [missions, setMissions] = useState([]);
  const [otpValues, setOtpValues] = useState({});

  useEffect(() => {
    getAssignedMissions().then((res) => setMissions(res.data));
  }, []);



  const handleComplete = async (id) => {
    try {
      const otp = otpValues[id];

      if (!otp || otp.length !== 4) {
        alert("Please enter a valid 4-digit OTP");
        return;
      }

      const response = await verifyMissionOTP(id, otp);

      alert(response.data.message);

      // Remove completed mission from the list
      setMissions((prev) => prev.filter((m) => m._id !== id));

    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

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
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                value={otpValues[m._id] || ""}
                onChange={(e) =>
                  setOtpValues({
                    ...otpValues,
                    [m._id]: e.target.value.replace(/\D/g, "")
                  })
                }
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
