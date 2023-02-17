import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const bmi = calculateBmi(Number(height), Number(weight));

  if (bmi === "Invalid input") {
    return res.json({ error: "malformatted parameters" });
  }

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Typescript app listening on port ${PORT}`);
});
