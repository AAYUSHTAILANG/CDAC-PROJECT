import { Link, Route, Routes } from "react-router-dom";
import AdminRequest from "./AdminRequest";
import RemoveOwner from "./RemoveOwner";
import Logout from "../Logout";
import AdminMain from "./AdminMain";

function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">
          Admin
        </a>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="admin_main"
                className="btn btn-outline-primary nav-link mr-4 px-3"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="accept_request"
                className="btn btn-outline-primary nav-link mr-4 px-3"
              >
                Accept Request
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
  );
}

export default AdminNavbar;
