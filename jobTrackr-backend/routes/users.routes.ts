import express from "express"
import { getProfile } from "../controllers/users.controller"


const router = express.Router()

router.route("/me").get(getProfile)
export default router