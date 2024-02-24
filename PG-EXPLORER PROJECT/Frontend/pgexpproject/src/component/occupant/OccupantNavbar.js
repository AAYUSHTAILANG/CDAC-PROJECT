import { NavLink } from "react-router-dom";

function OccupantNavbar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          <a className="navbar-brand" href="#">
            Occupant
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="property_search"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Search Accomodation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="property_requested"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Applied Properties
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="updateOccupant"
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
      </div>
    </>
  );
}

export default OccupantNavbar;
