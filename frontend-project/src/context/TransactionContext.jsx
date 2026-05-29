import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const TransactionContext = createContext(undefined);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------------------------
     Fetch Transactions From Backend
  ---------------------------------- */
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const fetchTransactions = async () => {
    try {

      const res = await axios.get(
        `${API_URL }/api/transactions`,
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* ---------------------------------
     Add Transaction
  ---------------------------------- */
  const addTransaction = async (transactionData) => {
    try {

      const res = await axios.post(
        `${API_URL }/api/transactions/add`,
        transactionData,
        {
          withCredentials: true,
        }
      );

      setTransactions((prev) => [
        res.data.transaction,
        ...prev,
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------------------------
     Delete Transaction
  ---------------------------------- */
  const deleteTransaction = async (id) => {
    try {

      await axios.delete(
        `${API_URL }/api/transactions/${id}`,
        {
          withCredentials: true,
        }
      );

      setTransactions((prev) =>
        prev.filter((t) => t._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  //edit Transaction

  const updateTransaction = async (id, updatedData) => {
  try {

    const res = await axios.put(
      `${API_URL }/api/transactions/${id}`,
      updatedData,
      {
        withCredentials: true,
      }
    );

    setTransactions((prev) =>
      prev.map((t) =>
        t._id === id ? res.data.transaction : t
      )
    );

  } catch (error) {
    console.log(error);
  }
};

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editingTransaction,
        setEditingTransaction,
        updateTransaction,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within TransactionProvider"
    );
  }

  return context;
}