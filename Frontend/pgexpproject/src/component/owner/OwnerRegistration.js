import React, { useReducer, useEffect, useState } from "react";

const init = {
  owner_fname: "",
  owner_lname: "",
  owner_email: "",
  contact: "",
  owner_aadhar: "",
  owner_address: "",
  owner_password: "",
  city_id: "",
  area_id: "",
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

function OwnerRegistration() {
  const [state, dispatch] = useReducer(reducer, init);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [fieldBlur, setFieldBlur] = useState({
    owner_email: false,
    contact: false,
    owner_aadhar: false,
    owner_password: false,
  });

  const {
    owner_fname,
    owner_lname,
    owner_email,
    contact,
    owner_aadhar,
    owner_address,
    owner_password,
    city_id,
    area_id,
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
      case "owner_email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "contact":
        errorMessage = /^\d{10}$/.test(value) ? "" : "Invalid contact number";
        break;
      case "owner_aadhar":
        errorMessage = /^\d{12}$/.test(value) ? "" : "Invalid Aadhar number";
        break;
      case "owner_password":
        errorMessage =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      default:
        errorMessage = "";
    }
    setErrorMessage(errorMessage);
    dispatch({ type: "update", field: name, value: value });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setFieldBlur({ ...fieldBlur, [name]: true });
  };

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      owner_email &&
      contact &&
      owner_aadhar &&
      owner_password &&
      !errorMessage
    ) {
      try {
        const response = await fetch("http://localhost:8080/saveOwner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state), // Send form data as JSON
        });
        if (response.ok) {
          const data = await response.json();
          console.log("success:", data);
          setSuccessMessage("Owner registered successfully!");
          // Optionally, handle success response here
        } else {
          console.error("Failed to submit form:", response.status);
          setErrorMessage("Failed to register owner. Please try again.");
          // Optionally, handle error response here
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Network error occurred. Please try again.");
        // Optionally, handle network error here
      }
    } else {
      setErrorMessage("Please fill in all required fields correctly.");
    }
  };
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      owner_email &&
      contact &&
      owner_aadhar &&
      owner_password &&
      !errorMessage
    ) {
      try {
        const response = await fetch("http://localhost:8080/saveOwner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state), // Send form data as JSON
        });
        if (response.ok) {
          const data = await response.json();
          console.log("success:", data);
          setSuccessMessage("Owner registered successfully!");
          setErrorMessage(""); // Reset error message
          // Optionally, handle success response here
        } else {
          console.error("Failed to submit form:", response.status);
          setErrorMessage("Failed to register owner. Please try again.");
          setSuccessMessage(""); // Reset success message
          // Optionally, handle error response here
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Network error occurred. Please try again.");
        setSuccessMessage(""); // Reset success message
        // Optionally, handle network error here
      }
    } else {
      setErrorMessage("Please fill in all required fields correctly.");
      setSuccessMessage(""); // Reset success message
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Owner Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_fname"
                      className="col-sm-3 col-form-label"
                    >
                      First Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="owner_fname"
                        name="owner_fname"
                        value={owner_fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_lname"
                      className="col-sm-3 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="owner_lname"
                        name="owner_lname"
                        value={owner_lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_email"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        id="owner_email"
                        name="owner_email"
                        value={owner_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {fieldBlur.owner_email && (
                        <div className="text-danger">
                          {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(owner_email)
                            ? ""
                            : "Invalid email address"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="contact"
                      className="col-sm-3 col-form-label"
                    >
                      Contact
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {fieldBlur.contact && (
                        <div className="text-danger">
                          {/^\d{10}$/.test(contact)
                            ? ""
                            : "Invalid contact number"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_aadhar"
                      className="col-sm-3 col-form-label"
                    >
                      Aadhar
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="owner_aadhar"
                        name="owner_aadhar"
                        value={owner_aadhar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {fieldBlur.owner_aadhar && (
                        <div className="text-danger">
                          {/^\d{12}$/.test(owner_aadhar)
                            ? ""
                            : "Invalid Aadhar number"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_address"
                      className="col-sm-3 col-form-label"
                    >
                      Owner Address
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="owner_address"
                        name="owner_address"
                        value={owner_address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="city_id"
                      className="col-sm-3 col-form-label"
                    >
                      City
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-select"
                        id="city_id"
                        name="city_id"
                        value={city_id}
                        onChange={(e) => {
                          handleChange(e);
                          getAllAreas(e.target.value);
                        }}
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
                          className="form-select"
                          id="area_id"
                          name="area_id"
                          value={area_id}
                          onChange={handleChange}
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
                      </div>
                    </div>
                  )}
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="owner_password"
                      className="col-sm-3 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="owner_password"
                        name="owner_password"
                        value={owner_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {fieldBlur.owner_password && (
                        <div className="text-danger">
                          {owner_password.length >= 6
                            ? ""
                            : "Password must be at least 6 characters"}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerRegistration;
