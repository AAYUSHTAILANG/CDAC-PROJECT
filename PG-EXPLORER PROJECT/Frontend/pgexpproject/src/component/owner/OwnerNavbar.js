import { NavLink, Route, Routes } from "react-router-dom";
import ShowProperties from "./ShowProperties";
import OccupantRequest from "./OccupantRequest";
import AddFacility from "./AddFacility";
import AddProperty from "./AddProperty";
import UpdateOwnerProfile from "./UpdateOwnerProfile";

function OwnerNavbar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          <a className="navbar-brand" href="#">
            Owner
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="properties"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Properties
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="add_property"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Add Property
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="occupant_request"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Occupant Request
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="updateOwner"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Update Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/logout"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="col">
          <Routes>
            <Route path="/occupant_request" element={<OccupantRequest />} />
            <Route path="/add_facility/:propertyId" element={<AddFacility />} />
            <Route path="/add_property" element={<AddProperty />} />
            <Route path="/updateOwner" element={<UpdateOwnerProfile />} />
            <Route path="/properties" element={<ShowProperties />} />
          </Routes>
        </div> */}
      </div>
    </>
  );
}

export default OwnerNavbar;
