import "./App.css";
import { Login } from "./components/common/Login";
import { Home } from "./components/home/Home";
import { CategoryProducts } from "./components/category/Category-products";
import { ProductPage } from "./components/products/Product-page";
import { Cart } from "./components/cart/Carts";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/navigation/Header";
import Profile from "./components/Profile";
import Checkout from "./components/common/Checkout";
import Orders from "./components/orders/Orders";
import AdminAddEditProduct from "./components/admin/AdminAddEditProduct";
import AdminManageProducts from "./components/admin/AdminManageProducts";
import { CategoryAll } from "./components/category/CategoryAll";
import OrderDetails from "./components/orders/OrderDetails";
import AccessDeniedPage from "./components/common/AccessDeniedPage";
import { useSelector } from "react-redux";
import DisplayAlertMessage from "./components/common/DisplayAlertMessage";
import * as routes from "./constants/routes";
import PageNotFound from "./components/common/PageNotFound";
import AdminManageUsers from "./components/admin/users/AdminManageUsers";
import AdminAddEditUsers from "./components/admin/users/AdminAddEditUsers";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <Header></Header>
      <DisplayAlertMessage></DisplayAlertMessage>
      <div className="alwaysCentered mb-4 pb-2">
        <Routes>
          <Route path={routes.LOGIN} element={<Login isLogin={true} />}></Route>
          <Route
            path={routes.REGISTER}
            element={<Login isLogin={false} />}
          ></Route>
          <Route
            path={routes.PROFILE}
            element={
              auth.acessToken.length > 0 ? (
                <Profile />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.CATEGORIES_PRODUCT}
            element={<CategoryProducts />}
          ></Route>
          <Route path={routes.VIEW_PRODUCT} element={<ProductPage />}></Route>
          <Route path={routes.CART} element={<Cart />}></Route>
          <Route path={routes.HOME} element={<Home />}></Route>
          <Route path={routes.CHECKOUT} element={<Checkout />}></Route>
          <Route
            path={routes.ORDERS}
            element={
              auth.acessToken.length > 0 ? (
                <Orders />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ORDERS_INFO}
            element={
              auth.acessToken.length > 0 && !auth.isAdmin ? (
                <OrderDetails />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ADD_PRODUCT}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminAddEditProduct />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.EDIT_PRODUCT}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminAddEditProduct />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ADMIN_PRODUCTS}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminManageProducts />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ADD_USER}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminAddEditUsers />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.EDIT_USER}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminAddEditUsers />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ADMIN_USERS}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <AdminManageUsers />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route
            path={routes.ADMIN_ORDERS}
            element={
              auth.acessToken.length > 0 && auth.isAdmin ? (
                <Orders />
              ) : (
                <AccessDeniedPage></AccessDeniedPage>
              )
            }
          ></Route>
          <Route path={routes.ALL_CATEGORIES} element={<CategoryAll />}></Route>
          <Route
            path={routes.ACCESSDENIED}
            element={<AccessDeniedPage />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
