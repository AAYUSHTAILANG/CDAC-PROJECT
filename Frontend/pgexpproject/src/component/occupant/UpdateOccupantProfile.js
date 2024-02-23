import React, { useEffect, useState } from "react";

const UpdateOccupantProfile = () => {
  const [formData, setFormData] = useState({
    occupant_fname: "",
    occupant_lname: "",
    occupant_contact: "",
  });

  // Fetch occupant_id from localStorage when the component mounts
  useEffect(() => {
    const loggedOccupant = JSON.parse(localStorage.getItem("loggedOccupant"));
    if (loggedOccupant) {
      setFormData((prevData) => ({
        ...prevData,
        occupant_id: loggedOccupant.occupant_id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the occupant's profile
    const loggedOccupant = JSON.parse(localStorage.getItem("loggedOccupant"));
    console.log(loggedOccupant.occupant_id);
    if (formData.occupant_id) {
      fetch(`http://localhost:8080/updateOccupant/${formData.occupant_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Reset form fields after successful submission if needed
          alert("Update Successful");
          setFormData({
            occupant_fname: "",
            occupant_lname: "",
            occupant_contact: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Profile not updated");
        });
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Update Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="occupant_fname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupant_fname"
                    name="occupant_fname"
                    value={formData.occupant_fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="occupant_lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupant_lname"
                    name="occupant_lname"
                    value={formData.occupant_lname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="occupant_contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupant_contact"
                    name="occupant_contact"
                    value={formData.occupant_contact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOccupantProfile;
