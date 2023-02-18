/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(patientsService.getAll());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatientEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });

  res.json(newPatientEntry);
});

export default router;
