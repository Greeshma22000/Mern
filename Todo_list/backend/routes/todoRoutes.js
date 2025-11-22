import express from "express";
import { deleteTodo, getTodo, postTodo, putTodo } from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/", postTodo);
router.put("/:id", putTodo);
router.delete("/:id", deleteTodo);

export default router;