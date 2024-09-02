import React from "react";
import Login from "../Users/Forms/Login";

function AdminRouete({ children }) {
  // Get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.data?.isAdmin ? true : false;
  if (!isAdmin) return <h1>You are not an admin. Unauthorized</h1>;
  return <>{children}</>;
}

export default AdminRouete;
