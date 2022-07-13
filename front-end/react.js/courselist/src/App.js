import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Enquiries from "./components/Enquiries";
import CourseList from "./components/Courselist";
function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-primary">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/enquiries" className="nav-link">
                Enquiries
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<CourseList />}></Route>
        <Route exact path="/enquiries" element={<Enquiries />}></Route>
      </Routes>
    </div>
  );
}

export default App;
