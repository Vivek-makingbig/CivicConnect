import { useState, useEffect } from "react";
import "../../styles/user/AllReportsForUser.css";

import { getAllReports, voteReport } from '../../api';

function AllReportsForUser() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

 
  const handleVoteAction = async (reportId, action) => {
    try {
     
      const response = await voteReport(reportId, action);

      
      const { upvoteCount, downvoteCount } = response.data;

      
      setReports((prevReports) =>
        prevReports.map((report) => {
          const id = report._id || report.id;
          if (id === reportId) {
            return {
              ...report,
              upvoteCount: upvoteCount,
              downvoteCount: downvoteCount
            };
          }
          return report;
        })
      );
    } catch (err) {
      console.error("Voting communication error:", err.message);
    }
  };

  if (loading) return <div className="card"><p>Loading reports...</p></div>;
  if (error) return <div className="card"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="card">
      <h3>All Disaster Reports</h3>

      <div className="notice-container">
        {reports.length > 0 ? (
          reports.map((report) => {
            const currentReportId = report._id || report.id;

            return (
              <div key={currentReportId} className="notice-item">
                <div className="report-details">
                  <strong>{report.disasterType}</strong>
                  <p>Report location: {report.location}</p>
                  <p>Reporting date: {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}</p>
                  <p>Report status: {report.status}</p>

                 
                  <div className="voting-stats" style={{ margin: "10px 0" }}>
                    <p>
                      ▲ <strong>
                        {(report.upvoteCount || 0) - (report.downvoteCount || 0)}
                      </strong> people are experiencing this issue
                    </p>
                  </div>

                
                  <div className="vote-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleVoteAction(currentReportId, "upvote")}>
                      Upvote
                    </button>
                    <button onClick={() => handleVoteAction(currentReportId, "downvote")}>
                      Downvote
                    </button>
                  </div>
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

export default AllReportsForUser;


