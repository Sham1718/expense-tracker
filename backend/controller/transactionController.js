import Transaction from "../models/Transaction.js";

// ✅ Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get Transactions (with filters + user isolation)
export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {
      user: req.user._id,
    };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Transaction (secure)
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Summary (income / expense / net)
export const getSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach((item) => {
      if (item._id === "income") totalIncome = item.totalAmount;
      if (item._id === "expense") totalExpense = item.totalAmount;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Monthly Analytics
export const getMonthlyAnalytics = async (req, res) => {
  try {
    const analytics = await Transaction.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          totals: {
            $push: {
              type: "$_id.type",
              amount: "$totalAmount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalIncome: {
            $sum: {
              $map: {
                input: "$totals",
                as: "item",
                in: {
                  $cond: [
                    { $eq: ["$$item.type", "income"] },
                    "$$item.amount",
                    0,
                  ],
                },
              },
            },
          },
          totalExpense: {
            $sum: {
              $map: {
                input: "$totals",
                as: "item",
                in: {
                  $cond: [
                    { $eq: ["$$item.type", "expense"] },
                    "$$item.amount",
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
        },
      },
      {
        $sort: { year: -1, month: -1 },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Category Breakdown (expense only)
export const category = async (req, res) => {
  try {
    const categoryData = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalAmount: 1,
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
