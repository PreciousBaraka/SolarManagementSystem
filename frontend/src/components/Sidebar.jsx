import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  User,
  CircleX,
} from "lucide-react";
import { images } from "../lib/constants";

const Sidebar = () => {
  const links = [
    {
      id: 1,
      url: "/dashboard",
      title: "Dashboard",
      iconClass: () => <LayoutDashboard />,
    },
    { id: 2, url: "/sales", title: "Sales", iconClass: () => <ShoppingCart /> },
    {
      id: 3,
      url: "/products",
      title: "Products",
      iconClass: () => <Package />,
    },
    {
      id: 4,
      url: "/customers",
      title: "Customers",
      iconClass: () => <Users />,
    },
    { id: 5, url: "/staff", title: "Staff", iconClass: () => <User /> },
    {
      id: 6,
      url: "/reports",
      title: "Reports",
      iconClass: () => <LineChart />,
    },
  ];

  return (
    <aside className="bg-base-100 shadow-md w-[250px] overflow-y-auto relative">
      <div className="flex flex-col items-center py-4 space-y-2">
        <img
          src={images.logo}
          alt="Solar Company"
          className="h-16 w-16 rounded-full object-cover"
        />
        <h6 className="uppercase text-blue-500 font-semibold text-sm text-center px-2">
          Solar Management System
        </h6>
        <button className="md:hidden h-10 w-10 flex justify-center items-center cursor-pointer text-primary rounded-full bg-blue-100 shadow-md hover:bg-gray-100 transition">
          <CircleX />
        </button>
      </div>

      <div className="px-2 pb-4 mb-8">
        <ul className="mt-2 space-y-1">
          {links.map(({ id, url, iconClass, title }) => (
            <li key={id}>
              <NavLink
                to={url}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all font-medium ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "text-neutral hover:bg-gray-300 hover:text-neutral"
                  }`
                }
              >
                {iconClass()}
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-3 bg-blue-500 py-2 px-4 absolute bottom-0 left-0 right-0">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-base-100 shadow-md ">
          <User className="text-neutral" size={18} />
        </div>
        <div className="flex flex-col items-start">
          <h6 className="text-neutral-content text-sm">Welcome</h6>
          <button className="btn btn-sm btn-neutral text-white mt-2"> 
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
