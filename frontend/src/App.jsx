import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/HomePage";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Customers from "./pages/Customers";
import DashboardLayout from "./components/Layout";
import Reports from "./pages/Reports";
import Staff from "./pages/Staff";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/staff" element={<Staff />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
