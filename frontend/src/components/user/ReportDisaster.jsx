import React, { useState, useEffect } from "react";
import "../../styles/user/ReportDisaster.css"
import { reportDisaster } from '../../api';
function ReportDisaster() {
  const [disasterType, setdisasterType] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [otp, setOtp] = useState("");

  //for image upload
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtp("");
    try {
      // await reportDisaster({ disasterType, location, description });

      const formData = new FormData();

      formData.append("disasterType", disasterType);
      formData.append("location", location);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      // await reportDisaster(formData);
      // alert("Disaster reported successfully");
      const response = await reportDisaster(formData);
      setOtp(response.data.otp);
      alert("Problem reported successfully. Save your OTP.");
      setdisasterType("");
      setlocation("");
      setdescription("");
      setImage(null);
      setImagePreview("");
    } catch (error) {
      alert("Error occured while reporting problem");
      console.log(error.message);
    }
  }

  //function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5 MB");
      return;
    }

    setImage(file);

  };


  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);



  return (
    <div className="card" >

      <h3>Report Local problems</h3>

      <form onSubmit={handleSubmit}>

        <select id="disaster-type" value={disasterType} onChange={(e) => setdisasterType(e.target.value)}>
          <option value="">Select Problem Type</option>
          <option>Road and Pothole Issue</option>
          <option>Electricity Issue</option>
          <option>Water Supply Issue</option>
          <option>Drainage and Sewage Issue</option>
          <option>Garbage and Waste Management</option>
          <option>Streetlight Issue</option>
          <option>Traffic and Road Safety</option>
          <option>Public Property Damage</option>
          <option>Waterlogging and Flooding</option>
          <option>Tree and Fallen Branch Issue</option>
          <option>Noise Pollution</option>
          <option>Other</option>
        </select>

        <input id="location" type="text" value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Location / Area" />

        <textarea id="describe-situation" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Describe situation"></textarea>


        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" width="200" />

            <button
              type="button"
              onClick={() => setImage(null)}
            >
              Remove Image
            </button>
          </div>
        )}

        <button id="submit-button" type="submit">Submit Report</button>

      </form>

      {otp && (
        <div className="otp-container">
          <h4>Your Verification OTP</h4>
          <h2>{otp}</h2>
          <p>Keep this OTP safe. You will need to share it with the rescuer after the issue is resolved.</p>
        </div>
      )}

    </div>
  );
}

export default ReportDisaster;