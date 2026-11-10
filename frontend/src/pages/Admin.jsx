import React from "react";
import Topbar from "../components/admin/Topbar";
import AllReports from "../components/admin/AllReports";
import SendAlert from "../components/admin/SendAlert";

import "../styles/admin.css";

function Admin() {
  return (
    <div className="admin-dashboard">

      <div className="main">

        <Topbar />

        <div className="dashboard-content">

          <div className="grid-container">

            <SendAlert />

            <AllReports />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;