import "./App.css";
import LoginForm from './Components/LoginForm';
import Product from './Components/Product'
import SearchPage from './Components/searchPage';
import AlertComponent  from "./Components/Alerts";
import CheckList from "./Components/CheckList"
import {  useState } from "react";
function App() {
  
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <div className="App">
      {/* <Product></Product>
      <SearchPage/>*/}
      <LoginForm showError={updateErrorMessage}/>
      <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> 
      <CheckList/>
    </div>
  );
  
}

export default App;