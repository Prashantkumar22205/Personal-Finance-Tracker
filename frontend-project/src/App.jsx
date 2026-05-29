
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { TransactionProvider } from "./context/TransactionContext";
import Summary from "./components/Summary";
import TransactionsList from "./components/TransactionsList";
import AddTransaction from "./components/AddTransaction";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import Insights from "./components/Insights";
import Navbar from "./components/Navbar";
import BudgetTracker from "./components/BudgetTracker";


import { Wallet } from "lucide-react";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("pf_user_email");
    if (storedEmail) setUserEmail(storedEmail);
    setLoading(false);
  }, []);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem("pf_user_email", email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("pf_user_email");
  };

  const isLoggedIn = !!userEmail;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <TransactionProvider>
        <div className="min-h-screen  bg-blue-100 from-slate-100 via-slate-50 to-blue-100">
          {/* HEADER */}
          <header className="sticky top-0 z-40 bg-blue-300 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              {/* BRAND */}
              <div className="flex  items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Personal Finance Tracker
                  </h1>
                  <p className="text-sm text-gray-500">
                    Track income & expenses easily
                  </p>
                </div>
              </div>

              {/* NAV + USER */}
              {isLoggedIn && (
                <div className="flex items-center gap-8">
                  <Navbar />
                  <div className="flex items-center gap-4">
                  
                    <button
                      onClick={handleLogout}
                      className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* CONTENT */}
          <main className="max-w-7xl   mx-auto px-6 py-10">
            <Routes>
              <Route
                path="/"
                element={
                  !isLoggedIn ? <Login onLogin={handleLogin} /> : <Dashboard />
                }
              />
              <Route
                path="/register"
                element={isLoggedIn ? <Navigate to="/" /> : <Registration />}
              />

              {/* PROTECTED PAGES */}
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/insights" element={<Insights />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          {isLoggedIn && <AddTransaction />}
        </div>
      </TransactionProvider>
    </Router>
  );
}

function Dashboard() {
  return (
    <div className="space-y-10 bg-white/60 backdrop-blur rounded-3xl p-6 shadow-sm">
      <Summary />
       <BudgetTracker />
      <TransactionsList />

    </div>
  );
}

export default App;
