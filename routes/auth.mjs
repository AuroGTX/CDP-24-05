import { Router } from "express";
import { signup, login, me } from "../controllers/authController.mjs";
import requireAuth from "../middleware/auth.mjs";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);

export default authRouter;
