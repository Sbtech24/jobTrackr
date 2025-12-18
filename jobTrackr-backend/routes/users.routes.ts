import express from "express"
import { RegisterUser } from "../controllers/users.controller"

const router = express.Router()

router.route("/login")
router.route("/register").post(RegisterUser)

export default router