import express from "express";
import { signup, signin, getUsers } from "./users.controllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getUsers);

export default router;
