import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionsList() {
  const { transactions, deleteTransaction,setEditingTransaction} = useTransactions();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const filteredTransactions = transactions.filter((t) => {

  const matchesSearch =
    t.title.toLowerCase().includes(
      search.toLowerCase()
    );

  const matchesCategory =
    categoryFilter === "All" ||
    t.category === categoryFilter;

  const matchesType =
    typeFilter === "All" ||
    t.type === typeFilter;

 const transactionDate = new Date(t.date);
   const now = new Date();

    let matchesDate = true;

   if (dateFilter === "Last7Days") {
     const last7Days = new Date();
     last7Days.setDate(now.getDate() - 7);
     matchesDate = transactionDate >= last7Days;

  }

   if (dateFilter === "ThisMonth") {

    matchesDate =
    transactionDate.getMonth() === now.getMonth() &&
    transactionDate.getFullYear() === now.getFullYear();
  }

 return (
  matchesSearch &&
  matchesCategory &&
  matchesType &&
  matchesDate
);

  
});

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col max-h-[600px]"> 
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>

      <div className="p-4 flex flex-col md:flex-row gap-4 border-b border-gray-200">

    {/* SEARCH */}
    <input
      type="text"
      placeholder="Search transactions..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />

    {/* CATEGORY FILTER */}
    <select
      value={categoryFilter}
      onChange={(e) =>
      setCategoryFilter(e.target.value)
    }
    className="px-4 py-2 rounded-xl border border-gray-200"
  >
    <option value="All">All Categories</option>

    {[...new Set(transactions.map((t) => t.category))]
      .map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
  </select>

  {/* TYPE FILTER */}
  <select
    value={typeFilter}
    onChange={(e) =>
      setTypeFilter(e.target.value)
    }
    className="px-4 py-2 rounded-xl border border-gray-200"
  >
    <option value="All">All Types</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  <select
  value={dateFilter}
  onChange={(e) =>
    setDateFilter(e.target.value)
  }
  className="px-4 py-2 rounded-xl border border-gray-200"
>
  <option value="All">All Time</option>
  <option value="Last7Days">Last 7 Days</option>
  <option value="ThisMonth">This Month</option>
 </select>

  </div>
    <div className="overflow-y-auto flex-1">
      {filteredTransactions.length === 0? (
        <div className="p-8 text-center text-gray-500">No matching transactions found</div>
      ) : (
       filteredTransactions.map((t) => {
          const isIncome = t.type === "income";

          return (
            <div
              key={t._id}
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
                    onClick={() => setEditingTransaction(t)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                >
                    <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteTransaction(t._id)}
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
    </div>
  );
}
