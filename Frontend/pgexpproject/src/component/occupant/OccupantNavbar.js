import { Link } from "react-router-dom";

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
                <Link
                  to="property_search"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Search Accomodation
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="property_requested"
                  className="btn btn-outline-primary nav-link mr-4 px-3"
                >
                  Applied Properties
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="updateOccupant"
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
      </div>
    </>
  );
}

export default OccupantNavbar;
