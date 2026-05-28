import { Link } from "react-router-dom";
import { LayoutDashboard, BarChart2, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex gap-6  text-sm font-medium text-gray-600">
      <Link to="/" className="flex items-center gap-1 hover:text-blue-600">
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>

      <Link
        to="/analytics"
        className="flex items-center gap-1 hover:text-blue-600"
      >
        <BarChart2 className="w-4 h-4" />
        Analytics
      </Link>
      <Link to="/reports">Reports</Link>
      <Link to="/insights">Insights</Link>
    </nav>
  );
}
