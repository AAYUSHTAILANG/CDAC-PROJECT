import { NavLink } from "react-router-dom";

export default function MainNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">
          
          HOSTEL HUNT
        </a>
        <NavLink
                to="/"
                className="btn btn-outline-primary nav-link mr-4 px-3"
              ></NavLink>
            
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/login"
                className="btn btn-outline-primary nav-link mr-4 px-3"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signupowner"
                className="btn btn-outline-primary nav-link mr-2 px-6"
              >
                Signup for owner
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signupuser"
                className="btn btn-outline-primary nav-link mr-2 px-6"
              >
                Signup for User
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
