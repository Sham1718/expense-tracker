import React from "react";
import { deleteTransaction } from "../api/transaction";

const TransactionList = ({ transactions, refresh }) => {

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-200">
        Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 hover:bg-[#151515] transition"
            >
              {/* Left Side */}
              <div>
                <p className="font-semibold text-white">
                  {t.title}
                </p>
                <p className="text-sm text-gray-400">
                  {t.category}
                </p>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-6">
                <span
                  className={`text-lg font-bold ${
                    t.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} ₹{t.amount}
                </span>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="px-3 py-1 text-sm bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;