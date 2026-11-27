import React, { useEffect, useState } from "react";
import "../../styles/user/MyReports.css";
import { getmydisasterReport } from '../../api';

function MyReports() {
  const [reports, setreports] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setloading(true);
        const response = await getmydisasterReport();
        setreports(response.data || response);
      }
      catch (err) {
        seterror("Error occured while displaying reports");
        console.log(err.message);
      }
      finally {
        setloading(false);
      }
    }
    fetchReports();
  }, [])
  return (
    <div className="card my-reports">

      <h3>My Reports</h3>

      <div className="report-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id || report._id} className="report">
              <strong>{report.disasterType}</strong>
              <p>{report.location}</p>
              <p>{report.createdAt}</p>
              <p>{report.status}</p>

               {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Reported disaster"
                  className="report-image"
                />
              )}
            </div>
          ))) : (<p>No report found</p>)
        }

      </div>

    </div>
  );
}

export default MyReports;

