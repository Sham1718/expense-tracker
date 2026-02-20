import express from "express";
import { createTransaction,getTransactions,deleteTransaction,getSummary, getMonthlyAnalytics, category } from "../controller/transactionController.js";
import protect from "../middleware/Protect.js";


const router = express.Router();


router.post("/",protect, createTransaction);
router.get("/",protect,getTransactions);
router.delete("/:id",protect,deleteTransaction)
router.get("/summary",protect,getSummary);
router.get("/monthly",protect,getMonthlyAnalytics);
router.get("/category",protect,category);

export default router;
