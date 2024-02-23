import { Link, Route, Routes } from "react-router-dom";
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
                <Link
                  to="properties"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="add_property"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Add Property
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="occupant_request"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Occupant Request
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="updateOwner"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Update Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/logout"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Logout
                </Link>
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