import express from "express";
import { addCompany, getCompany } from "../controllers/company.controller";
const router = express.Router();

router.post("/addCompany",addCompany);
router.get("/getCompanies",getCompany)

export default router;