import { saveAs } from "file-saver";
import { useTransactions } from "../context/TransactionContext";

export default function ExportCSV() {
  const { transactions } = useTransactions();

  const exportToCSV = () => {
    if (!transactions.length) return;

    const headers = [
      "Title",
      "Amount",
      "Category",
      "Type",
      "Date",
    ];

    const rows = transactions.map((t) => [
      t.title,
      t.amount,
      t.category,
      t.type,
      new Date(t.date).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    saveAs(blob, "transactions.csv");
  };

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      Export CSV
    </button>
  );
}