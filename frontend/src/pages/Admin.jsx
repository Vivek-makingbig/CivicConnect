import React from "react";
import Topbar from "../components/admin/Topbar";
import AllReports from "../components/admin/AllReports";
import SendAlert from "../components/admin/SendAlert";
import ManageRescuers from "../components/admin/ManageRescuers";

import "../styles/admin.css";

function Admin() {
  return (
    <div className="admin-dashboard">

      <div className="main">

        <Topbar />

        <div className="dashboard-content">

          <div className="grid-container">

            <SendAlert />
               <ManageRescuers />


            <AllReports />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;