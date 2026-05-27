import { createContext, useContext, useEffect, useState } from "react";

/**
 * Transaction Context
 * Central store for all transaction-related operations
 */
const TransactionContext = createContext(undefined);

const STORAGE_KEY = "transactions";

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  /* ---------------------------------
     Load transactions on first mount
  ---------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      // Initial dummy data (demo / first-time user)
      const dummyData = [
        {
          id: "1",
          title: "Salary",
          amount: 5000,
          category: "Salary",
          date: "2025-11-01",
          type: "income",
        },
        {
          id: "2",
          title: "Groceries",
          amount: 150,
          category: "Food",
          date: "2025-11-05",
          type: "expense",
        },
        {
          id: "3",
          title: "Electricity Bill",
          amount: 120,
          category: "Utilities",
          date: "2025-11-08",
          type: "expense",
        },
        {
          id: "4",
          title: "Freelance Project",
          amount: 800,
          category: "Freelance",
          date: "2025-11-10",
          type: "income",
        },
      ];

      setTransactions(dummyData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
    }
  }, []);

  /* ---------------------------------
     Persist transactions to storage
  ---------------------------------- */
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  /* ---------------------------------
     CRUD Operations
  ---------------------------------- */

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

/* ---------------------------------
   Custom Hook
---------------------------------- */
export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }

  return context;
}
