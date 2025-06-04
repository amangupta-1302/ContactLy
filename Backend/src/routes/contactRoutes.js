import express from "express"
import { getContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contactController.js"
import { validateToken } from "../middleware/validateToken.js"
const router = express.Router()



router.get("/", validateToken, getContacts)
router.post("/", validateToken, createContact)
router.get("/:id", validateToken, getContactById)
router.put("/:id", validateToken, updateContact)
router.delete("/:id", validateToken, deleteContact)

export default router;