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

      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");

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
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Title"
          className="bg-[#0f0f0f] border border-[#1f1f1f] text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="bg-[#0f0f0f] border border-[#1f1f1f] text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="bg-[#0f0f0f] border border-[#1f1f1f] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="bg-[#0f0f0f] border border-[#1f1f1f] text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-medium shadow-lg"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;