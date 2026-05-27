import { useTransactions } from "../context/TransactionContext";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Lightbulb,
} from "lucide-react";

export default function Insights() {
  const { transactions } = useTransactions();

  // --- Calculations ---
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const savings = income - expense;

  // Category-wise expense
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Last 2 months comparison
  const monthlyExpense = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      const month = new Date(t.date).toISOString().slice(0, 7);
      monthlyExpense[month] = (monthlyExpense[month] || 0) + t.amount;
    }
  });

  const months = Object.keys(monthlyExpense).sort();
  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  const trend =
    previousMonth &&
    monthlyExpense[currentMonth] > monthlyExpense[previousMonth];

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Financial Insights
      </h2>

      {/* INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXPENSE WARNING */}
        <InsightCard
          icon={<AlertTriangle className="text-red-600" />}
          title="Expense Alert"
          color="red"
          text={
            expense > income
              ? "Your expenses exceed your income. Immediate attention needed."
              : "Your expenses are under control."
          }
        />

        {/* TOP CATEGORY */}
        <InsightCard
          icon={<TrendingUp className="text-blue-600" />}
          title="Top Spending Category"
          color="blue"
          text={
            topCategory
              ? `${topCategory[0]} is your highest expense category.`
              : "No expense data available."
          }
        />

        {/* TREND */}
        <InsightCard
          icon={
            trend ? (
              <TrendingUp className="text-red-600" />
            ) : (
              <TrendingDown className="text-green-600" />
            )
          }
          title="Monthly Trend"
          color={trend ? "red" : "green"}
          text={
            previousMonth
              ? trend
                ? "Your spending increased compared to last month."
                : "Good job! Your spending decreased."
              : "Not enough data to calculate trend."
          }
        />

        {/* SAVINGS */}
        <InsightCard
          icon={<PiggyBank className="text-green-600" />}
          title="Savings Status"
          color="green"
          text={
            savings > income * 0.2
              ? "Excellent! You are saving more than 20% of your income."
              : "Try to save at least 20% of your income."
          }
        />
      </div>

      {/* SMART TIPS */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-yellow-500" />
          <h3 className="font-semibold text-lg">Smart Tips</h3>
        </div>

        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {expense > income && (
            <li>Consider reducing non-essential expenses.</li>
          )}
          {topCategory && (
            <li>
              Review your spending in <b>{topCategory[0]}</b>.
            </li>
          )}
          {savings < income * 0.2 && <li>Set a monthly savings goal.</li>}
          <li>Track expenses daily for better control.</li>
        </ul>
      </div>
    </div>
  );
}

/* -------------------- CARD COMPONENT -------------------- */

function InsightCard({ icon, title, text, color }) {
  const colors = {
    red: "bg-red-100 border-red-300",
    green: "bg-green-100 border-green-300",
    blue: "bg-blue-100 border-blue-300",
  };

  return (
    <div
      className={`rounded-2xl p-5 border shadow-sm hover:shadow-md transition ${colors[color]}`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-gray-800">{text}</p>
    </div>
  );
}
