import express from "express";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(express());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
