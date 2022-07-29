import { NavLink } from "react-router-dom";
import shop24x7Logo from "../static/logo_wordmark.png";
import { useSelector } from "react-redux";
export function Header() {
  var token = useSelector((state) => state.auth.acessToken);
  console.log(token);
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          {<img src={shop24x7Logo} alt="navbar-brand" width="30" height="30" />}
          shop24X7
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline mr-auto my-2 my-lg-0 mr-2">
            <input
              type="search"
              className="form-control mr-sm-2"
              name="searchBar"
              id="searchBar"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              aria-label="btn"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Departments
              </NavLink>
            </li>
            <li style={{ display: token !== "" ? "none" : "block" }}>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </ul>

          <ul
            className="navbar-nav"
            style={{ display: token !== "" ? "block" : "none" }}
          >
            <li className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
              >
                <strong>Account</strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
              </a>
              <div className="dropdown-menu dropdown-menu-right bg-primary">
                <NavLink
                  to="/orders"
                  className="nav-link nav-item navbar-dark nav-link"
                >
                  My Orders
                </NavLink>
                <NavLink to="/Profile" className="nav-link nav-item">
                  My Profile
                </NavLink>
                <a href="/" className="dropdown-item">
                  <div className="dropdown-divider"></div>
                  <strong>Logout</strong>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
