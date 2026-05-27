import { Pencil, Trash2 } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionsList() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>

      {transactions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No transactions yet</div>
      ) : (
        transactions.map((t) => {
          const isIncome = t.type === "income";

          return (
            <div
              key={t.id}
              className={`
                group relative p-5 flex justify-between items-center
                transition-all duration-300
                hover:bg-gray-50 hover:shadow-lg hover:-translate-y-[2px]
              `}
            >
              {/* Accent Bar */}
              <div
                className={`
                  absolute left-0 top-0 h-full w-1
                  ${isIncome ? "bg-green-500" : "bg-red-500"}
                  opacity-0 group-hover:opacity-100 transition
                `}
              />

              {/* Info */}
              <div>
                <p className="font-medium text-gray-900">{t.title}</p>
                <p className="text-sm text-gray-500">{t.category}</p>
              </div>

              {/* Amount & Actions */}
              <div className="flex items-center gap-6">
                <span
                  className={`font-semibold ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}${t.amount.toFixed(2)}
                </span>

                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
