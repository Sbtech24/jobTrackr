import express from "express"
import { RegisterUser,Login } from "../controllers/users.controller"

const router = express.Router()

router.route("/login").post(Login)
router.route("/register").post(RegisterUser)

export default router