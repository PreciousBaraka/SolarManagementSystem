import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useSelector } from "react-redux";

function DashboardLayout() {
  const {userInfo} = useSelector((state) => state.user)
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100">
        <Topbar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
