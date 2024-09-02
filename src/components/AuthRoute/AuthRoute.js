import React from "react";
import Login from "../Users/Forms/Login";

function AuthRoute({ children }) {
  // Get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <Login />;
  return <>{children}</>;
}

export default AuthRoute;
