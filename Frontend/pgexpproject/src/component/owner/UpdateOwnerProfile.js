import React, { useEffect, useState } from "react";

const UpdateOwnerProfile = ({ owner_id }) => {
  const [formData, setFormData] = useState({
    owner_fname: "",
    owner_lname: "",
    contact: "",
  });
  useEffect(() => {
    const loggedOwner = JSON.parse(localStorage.getItem("loggedOwner"));
    if (loggedOwner) {
      setFormData((prevData) => ({
        ...prevData,
        owner_id: loggedOwner.owner_id,
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
    const loggedOwner = JSON.parse(localStorage.getItem("loggedOwner"));
    console.log(loggedOwner.owner_id);
    if (formData.owner_id) {
      fetch(`http://localhost:8080/updateOwner/${formData.owner_id}`, {
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
            owner_fname: "",
            owner_lname: "",
            contact: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Profile not updated");
          // Handle error scenario
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
                  <label htmlFor="owner_fname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="owner_fname"
                    name="owner_fname"
                    value={formData.owner_fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="owner_lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="owner_lname"
                    name="owner_lname"
                    value={formData.owner_lname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    name="contact"
                    value={formData.contact}
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

export default UpdateOwnerProfile;
