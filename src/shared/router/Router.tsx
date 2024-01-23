import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnyRoute, PrivateRoute, PublicRoute } from "./PrivateRoute";
import Products from "@/pages/Products";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import SignUp from "@/pages/SignUp";
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<AnyRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
