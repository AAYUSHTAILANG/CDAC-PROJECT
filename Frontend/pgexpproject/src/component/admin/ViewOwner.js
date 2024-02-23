import React, { useState, useEffect } from "react";

function ViewOwners() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7018/api/Owners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch owners");
        }
        return response.json();
      })
      .then((data) => {
        console.log("In owner");
        console.log(data);
        setOwners(data);
      })
      .catch((error) => {
        console.error("Error fetching owners:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Owner Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Aadhar</th>
            <th>Address</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.ownerId}>
              <td>{owner.ownerFname}</td>
              <td>{owner.ownerLname}</td>
              <td>{owner.ownerEmail}</td>
              <td>{owner.contact}</td>
              <td>{owner.ownerAadhar}</td>
              <td>{owner.ownerAddress}</td>
              {/* Add more columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOwners;
