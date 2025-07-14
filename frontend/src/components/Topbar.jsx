import { User } from "lucide-react";
import React from "react";
import Avatar from "./avatar/Avatar";

function Topbar() {
  return (
    <div className="flex items-center justify-end bg-blue-50 shadow-md px-4 py-2">
      <div className="flex flex-col items-center">
        <Avatar />
        <span className="text-blue-500 font-semibold text-sm mt-1">Welcome, User</span>
      </div>
    </div>
  );
}

export default Topbar;
