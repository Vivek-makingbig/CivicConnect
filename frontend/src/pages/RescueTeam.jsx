import React from "react";
import Topbar from "../components/rescue/Topbar";
import AssignedMissions from "../components/rescue/AssignedMissions";
import UpdateRescueStatus from "../components/rescue/UpdateRescueStatus";
import NearbyDisasters from "../components/rescue/NearbyDisasters";
import Notifications from "../components/rescue/Notifications";
// import Footer from "../components/rescue/Footer";

import "../styles/rescue.css";

function RescueTeam() {
  return (
    <div className="dashboard">

      <div className="main">

        <Topbar />

        <div className="dashboard-content">

          <div className="grid-container">

            <AssignedMissions />

            {/* <UpdateRescueStatus />

            <NearbyDisasters />

            <Notifications /> */}

          </div>

        </div>

        {/* <Footer /> */}

      </div>

    </div>
  );
}

export default RescueTeam;