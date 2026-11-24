
// import React, { useState, useEffect } from "react";
// import {
//     addRescuer,
//     getAllRescuers,
//     getRescuerByEmail,
//     deleteRescuer
// } from "../../api";

// import "../../styles/ManageRescuers.css";

// function ManageRescuers() {

//     const [rescuers, setRescuers] = useState([]);

//     const [formData, setFormData] = useState({
//         userName: "",
//         email: "",
//         password: "",
//         district: ""
//     });

//     const [searchEmail, setSearchEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     // Fetch all rescuers
//     const fetchRescuers = async () => {
//         try {
//             const response = await getAllRescuers();
//             setRescuers(response.data.rescuers);
//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message || "Failed to fetch rescuers"
//             );
//         }
//     };

//     useEffect(() => {
//         fetchRescuers();
//     }, []);

//     // Handle form inputs
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // Add rescuer
//     const handleAddRescuer = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const response = await addRescuer(formData);

//             setMessage(response.data.message);

//             setFormData({
//                 userName: "",
//                 email: "",
//                 password: "",
//                 district: ""
//             });

//             fetchRescuers();

//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message || "Failed to add rescuer"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Search rescuer by email
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         if (!searchEmail.trim()) {
//             fetchRescuers();
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         try {
//             const response = await getRescuerByEmail(searchEmail.trim());
//             setRescuers([response.data.rescuer]);
//         } catch (error) {
//             setRescuers([]);
//             setMessage(
//                 error.response?.data?.message || "Rescuer not found"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete rescuer
//     const handleDelete = async (email) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this rescuer?"
//         );

//         if (!confirmDelete) return;

//         try {
//             const response = await deleteRescuer(email);
//             setMessage(response.data.message);
//             fetchRescuers();
//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message || "Failed to delete rescuer"
//             );
//         }
//     };

//     return (
//         <div className="card manage-rescuers">

//             <h3>Manage Rescuers</h3>

//             {/* Add Rescuer Form */}
//             <form onSubmit={handleAddRescuer} className="rescuer-form">

//                 <h4>Add New Rescuer</h4>

//                 <input
//                     type="text"
//                     name="userName"
//                     placeholder="Username"
//                     value={formData.userName}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="district"
//                     placeholder="District"
//                     value={formData.district}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit" disabled={loading}>
//                     {loading ? "Please wait..." : "Add Rescuer"}
//                 </button>

//             </form>

//             {message && <p className="rescuer-message">{message}</p>}

//             {/* Search Rescuer */}
//             <form onSubmit={handleSearch} className="rescuer-search">

//                 <h4>Search Rescuer</h4>

//                 <input
//                     type="email"
//                     placeholder="Enter rescuer email"
//                     value={searchEmail}
//                     onChange={(e) => setSearchEmail(e.target.value)}
//                 />

//                 <button type="submit" disabled={loading}>
//                     Search
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() => {
//                         setSearchEmail("");
//                         fetchRescuers();
//                     }}
//                 >
//                     Show All
//                 </button>

//             </form>

//             {/* Rescuer List */}
//             <div className="rescuer-list">

//                 <h4>All Rescuers ({rescuers.length})</h4>

//                 {rescuers.length === 0 ? (
//                     <p>No rescuers found.</p>
//                 ) : (
//                     rescuers.map((rescuer) => (
//                         <div className="rescuer-card" key={rescuer._id}>

//                             <div className="rescuer-details">
//                                 <strong>{rescuer.userName}</strong>
//                                 <p>{rescuer.email}</p>
//                                 <p>District: {rescuer.district}</p>
//                             </div>

//                             <button
//                                 className="rescuer-delete-btn"
//                                 onClick={() => handleDelete(rescuer.email)}
//                             >
//                                 Delete
//                             </button>

//                         </div>
//                     ))
//                 )}

//             </div>

//         </div>
//     );
// }

// export default ManageRescuers;





import React, { useState, useEffect } from "react";

import {
    addRescuer,
    getAllRescuers,
    getRescuerByEmail,
    deleteRescuer
} from "../../api";

import "../../styles/ManageRescuers.css";

function ManageRescuers() {

    const [rescuers, setRescuers] = useState([]);
    const [searchedRescuer, setSearchedRescuer] = useState(null);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        district: ""
    });

    const [searchEmail, setSearchEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showAllRescuers, setShowAllRescuers] = useState(false);

    // Fetch all rescuers
    const fetchRescuers = async () => {
        try {
            const response = await getAllRescuers();
            setRescuers(response.data.rescuers);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch rescuers"
            );
        }
    };

    useEffect(() => {
        fetchRescuers();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add new rescuer
    const handleAddRescuer = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await addRescuer(formData);

            setMessage(response.data.message);

            setFormData({
                userName: "",
                email: "",
                password: "",
                district: ""
            });

            await fetchRescuers();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to add rescuer"
            );
        } finally {
            setLoading(false);
        }
    };

    // Search rescuer by email
   const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchEmail.trim()) {
        setMessage("Please enter a rescuer email");
        setSearchedRescuer(null);
        return;
    }

    setLoading(true);
    setMessage("");
    setSearchedRescuer(null);

    try {
        const response = await getRescuerByEmail(searchEmail.trim());

        setSearchedRescuer(response.data.rescuer);

    } catch (error) {
        setMessage(
            error.response?.data?.message || "Rescuer not found"
        );
    } finally {
        setLoading(false);
    }
};

    // Delete rescuer
    const handleDelete = async (email) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this rescuer?"
        );

        if (!confirmDelete) return;

        setMessage("");

        try {
            const response = await deleteRescuer(email);

            setMessage(response.data.message);

            await fetchRescuers();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete rescuer"
            );
        }
    };

    // Toggle Show All / Hide All
    const handleToggleRescuers = async () => {

        if (showAllRescuers) {
            setShowAllRescuers(false);
        } else {
            setSearchEmail("");
            setMessage("");

            await fetchRescuers();

            setShowAllRescuers(true);
        }
    };

    return (
        <div className="card manage-rescuers">

            <h3>Manage Rescuers</h3>

            {/* Add Rescuer */}
            <form
                onSubmit={handleAddRescuer}
                className="rescuer-form"
            >

                <h4>Add New Rescuer</h4>

                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Please wait..." : "Add Rescuer"}
                </button>

            </form>

            {/* Search Rescuer */}
            <form onSubmit={handleSearch} className="rescuer-search">

    <h4>Search Rescuer</h4>

    <input
        type="email"
        placeholder="Enter rescuer email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
    />

    <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
    </button>

    {searchedRescuer && (
        <div className="search-result">
            <h4>Search Result</h4>

            <strong>{searchedRescuer.userName}</strong>
            <p>{searchedRescuer.email}</p>
            <p>District: {searchedRescuer.district}</p>
        </div>
    )}

</form>

            {/* Message */}
            {message && (
                <p className="rescuer-message">
                    {message}
                </p>
            )}

            {/* All Rescuers */}
            <div className="rescuer-list">

                <div className="rescuer-list-header">

                    <h4>All Rescuers ({rescuers.length})</h4>

                    <button
                        type="button"
                        className="show-all-btn"
                        onClick={handleToggleRescuers}
                    >
                        {showAllRescuers ? "Hide All" : "Show All"}
                    </button>

                </div>

                {/* Collapsible Rescuer List */}
                {showAllRescuers && (

                    <div className="rescuer-items">

                        {rescuers.length === 0 ? (

                            <p>No rescuers found.</p>

                        ) : (

                            rescuers.map((rescuer) => (

                                <div
                                    className="rescuer-card"
                                    key={rescuer._id}
                                >

                                    <div className="rescuer-details">

                                        <strong>
                                            {rescuer.userName}
                                        </strong>

                                        <p>{rescuer.email}</p>

                                        <p>
                                            District: {rescuer.district}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        className="rescuer-delete-btn"
                                        onClick={() =>
                                            handleDelete(rescuer.email)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default ManageRescuers;
