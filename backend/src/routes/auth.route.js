import express  from "express";
import { login, register } from "../controller/auth.controller.js";
// import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login)

export default router