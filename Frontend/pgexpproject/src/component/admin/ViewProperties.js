import React, { useState, useEffect } from "react";

function ViewProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7018/api/Properties")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProperties(data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Property Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Rent per month</th>
            <th>Capacity</th>
            <th>No of occupant</th>
            
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.address}</td>
              <td>{property.price}</td>
              <td>{property.capacity}</td>
              <td>{property.noOfOccupants}</td>
              
              
              
              {/* Add more columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProperties;
