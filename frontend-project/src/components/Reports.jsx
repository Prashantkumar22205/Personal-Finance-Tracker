import { useTransactions } from "../context/TransactionContext";
import { Calendar, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function Reports() {
  const { transactions } = useTransactions();

  // Group by month
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    monthlyData[month][t.type] += t.amount;
  });

  const months = Object.entries(monthlyData);

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Monthly Reports
        </h2>
      </div>

      {months.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md text-center text-gray-500">
          No transaction data available
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {months.map(([month, data]) => {
            const savings = data.income - data.expense;
            const expensePercent =
              data.income > 0
                ? Math.min((data.expense / data.income) * 100, 100)
                : 0;

            return (
              <div
                key={month}
                className="
                  bg-white rounded-2xl p-6 border border-gray-200
                  shadow-md hover:shadow-lg hover:-translate-y-1
                  transition-all
                "
              >
                {/* MONTH HEADER */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {month}
                </h3>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <Stat
                    label="Income"
                    value={`$${data.income.toFixed(2)}`}
                    icon={<TrendingUp className="text-green-600" />}
                    color="green"
                  />
                  <Stat
                    label="Expense"
                    value={`$${data.expense.toFixed(2)}`}
                    icon={<TrendingDown className="text-red-600" />}
                    color="red"
                  />
                  <Stat
                    label="Savings"
                    value={`$${savings.toFixed(2)}`}
                    icon={<PiggyBank className="text-blue-600" />}
                    color="blue"
                  />
                </div>

                {/* EXPENSE PROGRESS */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Expense vs Income
                  </p>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${
                        expensePercent > 80
                          ? "bg-red-500"
                          : expensePercent > 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${expensePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------- STAT COMPONENT ----------------- */

function Stat({ label, value, icon, color }) {
  const bg = {
    green: "bg-green-50",
    red: "bg-red-50",
    blue: "bg-blue-50",
  };

  return (
    <div className={`rounded-xl p-4 ${bg[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
