// BookingContext.js
import React, { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedProperties, setBookedProperties] = useState([]);

  const addBookedProperty = (property) => {
    setBookedProperties([...bookedProperties, property]);
  };

  return (
    <BookingContext.Provider value={{ bookedProperties, addBookedProperty }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
