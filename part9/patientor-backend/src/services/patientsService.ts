import patients from "../data/patients";
import { CensoredPatient } from "../types";

const getAll = (): CensoredPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getAll,
};
