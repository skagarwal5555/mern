import "../App.css";
import productLogo from "../images/product1.jpg"
function Home() {

  return (
    <div className="container">
      <h4> Home Page </h4>
      <div class="container mb-4">
      <h4>Recommended Products</h4>
      <div class="card-deck"></div>
      <div class="card">
            <img
             alt="ProductImage"
              src={productLogo}
              class="card-img-top"
            />

            <div class="card-body">
              <h5 class="card-title">Red-Black Shoes</h5>
              <p class="card-text">Fake air jordan knock-offs</p>
              <a href="/" class="btn btn-primary" role="button">View</a>
            </div>
          </div>
       </div>
     </div>
  );
  
}

export default Home;