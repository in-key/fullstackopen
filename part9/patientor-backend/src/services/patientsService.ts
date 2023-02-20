import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { Patient, CensoredPatient, NewPatientEntry } from "../types";

const getAll = (): CensoredPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === id);
  return foundPatient;
};

export default {
  getAll,
  addPatient,
  getPatient,
};
