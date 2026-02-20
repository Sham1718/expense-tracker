import React, { useState } from "react";
import { createTransaction } from "../api/transaction";

const TransactionForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("All fields are required");
      return;
    }

    try {
      await createTransaction({
        title,
        amount: Number(amount),
        type,
        category,
      });

      // Clear form
      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");

      // Refresh dashboard
      if (onSuccess) onSuccess();

    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.message || "Error creating transaction"
      );
    }
  };

  return (
    <form
      onSubmit={handleCreateTransaction}
      className="mb-6 bg-white shadow p-4 rounded"
    >
      <h2 className="text-lg font-bold mb-3">Add Transaction</h2>

      <div className="grid grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default TransactionForm;
