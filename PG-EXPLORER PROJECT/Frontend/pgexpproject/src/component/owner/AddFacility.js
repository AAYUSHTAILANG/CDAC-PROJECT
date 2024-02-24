// AddFacility.js
import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

const init = {
  property_id: "",
  facility_id: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value };
    case "reset":
      return init;
    default:
      return state;
  }
};

function AddFacility() {
  const { propertyId } = useParams();
  const [info, dispatch] = useReducer(reducer, init);
  const { property_id, facility_id: selectedFacilities } = info;
  const [selectedFacilitiesState, setSelectedFacilities] = useState([]);
  const [ownerProperties, setOwnerProperties] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const loggedOwner = JSON.parse(localStorage.getItem("loggedOwner"));
    if (loggedOwner) {
      fetch(
        `http://localhost:8080/properties?owner_id=${loggedOwner.owner_id}`
      )
        .then((resp) => resp.json())
        .then((data) => setOwnerProperties(data))
        .catch((error) => console.error("Error fetching properties:", error));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/facilities")
      .then((resp) => resp.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  useEffect(() => {
    dispatch({ type: "update", field: "property_id", value: propertyId });
  }, [propertyId]);

  const handleCheckboxChange = (facilityId) => {
    setSelectedFacilities((prevSelectedFacilities) => {
      if (prevSelectedFacilities.includes(facilityId)) {
        return prevSelectedFacilities.filter((id) => id !== facilityId);
      } else {
        return [...prevSelectedFacilities, facilityId];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      property_id: property_id,
      facility_id: selectedFacilitiesState,
    };

    // Send the data to the backend API
    fetch("http://localhost:8080/addFacility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Facility added successfully:", data);
        alert("Facility added successfully");
        // Optionally, perform any additional actions upon successful addition
      })
      .catch((error) => {
        console.error("Error adding facility:", error);
        alert("Facility not added");
        // Optionally, handle errors or display error messages to the user
      });

    console.log("Selected property ID:", property_id);
    console.log("Selected facilities:", selectedFacilitiesState);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Add Facilities</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <h5 className="mb-3">Facilities</h5>
                  {facilities.map((facility) => (
                    <div key={facility.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={facility.id}
                        checked={selectedFacilitiesState.includes(facility.id)}
                        onChange={() => handleCheckboxChange(facility.id)}
                        id={`facility_${facility.id}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`facility_${facility.id}`}
                      >
                        {facility.name}
                      </label>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFacility;
