import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowFacility from "./ShowFacility";
import "./PropertySearch.css";

function PropertySearch() {
  const [info, setInfo] = useState({
    city_id: "",
    area_id: "",
    cities: [],
    areas: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [occupantId, setOccupantId] = useState(""); // Add state for occupant ID
  const [propertyFacilities, setPropertyFacilities] = useState({});

  useEffect(() => {
    // Fetch cities from the backend
    fetch("http://localhost:8080/all")
      .then((resp) => resp.json())
      .then((data) => {
        setInfo((prevState) => ({ ...prevState, cities: data }));
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    // Fetch areas based on selected city from the backend
    if (info.city_id) {
      fetch(`http://localhost:8080/allAreas/${info.city_id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setInfo((prevState) => ({ ...prevState, areas: data }));
        })
        .catch((error) => console.error("Error fetching areas:", error));
    }
  }, [info.city_id]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      fetch(`http://localhost:8080/getOccupant?uid=${loggedUser.user_id}`)
        .then((resp) => {
          if (resp.ok) return resp.json();
          else throw new Error("Server error");
        })
        .then((obj) => {
          setOccupantId(obj.occupant_id);
        })
        .catch((error) => console.log(error.toString()));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGo = () => {
    // Fetch data from the server based on selected criteria
    fetch(`http://localhost:8080/searchProperty/${info.area_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve property data");
        }
        return response.json(); // Parse response data
      })
      .then((data) => {
        // Update state with fetched search results
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
        alert("Failed to retrieve property data");
      });
  };

  const handleViewFacilities = (propertyId) => {
    // Toggle selectedPropertyId if it's already the selected property
    setSelectedPropertyId((prevId) =>
      prevId === propertyId ? null : propertyId
    );

    // Fetch facilities only if it's a different property being selected
    if (selectedPropertyId !== propertyId) {
      fetch(`http://localhost:8080/getFacilities/${propertyId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to retrieve facilities");
          }
          return response.json();
        })
        .then((data) => {
          setPropertyFacilities({ ...propertyFacilities, [propertyId]: data });
        })
        .catch((error) => {
          console.error("Error fetching facilities:", error);
          // alert("Failed to retrieve facilities");
        });
    }
  };

  const handleRequest = (propertyId) => {
    // Send request to backend to add the request to OccupantRequest table
    fetch(`http://localhost:8080/sendRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        occupant_id: occupantId, // Include occupant ID
        property_id: propertyId, // Include property ID
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add occupant request");
        } else {
          alert("Occupant request added successfully");
        }
      })
      .catch((error) => {
        console.error("Error adding occupant request:", error);
        alert("Failed to add occupant request");
      });
  };

  return (
    <div className="container">
      <h4 className="text-center mb-4">Property Search</h4>
      <div className="row justify-content-center align-items-end">
        <div className="col-sm-3">
          <label htmlFor="city_id" className="form-label">
            City
          </label>
          <select
            className="form-select"
            id="city_id"
            name="city_id"
            value={info.city_id}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {info.cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-3">
          <label htmlFor="area_id" className="form-label">
            Area
          </label>
          <select
            className="form-select"
            id="area_id"
            name="area_id"
            value={info.area_id}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {info.areas.map((area) => (
              <option key={area.area_id} value={area.area_id}>
                {area.area_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <button
            type="button"
            className="btn btn-primary btn-outline-blue w-100"
            onClick={handleGo}
          >
            Go
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-sm-8">
          {searchResults.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Rent per month</th>
                  <th>Facilities</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <React.Fragment key={result.id}>
                    <tr>
                      <td>{result.name}</td>
                      <td>{result.address}</td>
                      <td>{result.price}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "propertyFacility",
                            state: { searchResults: searchResults },
                          }}
                          onClick={() => handleViewFacilities(result.id)}
                        >
                          {selectedPropertyId === result.id
                            ? "Hide Facilities"
                            : "View Facilities"}
                        </Link>
                        {selectedPropertyId === result.id &&
                          propertyFacilities[result.id] && (
                            <ul>
                              {propertyFacilities[result.id].map((facility) => (
                                <li key={facility.id}>{facility.name}</li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-outline-blue w-100"
                          onClick={() => handleRequest(result.id)}
                        >
                          Request
                        </button>
                      </td>
                    </tr>
                    {selectedPropertyId === result.id && (
                      <tr>
                        <td colSpan="5">
                          <ShowFacility propertyId={selectedPropertyId} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertySearch;
