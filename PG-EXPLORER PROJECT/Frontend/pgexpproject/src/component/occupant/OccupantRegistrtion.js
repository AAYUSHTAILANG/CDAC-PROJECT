import React, { useReducer, useEffect, useState } from "react";

const init = {
  occupant_fname: "",
  occupant_lname: "",
  occupant_email: "",
  occupant_contact: "",
  occupant_gender: "",
  occupant_profession: "",
  occupant_address: "",
  occupant_aadhar: "",
  occupant_city: "",
  area_id: "",
  alternate_contact: "",
  occupant_password: "",
  cities: [],
  areas: [],
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

function OccupantRegistration() {
  const [info, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState({
    occupant_email: "",
    occupant_contact: "",
    occupant_aadhar: "",
    occupant_password: "",
  });

  const {
    occupant_fname,
    occupant_lname,
    occupant_email,
    occupant_contact,
    occupant_gender,
    occupant_profession,
    occupant_address,
    occupant_aadhar,
    occupant_city,
    area_id,
    alternate_contact,
    occupant_password,
    cities,
    areas,
  } = info;

  useEffect(() => {
    // Fetch cities from the backend
    fetch("http://localhost:8080/all")
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "update", field: "cities", value: data });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    // Fetch areas based on selected city from the backend
    if (occupant_city) {
      fetch(`http://localhost:8080/allAreas/${occupant_city}`)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({ type: "update", field: "areas", value: data });
        })
        .catch((error) => console.error("Error fetching areas:", error));
    }
  }, [occupant_city]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "update", field: name, value: value });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "occupant_email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "occupant_contact":
        errorMessage = /^\d{10}$/.test(value) ? "" : "Invalid contact number";
        break;
      case "occupant_aadhar":
        errorMessage = /^\d{12}$/.test(value) ? "" : "Invalid Aadhar number";
        break;
      case "occupant_password":
        errorMessage =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      default:
        errorMessage = "";
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission if there are no errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      // Prepare occupant data for submission
      const occupantData = {
        occupant_fname,
        occupant_lname,
        occupant_email,
        occupant_contact,
        occupant_gender,
        occupant_profession,
        occupant_address,
        occupant_aadhar,
        occupant_city,
        area_id,
        alternate_contact,
        occupant_password,
      };

      // Send occupant data to server
      fetch("http://localhost:8080/saveOccupant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(occupantData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save occupant data");
          }
          // Reset form fields if data is successfully saved
          dispatch({ type: "reset" });
          setErrors({
            occupant_email: "",
            occupant_contact: "",
            occupant_aadhar: "",
            occupant_password: "",
          });
          alert("Occupant data saved successfully");
        })
        .catch((error) => {
          console.error("Error saving occupant data:", error);
          alert("Failed to save occupant data");
        });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Occupant Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_fname"
                      className="col-sm-3 col-form-label"
                    >
                      First Name
                      
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="occupant_fname"
                        name="occupant_fname"
                        value={occupant_fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_lname"
                      className="col-sm-3 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="occupant_lname"
                        name="occupant_lname"
                        value={occupant_lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_email"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        id="occupant_email"
                        name="occupant_email"
                        value={occupant_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.occupant_email && (
                        <div className="text-danger">
                          {errors.occupant_email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_contact"
                      className="col-sm-3 col-form-label"
                    >
                      Contact
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="tel"
                        className="form-control"
                        id="occupant_contact"
                        name="occupant_contact"
                        value={occupant_contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.occupant_contact && (
                        <div className="text-danger">
                          {errors.occupant_contact}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label className="col-sm-3 col-form-label">Gender</label>
                    <div className="col-sm-9">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="occupant_gender"
                          id="male"
                          value="male"
                          checked={occupant_gender === "male"}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="occupant_gender"
                          id="female"
                          value="female"
                          checked={occupant_gender === "female"}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_profession"
                      className="col-sm-3 col-form-label"
                    >
                      Profession
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="occupant_profession"
                        name="occupant_profession"
                        value={occupant_profession}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_address"
                      className="col-sm-3 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="occupant_address"
                        name="occupant_address"
                        value={occupant_address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_aadhar"
                      className="col-sm-3 col-form-label"
                    >
                      Aadhar
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="occupant_aadhar"
                        name="occupant_aadhar"
                        value={occupant_aadhar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.occupant_aadhar && (
                        <div className="text-danger">
                          {errors.occupant_aadhar}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_city"
                      className="col-sm-3 col-form-label"
                    >
                      City
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-select"
                        id="occupant_city"
                        name="occupant_city"
                        value={occupant_city}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {cities.map((city) => (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                        {areas.map((area) => (
                          <option key={area.area_id} value={area.area_id}>
                            {area.area_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="alternate_contact"
                      className="col-sm-3 col-form-label"
                    >
                      Alternate Contact
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="tel"
                        className="form-control"
                        id="alternate_contact"
                        name="alternate_contact"
                        value={alternate_contact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="occupant_password"
                      className="col-sm-3 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="occupant_password"
                        name="occupant_password"
                        value={occupant_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.occupant_password && (
                        <div className="text-danger">
                          {errors.occupant_password}
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
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

export default OccupantRegistration;
