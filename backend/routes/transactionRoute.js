import express from "express";
import { createTransaction,getTransactions,deleteTransaction,getSummary, getMonthlyAnalytics, category } from "../controller/transactionController.js";


const router = express.Router();

router.post("/", createTransaction);
router.get("/",getTransactions);
router.delete("/:id",deleteTransaction)
router.get("/summary",getSummary);
router.get("/month",getMonthlyAnalytics);
router.get("/category",category);

export default router;
