import { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import ExportCSV from "./ExportCSV";


export default function BudgetTracker() {
  const { transactions } = useTransactions();

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 20000
  );

  useEffect(() => {
    localStorage.setItem("monthlyBudget", budget);
  }, [budget]);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const percentage = Math.min(
    (totalExpenses / budget) * 100,
    100
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border">
      <h2 className="text-xl font-semibold mb-4">
        Monthly Budget
      </h2>

      <input
        type="number"
        value={budget}
        onChange={(e) =>
          setBudget(Number(e.target.value))
        }
        className="border rounded-lg px-3 py-2 mb-4 w-full"
      />

      <div className="mb-2">
        Spent: ₹{totalExpenses}
      </div>

      <div className="mb-2">
        Remaining: ₹{budget - totalExpenses}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {totalExpenses > budget && (
        <p className="mt-3 text-red-600 font-medium">
          ⚠ Budget Exceeded
        </p>
      )}
      <div className="mt-6">
        <ExportCSV />
       </div>
    </div>
  );
}