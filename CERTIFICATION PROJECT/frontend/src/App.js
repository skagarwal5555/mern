import "./App.css";
import { Login } from "./components/common/Login";
import { Home } from "./components/home/Home";
import { CategoryProducts } from "./components/category/Category-products";
import { ProductPage } from "./components/products/Product-page";
import { Cart } from "./components/cart/Carts";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/navigation/Header";
import Profile from "./components/Profile";
import Checkout from "./components/common/Checkout";
import Orders from "./components/orders/Orders";
import AdminAddEditProduct from "./components/admin/AdminAddEditProduct";
import AdminManageProducts from "./components/admin/AdminManageProducts";
import { CategoryAll } from "./components/category/CategoryAll";
import OrderDetails from "./components/orders/OrderDetails";
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
          <Route path="/orders/:id" element={<OrderDetails />}></Route>
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
          <Route path="/categories" element={<CategoryAll />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
