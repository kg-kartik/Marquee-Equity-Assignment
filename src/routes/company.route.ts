import express from "express";
import { addCompany } from "src/controllers/company.controller";
const router = express.Router();

router.post("/addCompany",addCompany);

export default router;