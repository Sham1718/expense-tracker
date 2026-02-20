import React from "react";
import { deleteTransaction } from "../api/transaction";

const TransactionList = ({ transactions, refresh }) => {

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      refresh(); // ask dashboard to reload everything
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        transactions.map((t) => (
          <div
            key={t._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-gray-500">
                {t.category}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={
                  t.type === "income"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {t.type === "income" ? "+" : "-"} ₹{t.amount}
              </span>

              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
