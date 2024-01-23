// import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { toast } = useToast();
  const user = auth.currentUser;

  const logButtonHandler = async () => {
    if (user) {
      await signOut(auth);
      localStorage.removeItem("userId");

      toast({
        variant: "green",
        title: "로그아웃 되었습니다.",
        duration: 1000,
      });
    }
    navigate("/login");
  };

  return (
    <div className="h-[10vh] fixed top-0 left-0 w-full mx-auto px-[10%] bg-white shadow-sm flex items-center z-50">
      <nav className="w-full flex items-center justify-between">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Logo
        </span>
        {user ? (
          <div className="space-x-4">
            <Button onClick={() => navigate("/products")}>상품페이지</Button>
            <Button onClick={logButtonHandler}>로그아웃</Button>
          </div>
        ) : (
          <Button
            className={path === "/login" || path === "/sign-up" ? "hidden" : ""}
            onClick={logButtonHandler}
          >
            로그인
          </Button>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
