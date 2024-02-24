import React, { useEffect, useState } from "react";

function AdminRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // const admin_id = JSON.parse(localStorage.getItem("loggedAdmin")).admin_id;
    fetch(`http://localhost:8080/getOwnerRequest/2`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to fetch admin requests");
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Log the received data
        setRequests(data);
      })
      .catch((error) => console.error("Error fetching admin requests:", error));
  }, []);

  const handleAcceptRequest = (requestId) => {
    // Construct the request body with the requestId
    const requestBody = {
      requestId: requestId,
    };

    // Send PUT request to update the request with the provided requestId
    fetch(`http://localhost:8080/updateOwnerRequest/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Include the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to accept request");
        }
        alert("Successful");
        // Remove the accepted request from state
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_id !== requestId)
        );
      })
      .catch((error) => {
        alert("Not successful");
        console.error("Error accepting request:", error);
      });
  };

  const handleRejectRequest = (requestId) => {
    const requestBody = {
      requestId: requestId,
    };

    // Send PUT request to update the request with the provided requestId
    fetch(`http://localhost:8080/rejectOwnerRequest/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Include the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reject request");
        }
        // Remove the accepted request from state
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      })
      .catch((error) => {
        console.error("Error reject request:", error);
      });
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Owner Requests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Owner Email</th>
            {/* <th>Owner Last Name</th> */}

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.user_id}>
              <td>{request.user_email}</td>
              {/* <td>{request.user_id.owner_lname}</td> */}
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleAcceptRequest(request.user_id)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRejectRequest(request.uer_id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRequest;
