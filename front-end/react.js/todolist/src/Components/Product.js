import "../App.css";
import logo from "../logo.svg";
import { useState } from "react";

function Product() {
  const [a, setCount] = useState(1);
  const b = 5;
  const c = a*b;
  function getProduct(a,b,c)
  {
    setCount(a+1);    
  }


  return (
    <div className="container">
      <p> Product of {a} and {b} is {c}</p>
      <img src={logo} className="App-logo" alt="logo"></img>
      <button onClick={() => getProduct(a,b,c)}>Get Product</button>
    </div>
  );
  
}

export default Product;