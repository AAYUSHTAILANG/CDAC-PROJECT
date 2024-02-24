import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  owner_id: localStorage.getItem("loggedOwner")?JSON.parse(localStorage.getItem("loggedOwner")).owner_id:'',
  properties: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTIES":
      return { ...state, properties: action.payload };
    default:
      return state;
  }
};

const ShowProperties = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedOwner = JSON.parse(localStorage.getItem("loggedOwner"));
    if (loggedOwner) {
      fetch(`http://localhost:8080/getProperty/${loggedOwner.owner_id}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Failed to fetch properties");
          }
          return resp.json();
        })
        .then((data) => {
          dispatch({ type: "SET_PROPERTIES", payload: data });
        })
        .catch((error) => console.error("Error fetching properties:", error));
    }
  }, []);

  const handleAddFacility = (propertyId) => {
    navigate(`/ownerhome/add_facility/${propertyId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Properties</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Property Name</th>

            <th>Address</th>
            <th>Rent per Month</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.properties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>

              <td>{property.address}</td>
              <td>{property.price}</td>
              {/* <td>{property.area_id.area_name}</td>
              <td>{property.area_id.city.city_name}</td>*/}
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddFacility(property.id)}
                >
                  Add Facility
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProperties;
