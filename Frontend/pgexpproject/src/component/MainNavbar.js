import { Link } from "react-router-dom";

export default function MainNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">
          HOSTEL HUNT
        </a>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/login"
                className="btn btn-outline-primary nav-link mr-4 px-3"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signupowner"
                className="btn btn-outline-primary nav-link mr-2 px-6"
              >
                Signup for owner
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signupuser"
                className="btn btn-outline-primary nav-link mr-2 px-6"
              >
                Signup for User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
