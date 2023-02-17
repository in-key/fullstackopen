import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(express());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
