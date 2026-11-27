


import { useState, useEffect } from "react";
import "../../styles/user/DisasterFeed.css";
import { getAllAlertMessages } from "../../api";

function DisasterFeed() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllAlertMessages();

        setAlerts(response.data.notices || []);
      } catch (err) {
        setError("Error occurred while displaying notices");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="card disaster-feed">
      <h3>Emergency Notices</h3>

      <div className="notice-list">
        {loading ? (
          <p className="notice">Loading notices...</p>
        ) : error ? (
          <p className="notice">{error}</p>
        ) : alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert._id}>
              <strong className="notice">
                {alert.alertMessage}
              </strong>
            </div>
          ))
        ) : (
          <p className="notice">No notice found</p>
        )}
      </div>
    </div>
  );
}

export default DisasterFeed;
