import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

export const PrivateRoute = (): React.ReactElement => {
  const user = auth.currentUser;
  const token = localStorage.getItem("userId");
  const { toast } = useToast();
  const userCheck = (user: any | null): boolean => {
    if (user || token) {
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "로그인 후에 접근 가능합니다.",
        duration: 1000,
      });
      return false;
    }
  };

  return userCheck(user) ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = (): React.ReactElement => {
  const user = auth.currentUser;
  const token = localStorage.getItem("userId");
  const { toast } = useToast();
  const userCheck = (user: any | null): boolean => {
    if (user || token) {
      toast({
        variant: "destructive",
        title: "로그인 상태입니다.",
        duration: 1000,
      });
      return true;
    } else {
      return false;
    }
  };
  return userCheck(user) ? <Navigate to="/" /> : <Outlet />;
};

export const AnyRoute = (): React.ReactElement => {
  return <Outlet />;
};
