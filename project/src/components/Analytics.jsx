// import { useTransactions } from "../context/TransactionContext";

// export default function Analytics() {
//   const { transactions } = useTransactions();

//   const incomeCount = transactions.filter((t) => t.type === "income").length;
//   const expenseCount = transactions.filter((t) => t.type === "expense").length;

//   const categoryMap = {};
//   transactions.forEach((t) => {
//     categoryMap[t.category] =
//       (categoryMap[t.category] || 0) + Math.abs(t.amount);
//   });

//   const topCategory = Object.entries(categoryMap).sort(
//     (a, b) => b[1] - a[1]
//   )[0];

//   return (
//     <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
//       <h2 className="text-xl font-semibold">Analytics</h2>

//       <p>
//         Total Transactions: <b>{transactions.length}</b>
//       </p>
//       <p className="text-green-600">Income Entries: {incomeCount}</p>
//       <p className="text-red-600">Expense Entries: {expenseCount}</p>

//       {topCategory && (
//         <p>
//           Highest Spending Category: <b>{topCategory[0]}</b>
//         </p>
//       )}
//     </div>
//   );
// }
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, List, Wallet } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Analytics() {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const categoryData = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const barData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="space-y-10">
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Analytics Overview
      </h2>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Transactions"
          value={transactions.length}
          icon={<List className="w-6 h-6 text-blue-600" />}
        />
        <KpiCard
          title="Total Income"
          value={`$${income.toFixed(2)}`}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        />
        <KpiCard
          title="Total Expense"
          value={`$${expense.toFixed(2)}`}
          icon={<TrendingDown className="w-6 h-6 text-red-600" />}
        />
        <KpiCard
          title="Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<Wallet className="w-6 h-6 text-indigo-600" />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition">
          <h3 className="font-semibold mb-4">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition">
          <h3 className="font-semibold mb-4">Expense by Category</h3>
          {pieData.length === 0 ? (
            <p className="text-gray-500">No expense data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- KPI CARD ---------------- */

function KpiCard({ title, value, icon }) {
  return (
    <div
      className="
      bg-white rounded-2xl p-5 border border-gray-200
      shadow-md hover:shadow-lg hover:-translate-y-1
      transition-all
    "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}
