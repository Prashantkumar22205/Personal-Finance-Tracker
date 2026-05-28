import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Summary() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const amountByCategory = transactions
  .filter((t) => t.type === "expense")
  .reduce((acc, t) => {

    acc[t.category] =
      (acc[t.category] || 0) + t.amount;

    return acc;

  }, {});

  const chartData = Object.entries(amountByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-8 ">
      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BALANCE */}
        <div
          className="
          bg-white rounded-2xl p-6 border border-blue-400
          shadow-md hover:shadow-lg transition-all hover:-translate-y-1
        "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-3xl font-bold mt-2">${balance.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Wallet className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* INCOME */}
        <div
          className="
          bg-white rounded-2xl p-6 border border-green-400
          shadow-md hover:shadow-lg transition-all hover:-translate-y-1
        "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-2xl font-semibold text-green-600 mt-2">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* EXPENSE */}
        <div
          className="
          bg-white rounded-2xl p-6 border border-red-400
          shadow-md hover:shadow-lg transition-all hover:-translate-y-1
        "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-600 mt-2">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <TrendingDown className="w-7 h-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* PIE CHART */}
      {chartData.length > 0 && (
        <div
          className="
          bg-white rounded-2xl p-6 border border-gray-200
          shadow-md hover:shadow-lg transition-shadow
        "
        >
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                outerRadius={110}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
