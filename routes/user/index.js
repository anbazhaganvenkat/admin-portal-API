import express from "express";
const user = express.Router();
import search from "./search";
import create from "./create";
import update from "./update";
import del from "./delete";
import get from "./get";

user.get("/", search);
user.get("/:id",  get);
user.post("/",  create);
user.put("/:id", update);
user.delete("/:id", del);

export default user;
