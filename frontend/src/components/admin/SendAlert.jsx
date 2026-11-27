import React, { useState } from "react";
import {createAlert} from '../../api';

function SendAlert() {
  const [alertMessage,setAlertMessage] = useState("");
  const [district,setAlertDistrict] = useState("");
  const handleAlertMessage = async (e) => {
    e.preventDefault();
    try
    {
       const res = await createAlert({alertMessage,district});
       alert("Alert message sent");
       console.log(res);
       setAlertMessage("");
    }catch(err)
    {
      alert('Error occured while sending alert message');
      console.log(err.message);
    }

    
  }
     return (
        <div className="card">
            <h3>Publish Notice</h3>

            <form onSubmit={handleAlertMessage}>
                <textarea
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                    placeholder="Write a notice for all logged-in users"
                />

                <button type="submit">
                    Publish Notice
                </button>
            </form>
        </div>
    );
}

export default SendAlert;