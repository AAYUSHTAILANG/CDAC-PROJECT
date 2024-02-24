import React, { useState, useEffect } from "react";

function ViewOccupants() {
  const [occupants, setOccupants] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7018/api/Occupants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch occupants");
        }
        return response.json();
      })
      .then((data) => {
        console.log("In occupant");
        console.log(data);
        setOccupants(data);
      })
      .catch((error) => {
        console.error("Error fetching occupants:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Occupant Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Profession</th>
            <th>Address</th>
            <th>Aadhar No</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {occupants.map((occupant) => (
            <tr key={occupant.occupantId}>
              <td>{occupant.occupantFname}</td>
  
              <td>{occupant.occupantLname}</td>
              <td>{occupant.occupantEmail}</td>
              <td>{occupant.occupantContact}</td>
              <td>{occupant.occupantGender}</td>
              <td>{occupant.occupantProfession}</td>
              <td>{occupant.occupantAddress}</td>
              <td>{occupant.occupantAadhar}</td>
              {/* Add more columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOccupants;
