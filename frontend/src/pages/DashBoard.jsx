import React, { useEffect, useState } from "react";
import {
  getAllTransaction,
  getSummary,
  getCategory,
  getMonthly,
} from "../api/transaction";
import TransactionForm from "../component/TransactionForm";
import TransactionList from "../component/TransactionList";

const DashBoard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });
  const [category, setCategory] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const fetchData = async () => {
    try {
      const [t, s, c, m] = await Promise.all([
        getAllTransaction(),
        getSummary(),
        getCategory(),
        getMonthly(),
      ]);

      setTransactions(t.data);
      setSummary(s.data);
      setCategory(c.data);
      setMonthly(m.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Expense Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-500">
            <p className="text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{summary.totalIncome}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-red-500">
            <p className="text-gray-500">Total Expense</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{summary.totalExpense}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
            <p className="text-gray-500">Net Balance</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{summary.netBalance}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <TransactionForm onSuccess={fetchData} />
        </div>

        {/* Transactions */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <TransactionList
            transactions={transactions}
            refresh={fetchData}
          />
        </div>

        {/* Category + Monthly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Category Breakdown
            </h2>

            {category.length === 0 ? (
              <p className="text-gray-400">No data</p>
            ) : (
              category.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b py-2"
                >
                  <span>{c.category}</span>
                  <span className="font-semibold">
                    ₹{c.totalAmount}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Monthly Summary
            </h2>

            {monthly.length === 0 ? (
              <p className="text-gray-400">No data</p>
            ) : (
              monthly.map((m, i) => (
                <div key={i} className="border-b py-3">
                  <p className="font-semibold">
                    {m.month}/{m.year}
                  </p>
                  <p className="text-green-600">
                    Income: ₹{m.totalIncome}
                  </p>
                  <p className="text-red-600">
                    Expense: ₹{m.totalExpense}
                  </p>
                  <p className="font-bold text-blue-600">
                    Net: ₹{m.netBalance}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashBoard;
