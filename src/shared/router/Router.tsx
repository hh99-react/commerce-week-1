import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AnyRoute,
  PrivateRoute,
  PublicRoute,
  SellerRoute,
} from "./PrivateRoute";
import { Suspense, lazy } from "react";
// import Products from "@/pages/Products";
// import Login from "@/pages/Login";
// import Home from "@/pages/Home";
// import Layout from "@/components/layout/Layout";
// import SignUp from "@/pages/SignUp";
// import ProductRegistration from "@/pages/ProductRegistration";

const Layout = lazy(() => import("@/components/layout/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Products = lazy(() => import("@/pages/Products"));
const ProductRegistration = lazy(() => import("@/pages/ProductRegistration"));

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/products" element={<Products />} />
            </Route>
            <Route element={<SellerRoute />}>
              <Route
                path="/product-registration"
                element={<ProductRegistration />}
              />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route element={<AnyRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
