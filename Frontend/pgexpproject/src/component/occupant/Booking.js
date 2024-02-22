import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Booking() {
  const { propertyId } = useParams();

  const occupantId = JSON.parse(
    localStorage.getItem("loggedOccupant")
  ).occupant_id;

  const [from, setFrom] = useState(""); // State for From date
  const [to, setTo] = useState(""); // State for To date
  const [depositAmount, setDepositAmount] = useState(0); // State for deposit amount
  const [transaction, setTransaction] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepositAmount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getDepositAmount/${propertyId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch deposit amount");
        }
        const data = await response.text(); // Get the response body as text
        setDepositAmount(parseInt(data)); // Convert the response to an integer and set the state
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDepositAmount();
  }, [propertyId]);

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingData = {
      occupant_id: occupantId,
      property_id: propertyId,
      deposite: depositAmount, // corrected spelling
      trans_id: transaction,
      from: from,
      to: to,
    };

    fetch("http://localhost:8080/saveBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to book property");
        }
        console.log("Property booked successfully!");
        alert("Booking Successful");
      })
      .catch((error) => {
        console.error("Error booking property:", error);
        alert("Try again");
      });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Book Property</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleBooking}>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
            From Date
          </label>
          <input
            type="date"
            className="form-control"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="to" className="form-label">
            To Date
          </label>
          <input
            type="date"
            className="form-control"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Deposit Amount: Rs {depositAmount}
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="transaction" className="form-label">
            Enter transaction id:
          </label>
          <input
            type="text"
            className="form-control"
            id="transaction"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Book
        </button>
      </form>
    </div>
  );
}

export default Booking;
