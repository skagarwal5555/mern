import "./App.css";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { CategoryProducts } from "./components/Category-products";
import { ProductPage } from "./components/Product-page";
import { Cart } from "./components/Carts";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import AdminAddEditProduct from "./components/AdminAddEditProduct";
import AdminManageProducts from "./components/AdminManageProducts";
const alwaysCentered = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  return (
    <div>
      <Header></Header>
      <div style={alwaysCentered} className="mb-4 pb-2">
        <Routes>
          <Route path="/login" element={<Login isLogin={true} />}></Route>
          <Route path="/register" element={<Login isLogin={false} />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/categories/:catergory_id"
            element={<CategoryProducts />}
          ></Route>
          <Route path="/products/:product_id" element={<ProductPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route
            path="/admin/add-new-product"
            element={<AdminAddEditProduct />}
          ></Route>
          <Route
            path="/admin/products/:product_id/edit"
            element={<AdminAddEditProduct />}
          ></Route>
          <Route
            path="/admin/products"
            element={<AdminManageProducts />}
          ></Route>
          <Route path="/admin/orders" element={<Orders />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
