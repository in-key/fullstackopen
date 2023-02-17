import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getAll,
};
