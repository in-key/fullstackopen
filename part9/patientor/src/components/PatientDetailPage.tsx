import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient, Diagnose } from "../types";

interface Props {
  diagnoses: Diagnose[];
}

export const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (typeof id === "string") {
      patientService.getPatient(id).then((data) => {
        if (data) setPatient(data);
      });
    }
  }, [id]);

  if (!patient || diagnoses.length === 0) return null;

  return (
    <div>
      <h2>
        {patient.name} {patient.gender}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            {entry.date} {entry.description}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find((d) => d.code === code);
                  if (diagnosis) {
                    return (
                      <li key={code}>
                        {code} {diagnosis.name}
                      </li>
                    );
                  } else {
                    return <li key={code}>{code}</li>;
                  }
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
