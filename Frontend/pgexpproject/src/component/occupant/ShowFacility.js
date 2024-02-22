import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ShowFacility({ propertyId }) {
  const location = useLocation();
  const searchResults = location.state
    ? location.state.searchResults || []
    : [];
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    console.log("Fetching facilities for property ID:", propertyId);
    fetch(`http://localhost:8080/facilities/${propertyId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Facilities data:", data);
        setFacilities(data);
      })
      .catch((error) => {
        console.error("Error fetching facilities:", error);
      });
  }, [propertyId]);

  return (
    <div>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.facility_id.id}>{facility.facility_id.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShowFacility;