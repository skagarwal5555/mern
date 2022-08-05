import { NavLink } from "react-router-dom";
import shop24x7Logo from "../../static/logo_wordmark.png";
import cartIcon from "../../static/cartIcon.png";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import store from "../../redux/store/store";
import { resetAuth } from "../../redux/actions/authActions";
import { clearCart } from "../../redux/actions/cartActions";
import { clearOrder } from "../../redux/actions/orderActions";
import { clearProfile } from "../../redux/actions/profileActions";
import { setProducts } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import ProductSearch from "../common/ProductSearch";
import * as routes from "../../constants/routes";

export function UserNavigation({ auth }) {
  const navigate = useNavigate();
  let cartItem = useSelector((state) => state.cart);
  const handleSignOut = () => {
    //clear states
    store.dispatch(resetAuth());
    store.dispatch(clearCart());
    store.dispatch(clearOrder());
    store.dispatch(clearProfile());
    store.dispatch(setProducts([]));
    navigate(routes.LOGIN);
  };
  const handleLogoClick = (event) => {
    event.preventDefault();
    navigate(routes.HOME);
  };
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
        <a className="navbar-brand" href="/" onClick={handleLogoClick}>
          {<img src={shop24x7Logo} alt="navbar-brand" width="50" height="40" />}
          &nbsp; shop24X7
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline mr-auto my-2 my-lg-0 mr-2">
            <ProductSearch />
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={routes.HOME} className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={routes.ALL_CATEGORIES} className="nav-link">
                Categories
              </NavLink>
            </li>
            <li style={{ display: auth.acessToken !== "" ? "none" : "block" }}>
              <NavLink to={routes.LOGIN} className="nav-link">
                Login
              </NavLink>
            </li>
            <li style={{ cursor: "pointer" }}>
              <NavLink to={routes.CART} className="nav-link">
                <img src={cartIcon} alt="navbar-brand" width="30" height="30" />
                <Badge bg="secondary">
                  {cartItem.reduce((accumulator, object) => {
                    return accumulator + object.quantity;
                  }, 0)}
                </Badge>
              </NavLink>
            </li>
          </ul>

          <ul
            className="navbar-nav"
            style={{ display: auth.acessToken !== "" ? "block" : "none" }}
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
              <div className="dropdown-menu dropdown-menu-right bg-dark">
                <NavLink
                  to={routes.ORDERS}
                  className="nav-link nav-item navbar-dark nav-link"
                >
                  My Orders
                </NavLink>
                <NavLink to={routes.PROFILE} className="nav-link nav-item">
                  My Profile
                </NavLink>
                <a href="/" className="dropdown-item">
                  <div
                    className="dropdown-divider bg-primary"
                    onClick={handleSignOut}
                  ></div>
                  <strong style={{ color: "red" }}>Logout</strong>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default UserNavigation;
