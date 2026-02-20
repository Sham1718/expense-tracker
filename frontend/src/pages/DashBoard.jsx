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
    <div className="min-h-screen bg-black text-white p-8">
    
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Expense Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track income, expenses & financial overview
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 shadow-lg">
            <p className="text-gray-400 mb-2">Total Income</p>
            <p className="text-3xl font-bold text-green-500">
              ₹{summary.totalIncome}
            </p>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 shadow-lg">
            <p className="text-gray-400 mb-2">Total Expense</p>
            <p className="text-3xl font-bold text-red-500">
              ₹{summary.totalExpense}
            </p>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 shadow-lg">
            <p className="text-gray-400 mb-2">Net Balance</p>
            <p className="text-3xl font-bold text-blue-500">
              ₹{summary.netBalance}
            </p>
          </div>
        </div>

        {/* Transaction Form */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 mb-10">
          <TransactionForm onSuccess={fetchData} />
        </div>

        {/* Transactions */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 mb-10">
          <TransactionList
            transactions={transactions}
            refresh={fetchData}
          />
        </div>

        {/* Category + Monthly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Category */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Category Breakdown
            </h2>

            {category.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              category.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-[#1f1f1f] py-3"
                >
                  <span className="text-gray-300">
                    {c.category}
                  </span>
                  <span className="font-semibold text-white">
                    ₹{c.totalAmount}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Monthly */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Monthly Summary
            </h2>

            {monthly.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              monthly.map((m, i) => (
                <div
                  key={i}
                  className="border-b border-[#1f1f1f] py-4"
                >
                  <p className="font-semibold text-gray-200 mb-1">
                    {m.month}/{m.year}
                  </p>
                  <p className="text-green-500">
                    Income: ₹{m.totalIncome}
                  </p>
                  <p className="text-red-500">
                    Expense: ₹{m.totalExpense}
                  </p>
                  <p className="text-blue-500 font-semibold">
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