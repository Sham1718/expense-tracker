import express from "express"
import { loginUser, register } from "../controller/authController.js";

const authrouter=express.Router();


authrouter.post("/register",register);
authrouter.post("/login",loginUser);

export default authrouter;