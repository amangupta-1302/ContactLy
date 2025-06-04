import express from "express"
import { signUp, loginUser, checkUser, logoutUser } from "../controllers/userController.js"
import { validateToken } from "../middleware/validateToken.js"

const router = express.Router()


router.post("/signup", signUp)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.get("/checkuser", validateToken, checkUser)

export default router;