import './App.css';
import logo from "../src/images/logo.png"
import { Routes, Route , NavLink } from "react-router-dom";
import Products from "../src/components/Products";
import About from "../src/components/About";
import MyOrders from './components/MyOrders';
import MyProfile from './components/MyProfile';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
         <nav
      className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        {<img
          src={logo}
          alt="navbar-brand"
          width="30"
          height="30"
        />}
        Sporty Shoes
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline mr-auto my-2 my-lg-0 mr-2">
          <input
            type="search"
            className="form-control mr-sm-2"
            name="searchBar"
            id="searchBar"
          />
          <button className="btn btn-outline-light my-2 my-sm-0" aria-label="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
              </li>

              <li className="nav-item">
               <NavLink to="/products" className="nav-link">Products</NavLink>
              </li>

              <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
              </li>
            </ul>

            <ul className="navbar-nav">
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
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    /></svg
                ></a>
                <div className="dropdown-menu dropdown-menu-right bg-primary">
                <NavLink to="/MyOrders" className="nav-link nav-item navbar-dark nav-link">My Orders</NavLink>
                <NavLink to="/MyProfile" className="nav-link nav-item">My Profile</NavLink>
                  <a href="/" className="dropdown-item">
                    <div className="dropdown-divider"></div>
                    <strong>Logout</strong>
                  </a>
                </div>
              </li>
            </ul>
      </div>
    </nav>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/products" element={<Products/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
      <Route exact path="/MyOrders" element={<MyOrders/>}></Route>
      <Route exact path="/MyProfile" element={<MyProfile/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
