import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";

export const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (typeof id === "string") {
      patientService.getPatient(id).then((data) => {
        if (data) setPatient(data);
      });
    }
  }, [id]);

  console.log(patient);

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} {patient.gender}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};
