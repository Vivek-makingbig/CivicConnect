import React, { useState, useEffect } from "react";
import { getAllReports, updateReport, deleteReport, assignRescuer } from "../../api";


function AllReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rescuerEmails, setRescuerEmails] = useState({});

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getAllReports();
      setReports(response.data || response);
    } catch (err) {
      setError("Error occurred while fetching reports");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);


// Assigning reports on basis of resucer id
  const handleAssign = async (id) => {
  const email = rescuerEmails[id]?.trim();

  if (!email) {
    alert("Enter rescuer email");
    return;
  }

  try {
    await assignRescuer(id, email);

    setReports(prev =>
      prev.map(r =>
        (r._id === id || r.id === id)
          ? {
              ...r,
              status: "Team assigned",
              assignedRescuer: email
            }
          : r
      )
    );

    alert("Rescuer assigned successfully");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to assign rescuer");
  }
};



  const handleUpdate = async (id, currentStatus) => {
    const statusCycle = ["Pending", "In progress", "Team assigned", "Resolved"];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextStatus = statusCycle[(currentIndex) % statusCycle.length];

    try {
      await updateReport(id, { status: nextStatus });
      alert(`Status updated to: ${nextStatus}`);

      setReports(prev =>
        prev.map(r =>
          (r._id === id || r.id === id) ? { ...r, status: nextStatus } : r
        )
      );
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Error updating status. Ensure the value matches the database enum.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteReport(id);
      setReports(prev => prev.filter(r => (r._id !== id && r.id !== id)));
      alert("Report deleted");
    } catch (error) {
      alert("Error deleting report");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    // <div className="card">
    //   <h3>All Disaster Reports</h3>

    //   <div className="notice-container">
    //     {reports.length > 0 ? (
    //       reports.map((report) => (
    //         <div key={report._id || report.id} className="notice-item">

    //           <div className="report-details">
    //             <strong>{report.disasterType}</strong>
    //             <p>{report.location}</p>
    //             <p>Upvotes : {report.upvoteCount}</p>
    //             <p>Downvotes : {report.downvoteCount}</p>

    //             <span className={`status ${(report.status || "pending").toLowerCase()}`}>
    //               {report.status || "Pending"}
    //             </span>
    //             {report.imageUrl && (
    //               <img
    //                 src={report.imageUrl}
    //                 alt="Reported disaster"
    //                 className="report-image"
    //               />
    //             )}


    //             {report.otp && (
    //               <p>
    //                 Verification OTP: <strong>{report.otp}</strong>
    //               </p>
    //             )}


    //           </div>

    //           <div className="actions">

    //             <select
    //               className="status-dropdown"
    //               value={report.status || "Pending"}
    //               onChange={(e) => handleUpdate(report._id || report.id, e.target.value)}
    //             >
    //               <option value="Pending">Pending</option>
    //               <option value="In progress">In progress</option>
    //               <option value="Team assigned">Team assigned</option>
                  
    //             </select>

    //             <button
    //               className="delete-btn"
    //               onClick={() => handleDelete(report._id || report.id)}
    //             >
    //               Delete
    //             </button>

    //           </div>

    //         </div>
    //       ))
    //     ) : (
    //       <p>No reports found</p>
    //     )}
    //   </div>
    // </div>


     <div className="card">
    <h3>All Disaster Reports</h3>

    <div className="notice-container">
      {reports.length > 0 ? (
        reports.map((report) => {
          const reportId = report._id || report.id;

          return (
            <div key={reportId} className="notice-item">

              <div className="report-details">
                <strong>{report.disasterType}</strong>

                <p>{report.location}</p>
                <p>Upvotes: {report.upvoteCount}</p>
                <p>Downvotes: {report.downvoteCount}</p>

                <span
                  className={`status ${(report.status || "pending").toLowerCase()}`}
                >
                  {report.status || "Pending"}
                </span>

                {report.imageUrl && (
                  <img
                    src={report.imageUrl}
                    alt="Reported disaster"
                    className="report-image"
                  />
                )}

                {report.otp && (
                  <p>
                    Verification OTP: <strong>{report.otp}</strong>
                  </p>
                )}
              </div>

              <div className="actions">

                {/* Assign Rescuer */}
                <input
                  type="email"
                  placeholder="Rescuer email"
                  value={rescuerEmails[reportId] || ""}
                  onChange={(e) =>
                    setRescuerEmails((prev) => ({
                      ...prev,
                      [reportId]: e.target.value
                    }))
                  }
                />

                <button
                  onClick={() => handleAssign(reportId)}
                  disabled={report.status === "Resolved"}
                >
                  Assign Rescuer
                </button>

                {/* Update Status */}
                {/* <select
                  className="status-dropdown"
                  value={report.status || "Pending"}
                  onChange={(e) =>
                    handleUpdate(reportId, e.target.value)
                  }
                  disabled={report.status === "Resolved"}
                >
                  <option value="Pending">Pending</option>
                  <option value="In progress">In progress</option>
                  <option value="Team assigned">Team assigned</option>
                </select> */}

                {/* Delete Report */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(reportId)}
                >
                  Delete
                </button>

              </div>
            </div>
          );
        })
      ) : (
        <p>No reports found</p>
      )}
    </div>
  </div>
  );
}

export default AllReports;