import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyRequested() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch occupant requests from the backend
    const occupantId = JSON.parse(
      localStorage.getItem("loggedOccupant")
    ).occupant_id;
    console.log(occupantId);
    fetch(`http://localhost:8080/getOccupantRequest/${occupantId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to fetch occupant requests");
        }

        return resp.json();
      })
      .then((data) => {
        console.log(occupantId);
        console.log(data);
        setRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching occupant requests:", error);
      });
  }, []);

  const handleBookProperty = (propertyId) => {
    // Log propertyId to check its type
    // console.log("Property ID:", propertyId);

    // Handle booking the property
    navigate(`/occupanthome/booking/${propertyId.id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Requested Properties</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.property_id.name}</td>
              <td>
                {request.approval_status === 0
                  ? "Requested"
                  : request.approval_status === 1
                  ? "Request Accepted"
                  : "Request Rejected"}
              </td>
              <td>
                {request.approval_status === 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleBookProperty(
                        request.property_id,
                        request.occupant_id
                      )
                    }
                  >
                    Book
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyRequested;
