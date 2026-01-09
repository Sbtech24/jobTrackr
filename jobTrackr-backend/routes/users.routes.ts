import express from "express"
import { RegisterUser,Login, ForgotPassword } from "../controllers/users.controller"
import { AuthMiddleWare } from "../middlewares/AuthMiddleware"

const router = express.Router()

router.route("/login").post(Login)
router.route("/register").post(RegisterUser)
router.route("/forgot-password").post(AuthMiddleWare,ForgotPassword)
export default router