import express from "express";
import { createTransaction,getTransactions,deleteTransaction } from "../controller/transactionController.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/",getTransactions);
router.delete("/:id",deleteTransaction)

export default router;
