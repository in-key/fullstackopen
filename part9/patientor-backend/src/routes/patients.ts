/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(patientsService.getAll());
});

router.post("/", (req, res) => {
  // const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  // const newPatientEntry = patientsService.addPatient({
  //   name,
  //   dateOfBirth,
  //   gender,
  //   occupation,
  //   ssn,
  // });

  // res.json(newPatientEntry);
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    res.json(patientsService.addPatient(newPatientEntry));
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
