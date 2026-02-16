import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach(item => {
      if (item._id === "income") {
        totalIncome = item.totalAmount;
      } else if (item._id === "expense") {
        totalExpense = item.totalAmount;
      }
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMonthlyAnalytics = async (req, res) => {
  try {
    const analytics = await Transaction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month"
          },
          totals: {
            $push: {
              type: "$_id.type",
              amount: "$totalAmount"
            }
          }
        }
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
                    0
                  ]
                }
              }
            }
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
                    0
                  ]
                }
              }
            }
          }
        }
      },
      {
        $addFields: {
          netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
        }
      },
      {
        $sort: { year: -1, month: -1 }
      }
    ]);

    res.status(200).json(analytics);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const category=async(req,res)=>{
  try {
    const category = await Transaction.aggregate([
      {
        $match:{
          type:"expense"
        }
      },
      {
      $group:{
        _id:"$category",
        totalAmount:{$sum:"$amount"}
        
      }
    },
{
      $project:{
        _id:0,
        category:"$_id",
        totalAmount:1
      }
      },
      {
        $sort:{totalAmount:-1}
      }
    ])
    res.status(200).json(category);
    
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}
