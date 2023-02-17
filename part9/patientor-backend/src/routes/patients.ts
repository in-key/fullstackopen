import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(patientsService.getAll());
});

export default router;
