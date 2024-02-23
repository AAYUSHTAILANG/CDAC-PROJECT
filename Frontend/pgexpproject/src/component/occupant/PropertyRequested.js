import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyRequested() {
  const [requests, setRequests] = useState([]);
  const [bookingPropertyId, setBookingPropertyId] = useState(null); // State to track the currently booking property
  const navigate = useNavigate();

  useEffect(() => {
    const occupantId = JSON.parse(
      localStorage.getItem("loggedOccupant")
    ).occupant_id;
    fetch(`http://localhost:8080/getOccupantRequest/${occupantId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to fetch occupant requests");
        }
        return resp.json();
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching occupant requests:", error);
      });
  }, []);

  const handleBookProperty = (propertyId, requestId) => {
    // Send booking request
    navigate(`/occupanthome/booking/${propertyId.id}`);

    // Set the currently booking property id
    setBookingPropertyId(propertyId);

    // Remove the clicked request from the list
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
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
                      handleBookProperty(request.property_id, request.id)
                    }
                    disabled={
                      bookingPropertyId &&
                      bookingPropertyId !== request.property_id
                    }
                  >
                    {bookingPropertyId &&
                    bookingPropertyId === request.property_id
                      ? "Booking..."
                      : "Book"}
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
