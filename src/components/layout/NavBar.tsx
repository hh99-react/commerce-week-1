// import React from 'react'
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { toast } = useToast();

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const user1 = user ? user : localStorage.getItem("userId");

  const logButtonHandler = async () => {
    if (user1) {
      await signOut(auth);
      localStorage.removeItem("userId");
      localStorage.removeItem("isSeller");

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
        {!loading && user1 ? (
          <div className="space-x-4">
            <Button
              className={path === "/products" ? "hidden" : "none"}
              onClick={() => navigate("/products")}
            >
              상품페이지
            </Button>
            <Button onClick={logButtonHandler}>로그아웃</Button>
          </div>
        ) : (
          !loading && (
            <Button
              className={
                path === "/login" || path === "/sign-up" ? "hidden" : "none"
              }
              onClick={logButtonHandler}
            >
              로그인
            </Button>
          )
        )}
      </nav>
    </div>
  );
};

export default NavBar;
