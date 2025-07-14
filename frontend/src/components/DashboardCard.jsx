import React from "react";
import {
  DollarSign,
  Users,
  Star,
  AlertTriangle,
  UserPlus,
  Boxes,
  Activity,
  Calculator,
} from "lucide-react";

function DashboardCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {/* Total Sales */}
      <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <DollarSign className="text-blue-600 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">Total Sales</h2>
        <p className="text-2xl font-bold text-blue-700 mt-2">Ksh 12,345</p>
        <p className="text-sm text-green-600 mt-1">↑ 12% this week</p>
      </div>

      {/* Total Customers */}
      <div className="bg-gray-100 hover:bg-gray-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <Users className="text-blue-600 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">Total Customers</h2>
        <p className="text-2xl font-bold text-blue-700 mt-2">345</p>
        <p className="text-sm text-green-600 mt-1">↑ 5% this month</p>
      </div>

      {/* Top Sold Product */}
      <div className="bg-pink-100 hover:bg-pink-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <Star className="text-yellow-500 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-900">Top Sold Product</h2>
        <p className="text-2xl font-bold text-blue-600 mt-2">Solar Panel A</p>
        <p className="text-sm text-gray-600 mt-1">345 units sold</p>
      </div>

      {/* Out of Stock */}
      <div className="bg-red-100 hover:bg-red-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <AlertTriangle className="text-red-600 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-900">Out of Stock</h2>
        <p className="text-2xl font-bold text-red-700 mt-2">Wires</p>
        <p className="text-sm text-red-500 mt-1">Restock soon</p>
      </div>

      {/* New Customers This Month */}
      <div className="bg-green-100 hover:bg-green-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <UserPlus className="text-green-700 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">New Customers</h2>
        <p className="text-2xl font-bold text-green-800 mt-2">+42</p>
        <p className="text-sm text-green-600 mt-1">This month</p>
      </div>

      {/* Average Order Value */}
      <div className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <Calculator className="text-yellow-700 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">Avg. Order Value</h2>
        <p className="text-2xl font-bold text-yellow-800 mt-2">Ksh 3,567</p>
        <p className="text-sm text-yellow-700 mt-1">All time</p>
      </div>

      {/* Low Stock Items */}
      <div className="bg-orange-100 hover:bg-orange-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <Boxes className="text-orange-700 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">Low Stock Items</h2>
        <p className="text-2xl font-bold text-orange-800 mt-2">5</p>
        <p className="text-sm text-orange-700 mt-1">Below threshold</p>
      </div>

      {/* Active Staff Today */}
      <div className="bg-indigo-100 hover:bg-indigo-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <Activity className="text-indigo-700 w-6 h-6 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">Active Staff</h2>
        <p className="text-2xl font-bold text-indigo-800 mt-2">6 Online</p>
        <p className="text-sm text-indigo-700 mt-1">Today</p>
      </div>
    </div>
  );
}

export default DashboardCard;
