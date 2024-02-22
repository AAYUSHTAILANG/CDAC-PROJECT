import React, { useReducer, useEffect, useState } from "react";

function AddProperty() {
  const init = {
    name: "",
    // location: "",
    area_id: "",
    description: "",
    price: "",
    capacity: "",
    no_of_occupants: "",
    city_id: "",
    owner_id: JSON.parse(localStorage.getItem("loggedOwner")).owner_id,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.field]: action.value };
      case "reset":
        return init;
      case "update_area":
        return { ...state, area_id: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [allCities, setAllCities] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [fieldBlur, setFieldBlur] = useState({
    name: false,
    area_id: false,
    description: false,
    price: false,
    capacity: false,
    no_of_occupants: false,
    // location: false,
    city_id: false,
  });

  //const vid = JSON.parse(localStorage.getItem("loggedOwner")).owner_id;
  //dispatch({ type: "update", field: "owner_id", value: vid });
  const {
    name,
    area_id,
    description,
    price,
    capacity,
    no_of_occupants,
    city_id,

    owner_id,
  } = state;

  useEffect(() => {
    // Fetch cities from the backend
    fetch("http://localhost:8080/all")
      .then((resp) => resp.json())
      .then((data) => setAllCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = /^[A-Z][a-z]*$/.test(value)
          ? ""
          : "Enter First letter in capital case";
        break;
      case "price":
        errorMessage = /^\d{1,6}$/.test(value) ? "" : "Enter appropriate price";
        break;
      case "capacity":
        errorMessage = /^\d{1,3}$/.test(value)
          ? ""
          : "Enter appropriate capacity";
        break;
      case "no_of_occupants":
        errorMessage = /^\d{1,3}$/.test(value)
          ? ""
          : "Enter appropriate capacity";
        break;
      default:
        errorMessage = "";
    }
    setErrorMessage({ ...errorMessage, [name]: errorMessage });
    dispatch({ type: "update", field: name, value: value });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setFieldBlur({ ...fieldBlur, [name]: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!name) {
      errors.name = "Please enter a name";
    } else if (!/^[A-Z][a-z]*$/.test(name)) {
      errors.name = "Enter First letter in capital case";
    }
    if (!price) {
      errors.price = "Please enter a price";
    } else if (!/^\d{1,6}$/.test(price)) {
      errors.price = "Enter appropriate price";
    }
    if (!capacity) {
      errors.capacity = "Please enter a capacity";
    } else if (!/^\d{1,3}$/.test(capacity)) {
      errors.capacity = "Enter appropriate capacity";
    }
    if (!no_of_occupants) {
      errors.no_of_occupants = "Please enter number of occupants";
    } else if (!/^\d{1,3}$/.test(no_of_occupants)) {
      errors.no_of_occupants = "Enter appropriate number of occupants";
    }
    // if (!location) {
    //   errors.location = "Please enter a location";
    // }
    if (!city_id) {
      errors.city_id = "Please select a city";
    }
    if (!area_id) {
      errors.area_id = "Please select an area";
    }

    setErrorMessage(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/saveProperty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("success:", data);
          setSuccessMessage("Property saved successfully!");
          setErrorMessage({});
        } else {
          console.error("Failed to submit form:", response.status);
          setErrorMessage("Failed to register owner. Please try again.");
          setSuccessMessage("");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Network error occurred. Please try again.");
        setSuccessMessage("");
      }
    }
  };

  const getAllAreas = (id) => {
    fetch(`http://localhost:8080/allAreas/${id}`)
      .then((resp) => resp.json())
      .then((data) => setAllAreas(data))
      .catch((error) => console.error("Error fetching areas:", error));
  };

  return (
    <>
      <style>
        {`.text-danger {
          color: red;
        }`}
      </style>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Add Property</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessage.name && fieldBlur.name
                            ? "text-danger"
                            : ""
                        }`}
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errorMessage.name && fieldBlur.name && (
                        <div className="text-danger">{errorMessage.name}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="description"
                      className="col-sm-3 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessage.description && fieldBlur.description
                            ? "text-danger"
                            : ""
                        }`}
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errorMessage.description && fieldBlur.description && (
                        <div className="text-danger">
                          {errorMessage.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmperlFor="price"
                      className="col-sm-3 col-form-label"
                    >
                      Rent month
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessage.price && fieldBlur.price
                            ? "text-danger"
                            : ""
                        }`}
                        id="price"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errorMessage.price && fieldBlur.price && (
                        <div className="text-danger">{errorMessage.price}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="capacity"
                      className="col-sm-3 col-form-label"
                    >
                      Capacity
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessage.capacity && fieldBlur.capacity
                            ? "text-danger"
                            : ""
                        }`}
                        id="capacity"
                        name="capacity"
                        value={capacity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errorMessage.capacity && fieldBlur.capacity && (
                        <div className="text-danger">
                          {errorMessage.capacity}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="no_of_occupants"
                      className="col-sm-3 col-form-label"
                    >
                      Number Of Occupants
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessage.no_of_occupants &&
                          fieldBlur.no_of_occupants
                            ? "text-danger"
                            : ""
                        }`}
                        id="no_of_occupants"
                        name="no_of_occupants"
                        value={no_of_occupants}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errorMessage.no_of_occupants &&
                        fieldBlur.no_of_occupants && (
                          <div className="text-danger">
                            {errorMessage.no_of_occupants}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="location"
                      className="col-sm-3 col-form-label"
                    >
                      Location
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className={`form-control ${
                          errorMessage.location && fieldBlur.location
                            ? "text-danger"
                            : ""
                        }`}
                        id="location"
                        name="location"
                        value={location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      ></textarea>
                      {errorMessage.location && fieldBlur.location && (
                        <div className="text-danger">
                          {errorMessage.location}
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="city_id"
                      className="col-sm-3 col-form-label"
                    >
                      City
                    </label>
                    <div className="col-sm-9">
                      <select
                        className={`form-select ${
                          errorMessage.city_id && fieldBlur.city_id
                            ? "text-danger"
                            : ""
                        }`}
                        id="city_id"
                        name="city_id"
                        value={city_id}
                        onChange={(e) => {
                          handleChange(e);
                          getAllAreas(e.target.value);
                        }}
                        onBlur={handleBlur}
                        required
                      >
                        <option value="">Select</option>
                        {allCities.map((city) => (
                          <option
                            key={city.city_id}
                            value={city.city_id}
                          >{`${city.city_name}`}</option>
                        ))}
                      </select>
                      {errorMessage.city_id && fieldBlur.city_id && (
                        <div className="text-danger">
                          {errorMessage.city_id}
                        </div>
                      )}
                    </div>
                  </div>
                  {city_id && (
                    <div className="mb-3 row align-items-center">
                      <label
                        htmlFor="area_id"
                        className="col-sm-3 col-form-label"
                      >
                        Area
                      </label>
                      <div className="col-sm-9">
                        <select
                          className={`form-select ${
                            errorMessage.area_id && fieldBlur.area_id
                              ? "text-danger"
                              : ""
                          }`}
                          id="area_id"
                          name="area_id"
                          value={area_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        >
                          <option value="">Select</option>
                          {allAreas.map((area) => (
                            <option
                              key={area.area_id}
                              value={area.area_id}
                            >{`${area.area_name}`}</option>
                          ))}
                        </select>
                        {errorMessage.area_id && fieldBlur.area_id && (
                          <div className="text-danger">
                            {errorMessage.area_id}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-block">
                    Add Property
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p> {JSON.stringify(state)}</p>
      </div>
    </>
  );
}

export default AddProperty;
