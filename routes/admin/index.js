import express from "express";
const user = express.Router();
import loginByPassword from "./loginByPassword";



user.post("/",  loginByPassword);

export default user;
